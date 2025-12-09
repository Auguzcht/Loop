import { describe, it, expect, beforeAll } from '@jest/globals';
import app from '../index';

describe('Quiz API Tests', () => {
  describe('GET /api/quiz', () => {
    it('should return 12 questions', async () => {
      const res = await app.request('/api/quiz');
      expect(res.status).toBe(200);

      const data = await res.json() as any;
      expect(data).toHaveProperty('questions');
      expect(data.questions).toHaveLength(12);
    });

    it('should return questions with correct structure', async () => {
      const res = await app.request('/api/quiz');
      const data = await res.json() as any;

      const question = data.questions[0];
      expect(question).toHaveProperty('id');
      expect(question).toHaveProperty('type');
      expect(question).toHaveProperty('question');

      // Check type-specific properties
      if (question.type === 'radio') {
        expect(question).toHaveProperty('choices');
        expect(question).toHaveProperty('correctIndex');
      } else if (question.type === 'checkbox') {
        expect(question).toHaveProperty('choices');
        expect(question).toHaveProperty('correctIndexes');
      } else if (question.type === 'text') {
        expect(question).toHaveProperty('correctText');
      }
    });

    it('should return 4 radio, 4 checkbox, and 4 text questions', async () => {
      const res = await app.request('/api/quiz');
      const data = await res.json() as any;

      const radioQuestions = data.questions.filter((q: any) => q.type === 'radio');
      const checkboxQuestions = data.questions.filter((q: any) => q.type === 'checkbox');
      const textQuestions = data.questions.filter((q: any) => q.type === 'text');

      expect(radioQuestions).toHaveLength(4);
      expect(checkboxQuestions).toHaveLength(4);
      expect(textQuestions).toHaveLength(4);
    });
  });

  describe('POST /api/grade', () => {
    it('should grade answers correctly', async () => {
      const answers = [
        { id: 'q1', value: 1 }, // Correct
        { id: 'q2', value: 1 }, // Correct
      ];

      const res = await app.request('/api/grade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      });

      expect(res.status).toBe(200);

      const data = await res.json() as any;
      expect(data).toHaveProperty('score');
      expect(data).toHaveProperty('total');
      expect(data).toHaveProperty('results');
      expect(data.score).toBe(2);
      expect(data.total).toBe(12);
      expect(data.results).toHaveLength(12);
    });

    it('should handle radio questions correctly', async () => {
      const answers = [{ id: 'q1', value: 1 }]; // Correct answer for q1

      const res = await app.request('/api/grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      });

      const data = await res.json() as any;
      const q1Result = data.results.find((r: any) => r.id === 'q1');
      expect(q1Result.correct).toBe(true);
    });

    it('should handle checkbox questions correctly', async () => {
      const answers = [{ id: 'q5', value: [0, 2, 3] }]; // Correct answer for q5

      const res = await app.request('/api/grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      });

      const data = await res.json() as any;
      const q5Result = data.results.find((r: any) => r.id === 'q5');
      expect(q5Result.correct).toBe(true);
    });

    it('should handle text questions with case-insensitive matching', async () => {
      const answers = [
        { id: 'q9', value: 'cascading style sheets' }, // Lowercase
        { id: 'q10', value: 'HYPERTEXT MARKUP LANGUAGE' }, // Uppercase
      ];

      const res = await app.request('/api/grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      });

      const data = await res.json() as any;
      const q9Result = data.results.find((r: any) => r.id === 'q9');
      const q10Result = data.results.find((r: any) => r.id === 'q10');

      expect(q9Result.correct).toBe(true);
      expect(q10Result.correct).toBe(true);
    });

    it('should return validation error for invalid request', async () => {
      const res = await app.request('/api/grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invalid: 'data' }),
      });

      expect(res.status).toBe(400);
    });

    it('should handle empty answers array', async () => {
      const res = await app.request('/api/grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: [] }),
      });

      // Empty answers should be accepted and return 0 score
      expect(res.status).toBe(200);
      const data = await res.json() as any;
      expect(data.score).toBe(0);
      expect(data.total).toBe(12);
    });

    it('should handle incorrect answers', async () => {
      const answers = [
        { id: 'q1', value: 0 }, // Wrong answer
        { id: 'q5', value: [0, 1] }, // Wrong combination
        { id: 'q9', value: 'wrong answer' }, // Wrong text
      ];

      const res = await app.request('/api/grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      });

      const data = await res.json() as any;
      expect(data.score).toBe(0);

      const q1Result = data.results.find((r: any) => r.id === 'q1');
      const q5Result = data.results.find((r: any) => r.id === 'q5');
      const q9Result = data.results.find((r: any) => r.id === 'q9');

      expect(q1Result.correct).toBe(false);
      expect(q5Result.correct).toBe(false);
      expect(q9Result.correct).toBe(false);
    });
  });

  describe('GET /', () => {
    it('should return API information', async () => {
      const res = await app.request('/');
      expect(res.status).toBe(200);

      const data = await res.json() as any;
      expect(data).toHaveProperty('message');
      expect(data).toHaveProperty('version');
      expect(data).toHaveProperty('endpoints');
    });
  });

  describe('CORS', () => {
    it('should include CORS headers', async () => {
      const res = await app.request('/api/quiz', {
        headers: {
          Origin: 'http://localhost:3000',
        },
      });

      expect(res.headers.get('Access-Control-Allow-Origin')).toBeTruthy();
    });
  });
});
