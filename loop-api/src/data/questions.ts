import type { Question } from '../types/quiz';

export const questions: Question[] = [
  // Radio Questions (4)
  {
    id: 'q1',
    type: 'radio',
    question: 'Which HTTP status code indicates successful resource creation?',
    choices: ['200 OK', '201 Created', '204 No Content', '202 Accepted'],
    correctIndex: 1,
  },
  {
    id: 'q2',
    type: 'radio',
    question: 'What does REST stand for in web APIs?',
    choices: [
      'Remote Execution State Transfer',
      'Representational State Transfer',
      'Rapid Execution Service Technology',
      'Resource Execution State Technology',
    ],
    correctIndex: 1,
  },
  {
    id: 'q3',
    type: 'radio',
    question: 'Which of these is NOT a valid HTTP method?',
    choices: ['GET', 'POST', 'FETCH', 'DELETE'],
    correctIndex: 2,
  },
  {
    id: 'q4',
    type: 'radio',
    question: 'What is the correct MIME type for JSON data?',
    choices: [
      'text/json',
      'application/json',
      'text/javascript',
      'application/javascript',
    ],
    correctIndex: 1,
  },

  // Checkbox Questions (4)
  {
    id: 'q5',
    type: 'checkbox',
    question:
      'Which of the following are JavaScript frameworks? (Select all that apply)',
    choices: ['React', 'Python', 'Vue', 'Angular', 'Java'],
    correctIndexes: [0, 2, 3],
  },
  {
    id: 'q6',
    type: 'checkbox',
    question:
      'Which of these are valid TypeScript primitive types? (Select all that apply)',
    choices: ['string', 'int', 'boolean', 'float', 'number'],
    correctIndexes: [0, 2, 4],
  },
  {
    id: 'q7',
    type: 'checkbox',
    question:
      'Which HTTP status codes indicate client errors? (Select all that apply)',
    choices: ['200', '404', '500', '403', '301'],
    correctIndexes: [1, 3],
  },
  {
    id: 'q8',
    type: 'checkbox',
    question:
      'Which of these are CSS layout models? (Select all that apply)',
    choices: ['Flexbox', 'Grid', 'Float', 'Table', 'Block'],
    correctIndexes: [0, 1, 2, 3],
  },

  // Text Questions (4)
  {
    id: 'q9',
    type: 'text',
    question: 'What does CSS stand for?',
    correctText: 'Cascading Style Sheets',
  },
  {
    id: 'q10',
    type: 'text',
    question: 'What does HTML stand for?',
    correctText: 'HyperText Markup Language',
  },
  {
    id: 'q11',
    type: 'text',
    question: 'What does API stand for?',
    correctText: 'Application Programming Interface',
  },
  {
    id: 'q12',
    type: 'text',
    question: 'What does SQL stand for?',
    correctText: 'Structured Query Language',
  },
];
