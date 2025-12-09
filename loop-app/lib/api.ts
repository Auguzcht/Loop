import type { QuizResponse, GradeResponse, Answer } from '@/types/quiz';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8788';

/**
 * Fetches quiz questions from the API
 * @returns Promise with quiz questions
 * @throws Error if the fetch fails
 */
export async function fetchQuiz(): Promise<QuizResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/quiz`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch quiz: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching quiz:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Failed to load quiz questions'
    );
  }
}

/**
 * Submits quiz answers for grading
 * @param answers - Array of user answers
 * @returns Promise with grade results
 * @throws Error if the submission fails
 */
export async function submitQuiz(answers: Answer[]): Promise<GradeResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/grade`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ answers }),
    });

    if (!response.ok) {
      throw new Error(`Failed to submit quiz: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error submitting quiz:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Failed to submit quiz'
    );
  }
}
