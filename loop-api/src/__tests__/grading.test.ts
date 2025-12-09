import { describe, it, expect } from '@jest/globals';
import { gradeAnswers } from '../utils/grading';
import type { Question } from '../types/quiz';
import type { AnswerInput } from '../schemas/validation';

describe('Grading Utility', () => {
  describe('Radio Questions', () => {
    const radioQuestion: Question = {
      id: 'q1',
      type: 'radio',
      question: 'What is 2+2?',
      choices: ['3', '4', '5', '6'],
      correctIndex: 1,
    };

    it('should grade correct radio answer', () => {
      const answers: AnswerInput[] = [{ id: 'q1', value: 1 }];
      const result = gradeAnswers([radioQuestion], answers);

      expect(result.score).toBe(1);
      expect(result.total).toBe(1);
      expect(result.results[0].correct).toBe(true);
      expect(result.results[0].correctAnswer).toBe(1);
      expect(result.results[0].userAnswer).toBe(1);
    });

    it('should grade incorrect radio answer', () => {
      const answers: AnswerInput[] = [{ id: 'q1', value: 0 }];
      const result = gradeAnswers([radioQuestion], answers);

      expect(result.score).toBe(0);
      expect(result.total).toBe(1);
      expect(result.results[0].correct).toBe(false);
      expect(result.results[0].userAnswer).toBe(0);
    });

    it('should handle missing radio answer', () => {
      const answers: AnswerInput[] = [];
      const result = gradeAnswers([radioQuestion], answers);

      expect(result.score).toBe(0);
      expect(result.total).toBe(1);
      expect(result.results[0].correct).toBe(false);
      expect(result.results[0].userAnswer).toBeUndefined();
    });

    it('should handle wrong type for radio answer', () => {
      const answers: AnswerInput[] = [{ id: 'q1', value: 'wrong type' }];
      const result = gradeAnswers([radioQuestion], answers);

      expect(result.score).toBe(0);
      expect(result.results[0].correct).toBe(false);
    });
  });

  describe('Checkbox Questions', () => {
    const checkboxQuestion: Question = {
      id: 'q2',
      type: 'checkbox',
      question: 'Select prime numbers',
      choices: ['2', '3', '4', '5'],
      correctIndexes: [0, 1, 3],
    };

    it('should grade correct checkbox answer', () => {
      const answers: AnswerInput[] = [{ id: 'q2', value: [0, 1, 3] }];
      const result = gradeAnswers([checkboxQuestion], answers);

      expect(result.score).toBe(1);
      expect(result.total).toBe(1);
      expect(result.results[0].correct).toBe(true);
      expect(result.results[0].correctAnswer).toEqual([0, 1, 3]);
      expect(result.results[0].userAnswer).toEqual([0, 1, 3]);
    });

    it('should grade incorrect checkbox answer - wrong selection', () => {
      const answers: AnswerInput[] = [{ id: 'q2', value: [0, 2] }];
      const result = gradeAnswers([checkboxQuestion], answers);

      expect(result.score).toBe(0);
      expect(result.results[0].correct).toBe(false);
    });

    it('should grade incorrect checkbox answer - partial selection', () => {
      const answers: AnswerInput[] = [{ id: 'q2', value: [0, 1] }];
      const result = gradeAnswers([checkboxQuestion], answers);

      expect(result.score).toBe(0);
      expect(result.results[0].correct).toBe(false);
    });

    it('should grade incorrect checkbox answer - order matters', () => {
      const answers: AnswerInput[] = [{ id: 'q2', value: [3, 1, 0] }];
      const result = gradeAnswers([checkboxQuestion], answers);

      // Should still be correct if all values match, regardless of order
      expect(result.results[0].correct).toBe(true);
    });

    it('should handle non-array checkbox answer', () => {
      const answers: AnswerInput[] = [{ id: 'q2', value: 1 }];
      const result = gradeAnswers([checkboxQuestion], answers);

      expect(result.score).toBe(0);
      expect(result.results[0].correct).toBe(false);
    });
  });

  describe('Text Questions', () => {
    const textQuestion: Question = {
      id: 'q3',
      type: 'text',
      question: 'What is the capital of France?',
      correctText: 'Paris',
    };

    it('should grade correct text answer', () => {
      const answers: AnswerInput[] = [{ id: 'q3', value: 'Paris' }];
      const result = gradeAnswers([textQuestion], answers);

      expect(result.score).toBe(1);
      expect(result.total).toBe(1);
      expect(result.results[0].correct).toBe(true);
      expect(result.results[0].correctAnswer).toBe('Paris');
      expect(result.results[0].userAnswer).toBe('Paris');
    });

    it('should grade correct text answer - case insensitive', () => {
      const answers: AnswerInput[] = [{ id: 'q3', value: 'paris' }];
      const result = gradeAnswers([textQuestion], answers);

      expect(result.score).toBe(1);
      expect(result.results[0].correct).toBe(true);
    });

    it('should grade correct text answer - trimmed whitespace', () => {
      const answers: AnswerInput[] = [{ id: 'q3', value: '  Paris  ' }];
      const result = gradeAnswers([textQuestion], answers);

      expect(result.score).toBe(1);
      expect(result.results[0].correct).toBe(true);
    });

    it('should grade incorrect text answer', () => {
      const answers: AnswerInput[] = [{ id: 'q3', value: 'London' }];
      const result = gradeAnswers([textQuestion], answers);

      expect(result.score).toBe(0);
      expect(result.results[0].correct).toBe(false);
    });

    it('should handle non-string text answer', () => {
      const answers: AnswerInput[] = [{ id: 'q3', value: 123 }];
      const result = gradeAnswers([textQuestion], answers);

      expect(result.score).toBe(0);
      expect(result.results[0].correct).toBe(false);
    });
  });

  describe('Multiple Questions', () => {
    const questions: Question[] = [
      {
        id: 'q1',
        type: 'radio',
        question: 'What is 2+2?',
        choices: ['3', '4', '5'],
        correctIndex: 1,
      },
      {
        id: 'q2',
        type: 'checkbox',
        question: 'Select even numbers',
        choices: ['1', '2', '3', '4'],
        correctIndexes: [1, 3],
      },
      {
        id: 'q3',
        type: 'text',
        question: 'Capital of France?',
        correctText: 'Paris',
      },
    ];

    it('should grade multiple questions correctly', () => {
      const answers: AnswerInput[] = [
        { id: 'q1', value: 1 },
        { id: 'q2', value: [1, 3] },
        { id: 'q3', value: 'Paris' },
      ];
      const result = gradeAnswers(questions, answers);

      expect(result.score).toBe(3);
      expect(result.total).toBe(3);
      expect(result.results.every((r) => r.correct)).toBe(true);
    });

    it('should grade mixed correct and incorrect answers', () => {
      const answers: AnswerInput[] = [
        { id: 'q1', value: 1 }, // correct
        { id: 'q2', value: [1] }, // incorrect (partial)
        { id: 'q3', value: 'London' }, // incorrect
      ];
      const result = gradeAnswers(questions, answers);

      expect(result.score).toBe(1);
      expect(result.total).toBe(3);
      expect(result.results[0].correct).toBe(true);
      expect(result.results[1].correct).toBe(false);
      expect(result.results[2].correct).toBe(false);
    });

    it('should handle time tracking data', () => {
      const answers: AnswerInput[] = [
        { id: 'q1', value: 1, timeSpent: 5000 },
        { id: 'q2', value: [1, 3], timeSpent: 8000 },
        { id: 'q3', value: 'Paris', timeSpent: 3500 },
      ];
      const result = gradeAnswers(questions, answers);

      expect(result.results[0].timeSpent).toBe(5000);
      expect(result.results[1].timeSpent).toBe(8000);
      expect(result.results[2].timeSpent).toBe(3500);
    });

    it('should handle partial answer submission', () => {
      const answers: AnswerInput[] = [
        { id: 'q1', value: 1 }, // only answered first question
      ];
      const result = gradeAnswers(questions, answers);

      expect(result.score).toBe(1);
      expect(result.total).toBe(3);
      expect(result.results[0].correct).toBe(true);
      expect(result.results[1].correct).toBe(false);
      expect(result.results[2].correct).toBe(false);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty questions array', () => {
      const result = gradeAnswers([], []);

      expect(result.score).toBe(0);
      expect(result.total).toBe(0);
      expect(result.results).toEqual([]);
    });

    it('should handle empty answers array', () => {
      const questions: Question[] = [
        {
          id: 'q1',
          type: 'radio',
          question: 'Test?',
          choices: ['A', 'B'],
          correctIndex: 0,
        },
      ];
      const result = gradeAnswers(questions, []);

      expect(result.score).toBe(0);
      expect(result.total).toBe(1);
      expect(result.results[0].correct).toBe(false);
    });

    it('should ignore answers for non-existent questions', () => {
      const questions: Question[] = [
        {
          id: 'q1',
          type: 'radio',
          question: 'Test?',
          choices: ['A', 'B'],
          correctIndex: 0,
        },
      ];
      const answers: AnswerInput[] = [
        { id: 'q1', value: 0 },
        { id: 'non-existent', value: 99 }, // should be ignored
      ];
      const result = gradeAnswers(questions, answers);

      expect(result.score).toBe(1);
      expect(result.total).toBe(1);
    });
  });
});
