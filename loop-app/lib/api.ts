import type { QuizResponse, GradeResponse, Answer } from '@/types/quiz';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';

/**
 * Fetches quiz questions from the API
 * @returns Promise with quiz questions
 * @throws Error if the fetch fails
 */
export async function fetchQuiz(): Promise<QuizResponse> {
  try {
    // Generate a session ID for deterministic shuffling
    const sessionId = typeof window !== 'undefined' 
      ? (sessionStorage.getItem('sessionId') || generateSessionId())
      : generateSessionId();
    
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('sessionId', sessionId);
    }

    const response = await fetch(`${API_BASE_URL}/api/quiz?shuffle=true&session_id=${sessionId}`, {
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
 * Generate a unique session ID
 */
function generateSessionId(): string {
  return `session-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
}

/**
 * Clear the quiz session to get a new shuffle
 */
export function clearQuizSession(): void {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('sessionId');
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
    // Get session_id if it exists
    const sessionId = typeof window !== 'undefined' 
      ? sessionStorage.getItem('sessionId') 
      : null;
    
    const payload = { 
      answers,
      ...(sessionId && { session_id: sessionId })
    };
    console.log('Submitting quiz with payload:', payload);

    const response = await fetch(`${API_BASE_URL}/api/grade`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('Submit error:', response.status, errorData);
      throw new Error(
        `Failed to submit quiz: ${response.statusText}${errorData ? ` - ${JSON.stringify(errorData)}` : ''}`
      );
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
