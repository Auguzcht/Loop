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
