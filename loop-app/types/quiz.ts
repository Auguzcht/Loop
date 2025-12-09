// Base question interface
export interface BaseQuestion {
  id: string;
  type: 'radio' | 'checkbox' | 'text';
  question: string;
}

// Radio question (single choice)
export interface RadioQuestion extends BaseQuestion {
  type: 'radio';
  choices: string[];
  correctIndex: number;
}

// Checkbox question (multiple choice)
export interface CheckboxQuestion extends BaseQuestion {
  type: 'checkbox';
  choices: string[];
  correctIndexes: number[];
}

// Text question (free-form input)
export interface TextQuestion extends BaseQuestion {
  type: 'text';
  correctText: string;
}

// Union type for all question types
export type Question = RadioQuestion | CheckboxQuestion | TextQuestion;

// Answer types
export type AnswerValue = number | number[] | string;

export interface Answer {
  id: string;
  value: AnswerValue;
  timeSpent?: number; // Time in milliseconds
}

// API response types
export interface QuizResponse {
  questions: Question[];
}

export interface QuestionResult {
  id: string;
  correct: boolean;
  timeSpent?: number; // Time in milliseconds
  userAnswer?: AnswerValue;
  correctAnswer?: AnswerValue;
}

export interface GradeResponse {
  score: number;
  total: number;
  results: QuestionResult[];
}

// Quiz state
export type QuizStatus = 
  | 'idle'       // Landing page, not started
  | 'loading'    // Fetching questions from API
  | 'active'     // Taking quiz, answering questions
  | 'submitting' // Grading answers
  | 'completed'  // Viewing results
  | 'error';     // Error occurred

export interface QuizState {
  status: QuizStatus;
  questions: Question[];
  currentIndex: number;
  answers: Map<string, Answer>;
  timeRemaining: number;
  score: number | null;
  total: number | null;
  results: QuestionResult[];
  error: string | null;
  questionStartTime: number | null; // Track when current question started
}

// Quiz actions
export type QuizAction =
  | { type: 'START_QUIZ' }
  | { type: 'LOAD_QUESTIONS_SUCCESS'; payload: Question[] }
  | { type: 'LOAD_QUESTIONS_ERROR'; payload: string }
  | { type: 'SET_ANSWER'; payload: Answer }
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREVIOUS_QUESTION' }
  | { type: 'GO_TO_QUESTION'; payload: number }
  | { type: 'TICK_TIMER' }
  | { type: 'SUBMIT_QUIZ' }
  | { type: 'SUBMIT_SUCCESS'; payload: GradeResponse }
  | { type: 'SUBMIT_ERROR'; payload: string }
  | { type: 'RESET_QUIZ' };