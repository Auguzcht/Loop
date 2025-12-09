import type { Question, Answer, QuestionResult } from '../types/quiz';
import type { AnswerInput } from '../schemas/validation';

/**
 * Grades a user's answers against the correct answers
 * @param questions - Array of quiz questions
 * @param answers - Array of user's answers
 * @returns Object with score, total, and individual results
 */
export function gradeAnswers(
  questions: Question[],
  answers: AnswerInput[]
): { score: number; total: number; results: QuestionResult[] } {
  const answerMap = new Map(answers.map((a) => [a.id, a]));
  let score = 0;
  const results: QuestionResult[] = [];

  for (const question of questions) {
    const userAnswer = answerMap.get(question.id);
    let correct = false;

    if (userAnswer) {
      correct = gradeQuestion(question, userAnswer.value);
    }

    if (correct) {
      score++;
    }

    results.push({
      id: question.id,
      correct,
    });
  }

  return {
    score,
    total: questions.length,
    results,
  };
}

/**
 * Grades a single question
 * @param question - The question to grade
 * @param answer - The user's answer
 * @returns Whether the answer is correct
 */
function gradeQuestion(
  question: Question,
  answer: string | number | number[]
): boolean {
  switch (question.type) {
    case 'radio':
      return typeof answer === 'number' && answer === question.correctIndex;

    case 'checkbox':
      if (!Array.isArray(answer)) return false;
      const correctSet = new Set(question.correctIndexes);
      const answerSet = new Set(answer);
      if (correctSet.size !== answerSet.size) return false;
      for (const idx of answer) {
        if (!correctSet.has(idx)) return false;
      }
      return true;

    case 'text':
      if (typeof answer !== 'string') return false;
      // Case-insensitive comparison, trim whitespace
      return (
        answer.trim().toLowerCase() === question.correctText.trim().toLowerCase()
      );

    default:
      return false;
  }
}
