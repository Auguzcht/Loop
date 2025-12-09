---
agent: agent
applyTo: "frontend/src/hooks/**/*.ts,frontend/src/hooks/**/*.tsx"
---

Loop uses custom state management with React's built-in hooks. Never suggest external state libraries.

State Management Rules:
- Use useReducer for complex state (quiz state machine)
- Use useState for simple local state (form inputs, toggles)
- Create custom hooks for reusable logic
- Keep state logic in hooks/ directory

Quiz State Pattern:
```typescript
type QuizState = {
  status: 'idle' | 'loading' | 'active' | 'submitting' | 'completed' | 'error';
  questions: Question[];
  currentIndex: number;
  answers: Answer[];
  timeRemaining: number;
  score: number | null;
  results: Result[] | null;
  error: string | null;
};

type QuizAction = 
  | { type: 'LOAD_QUESTIONS'; payload: Question[] }
  | { type: 'ANSWER_QUESTION'; payload: Answer }
  | { type: 'NEXT_QUESTION' }
  | { type: 'TICK_TIMER' }
  | { type: 'TIMEOUT' }
  | { type: 'SUBMIT_QUIZ' }
  | { type: 'SET_RESULTS'; payload: { score: number; results: Result[] } }
  | { type: 'ERROR'; payload: string }
  | { type: 'RESET' };

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'LOAD_QUESTIONS':
      return { ...state, questions: action.payload, status: 'active' };
    // ... other cases
    default:
      return state;
  }
}
```

Custom Hook Pattern:
```typescript
export function useQuiz() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  
  const answerQuestion = useCallback((answer: Answer) => {
    dispatch({ type: 'ANSWER_QUESTION', payload: answer });
  }, []);
  
  return {
    ...state,
    answerQuestion,
    nextQuestion: () => dispatch({ type: 'NEXT_QUESTION' }),
    submitQuiz: () => dispatch({ type: 'SUBMIT_QUIZ' }),
  };
}
```

Timer Pattern:
```typescript
useEffect(() => {
  if (status !== 'active') return;
  
  const interval = setInterval(() => {
    dispatch({ type: 'TICK_TIMER' });
    if (timeRemaining <= 0) {
      dispatch({ type: 'TIMEOUT' });
    }
  }, 1000);
  
  return () => clearInterval(interval);
}, [status, timeRemaining]);
```

Never suggest localStorage, sessionStorage, or external state libraries. Keep all state in memory using React hooks.

Reference Loop Requirements/FLOW_DOCUMENTATION.md for complete state machine documentation.