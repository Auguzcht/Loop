import { Hono } from 'hono';
import { questions } from '../data/questions';
import type { Question } from '../types/quiz';

const quiz = new Hono();

/**
 * GET /api/quiz
 * Returns all quiz questions (without correct answers for security)
 */
quiz.get('/', (c) => {
  try {
    // Remove correct answers before sending to client
    const publicQuestions = questions.map((q): Question => {
      const { ...rest } = q;
      return rest as Question;
    });

    return c.json({
      questions: publicQuestions,
    });
  } catch (error) {
    return c.json({ error: 'Failed to load questions' }, 500);
  }
});

export default quiz;
