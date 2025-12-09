import { useReducer, useCallback } from 'react';
import type { QuizState, QuizAction, Question, Answer } from '@/types/quiz';
import { fetchQuiz, submitQuiz } from '@/lib/api';

// Initial quiz state
const initialState: QuizState = {
  status: 'idle',
  questions: [],
  currentIndex: 0,
  answers: new Map(),
  timeRemaining: 60,
  score: null,
  total: null,
  results: [],
  error: null,
};

// Quiz reducer
function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'START_QUIZ':
      return {
        ...state,
        status: 'loading',
        error: null,
      };

    case 'LOAD_QUESTIONS_SUCCESS':
      return {
        ...state,
        status: 'active',
        questions: action.payload,
        currentIndex: 0,
        answers: new Map(),
        timeRemaining: 60,
        error: null,
      };

    case 'LOAD_QUESTIONS_ERROR':
      return {
        ...state,
        status: 'error',
        error: action.payload,
      };

    case 'SET_ANSWER': {
      const newAnswers = new Map(state.answers);
      newAnswers.set(action.payload.id, action.payload);
      return {
        ...state,
        answers: newAnswers,
      };
    }

    case 'NEXT_QUESTION':
      return {
        ...state,
        currentIndex: Math.min(state.currentIndex + 1, state.questions.length - 1),
      };

    case 'PREVIOUS_QUESTION':
      return {
        ...state,
        currentIndex: Math.max(state.currentIndex - 1, 0),
      };

    case 'GO_TO_QUESTION':
      return {
        ...state,
        currentIndex: Math.max(
          0,
          Math.min(action.payload, state.questions.length - 1)
        ),
      };

    case 'TICK_TIMER':
      return {
        ...state,
        timeRemaining: Math.max(0, state.timeRemaining - 1),
      };

    case 'SUBMIT_QUIZ':
      return {
        ...state,
        status: 'submitting',
      };

    case 'SUBMIT_SUCCESS':
      return {
        ...state,
        status: 'completed',
        score: action.payload.score,
        total: action.payload.total,
        results: action.payload.results,
      };

    case 'SUBMIT_ERROR':
      return {
        ...state,
        status: 'error',
        error: action.payload,
      };

    case 'RESET_QUIZ':
      return initialState;

    default:
      return state;
  }
}

/**
 * Main hook for managing quiz state and actions
 */
export function useQuiz() {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  // Load quiz questions
  const startQuiz = useCallback(async () => {
    dispatch({ type: 'START_QUIZ' });
    try {
      const data = await fetchQuiz();
      dispatch({ type: 'LOAD_QUESTIONS_SUCCESS', payload: data.questions });
    } catch (error) {
      dispatch({
        type: 'LOAD_QUESTIONS_ERROR',
        payload: error instanceof Error ? error.message : 'Failed to load quiz',
      });
    }
  }, []);

  // Set an answer
  const setAnswer = useCallback((answer: Answer) => {
    dispatch({ type: 'SET_ANSWER', payload: answer });
  }, []);

  // Navigation
  const nextQuestion = useCallback(() => {
    dispatch({ type: 'NEXT_QUESTION' });
  }, []);

  const previousQuestion = useCallback(() => {
    dispatch({ type: 'PREVIOUS_QUESTION' });
  }, []);

  const goToQuestion = useCallback((index: number) => {
    dispatch({ type: 'GO_TO_QUESTION', payload: index });
  }, []);

  // Timer
  const tickTimer = useCallback(() => {
    dispatch({ type: 'TICK_TIMER' });
  }, []);

  // Submit quiz
  const submitQuizAnswers = useCallback(async () => {
    dispatch({ type: 'SUBMIT_QUIZ' });
    try {
      const answers = Array.from(state.answers.values());
      const result = await submitQuiz(answers);
      dispatch({ type: 'SUBMIT_SUCCESS', payload: result });
    } catch (error) {
      dispatch({
        type: 'SUBMIT_ERROR',
        payload: error instanceof Error ? error.message : 'Failed to submit quiz',
      });
    }
  }, [state.answers]);

  // Reset quiz
  const resetQuiz = useCallback(() => {
    dispatch({ type: 'RESET_QUIZ' });
  }, []);

  return {
    state,
    startQuiz,
    setAnswer,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    tickTimer,
    submitQuizAnswers,
    resetQuiz,
  };
}
