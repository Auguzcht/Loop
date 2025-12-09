import { Hono } from 'hono';
import { questions } from '../data/questions';
import { shuffleWithSeed, generateSeed } from '../utils/shuffle';
import type { Question } from '../types/quiz';

const quiz = new Hono();

/**
 * GET /api/quiz
 * Returns all quiz questions (without correct answers for security)
 * Supports optional deterministic shuffling via session_id query param
 */
quiz.get('/', (c) => {
  try {
    // Remove correct answers before sending to client
    const publicQuestions = questions.map((q): Question => {
      const { ...rest } = q;
      return rest as Question;
    });

    // Check if shuffling is requested
    const sessionId = c.req.query('session_id');
    const shouldShuffle = c.req.query('shuffle') === 'true';

    let finalQuestions = publicQuestions;

    if (shouldShuffle && sessionId) {
      // Deterministic shuffle based on session ID
      const seed = generateSeed(sessionId);
      finalQuestions = shuffleWithSeed(publicQuestions, seed);

      // Also shuffle choices for each question (if applicable)
      finalQuestions = finalQuestions.map((q) => {
        if (q.type === 'radio') {
          const choicesSeed = generateSeed(sessionId + q.id);
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
          const choicesSeed = generateSeed(sessionId + q.id);
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

    return c.json({
      questions: finalQuestions,
    });
  } catch (error) {
    return c.json({ error: 'Failed to load questions' }, 500);
  }
});

export default quiz;
