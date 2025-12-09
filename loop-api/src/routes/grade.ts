import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { GradeRequestSchema } from '../schemas/validation';
import { questions } from '../data/questions';
import { gradeAnswers } from '../utils/grading';
import { shuffleWithSeed, generateSeed } from '../utils/shuffle';
import type { Question } from '../types/quiz';

const grade = new Hono();

/**
 * POST /api/grade
 * Grades the user's quiz answers
 */
grade.post('/', zValidator('json', GradeRequestSchema), async (c) => {
  try {
    const body = c.req.valid('json');
    let questionsToGrade = questions;

    // If session_id is provided, re-shuffle questions to match the quiz state
    if (body.session_id) {
      const seed = generateSeed(body.session_id);
      questionsToGrade = shuffleWithSeed([...questions], seed);

      // Also shuffle choices for each question to match quiz state
      questionsToGrade = questionsToGrade.map((q) => {
        if (q.type === 'radio') {
          const choicesSeed = generateSeed(body.session_id + q.id);
          const originalChoices = [...q.choices];
          const shuffledChoices = shuffleWithSeed(q.choices, choicesSeed);
          
          // Find new index of the correct answer
          const correctChoice = originalChoices[q.correctIndex];
          const newCorrectIndex = shuffledChoices.indexOf(correctChoice);
          
          return {
            ...q,
            choices: shuffledChoices,
            correctIndex: newCorrectIndex,
          };
        } else if (q.type === 'checkbox') {
          const choicesSeed = generateSeed(body.session_id + q.id);
          const originalChoices = [...q.choices];
          const shuffledChoices = shuffleWithSeed(q.choices, choicesSeed);
          
          // Find new indexes of all correct answers
          const correctChoices = q.correctIndexes.map(idx => originalChoices[idx]);
          const newCorrectIndexes = correctChoices.map(choice => shuffledChoices.indexOf(choice));
          
          return {
            ...q,
            choices: shuffledChoices,
            correctIndexes: newCorrectIndexes,
          };
        }
        return q;
      });
    }

    // Grade the answers
    const result = gradeAnswers(questionsToGrade, body.answers);

    return c.json(result);
  } catch (error) {
    return c.json({ error: 'Failed to grade quiz' }, 500);
  }
});

export default grade;
