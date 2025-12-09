import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { GradeRequestSchema } from '../schemas/validation';
import { questions } from '../data/questions';
import { gradeAnswers } from '../utils/grading';

const grade = new Hono();

/**
 * POST /api/grade
 * Grades the user's quiz answers
 */
grade.post('/', zValidator('json', GradeRequestSchema), async (c) => {
  try {
    const body = c.req.valid('json');

    // Grade the answers
    const result = gradeAnswers(questions, body.answers);

    return c.json(result);
  } catch (error) {
    console.error('Error grading quiz:', error);
    return c.json({ error: 'Failed to grade quiz' }, 500);
  }
});

export default grade;
