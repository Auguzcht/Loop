# Loop Flow Documentation

Complete user flow and state machine documentation for the Loop quiz application.

---

## User Journey

### Overview
```
Landing Page → Quiz → Results → Retry (loops back to Quiz)
```

### Detailed Flow
```
┌─────────────────────────────────────────────────────────────┐
│                     LANDING PAGE                             │
│  - Logo + Tagline                                           │
│  - Welcome message                                          │
│  - Brief instructions                                       │
│  - "Start Quiz" button                                      │
└──────────────────┬──────────────────────────────────────────┘
                   │ Click "Start Quiz"
                   ↓
┌─────────────────────────────────────────────────────────────┐
│                   LOADING STATE                              │
│  - Fetching questions from API                              │
│  - Skeleton loaders                                         │
│  - "Loading quiz..." message                                │
└──────────────────┬──────────────────────────────────────────┘
                   │ Questions loaded
                   ↓
┌─────────────────────────────────────────────────────────────┐
│                    QUIZ INTERFACE                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Question 1 of 12        [Timer: 60s]                  │  │
│  │ [████████░░░░░░░░░░] 8%                              │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Question Card                                         │  │
│  │  "What is the correct answer?"                        │  │
│  │                                                       │  │
│  │  ○ Option A                                          │  │
│  │  ○ Option B    ← User selects                        │  │
│  │  ○ Option C                                          │  │
│  │  ○ Option D                                          │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  [Previous]                        [Next Question →]        │
└──────────────────┬──────────────────────────────────────────┘
                   │ Repeat for all 12 questions
                   ↓
┌─────────────────────────────────────────────────────────────┐
│                 LAST QUESTION                                │
│  [Previous]                        [Submit Quiz →]           │
└──────────────────┬──────────────────────────────────────────┘
                   │ Click "Submit Quiz"
                   ↓
┌─────────────────────────────────────────────────────────────┐
│                 SUBMITTING STATE                             │
│  - Sending answers to API                                   │
│  - Spinner animation                                        │
│  - "Grading your answers..." message                        │
└──────────────────┬──────────────────────────────────────────┘
                   │ Results received
                   ↓
┌─────────────────────────────────────────────────────────────┐
│                   RESULTS PAGE                               │
│  - Final score (10/12)                                      │
│  - Percentage (83%)                                         │
│  - Trophy icon                                              │
│  - Breakdown by question (✓ or ✗)                          │
│  - "Try Again" button                                       │
└──────────────────┬──────────────────────────────────────────┘
                   │ Click "Try Again"
                   └──→ Back to LOADING STATE
```

---

## State Machine

### States
```typescript
type QuizStatus = 
  | 'idle'       // Landing page, not started
  | 'loading'    // Fetching questions from API
  | 'active'     // Taking quiz, answering questions
  | 'submitting' // Grading answers
  | 'completed'  // Viewing results
  | 'error'      // Error occurred
```

### State Transitions
```
┌──────┐
│ idle │  Initial state
└───┬──┘
    │ User clicks "Start Quiz"
    ↓
┌─────────┐
│ loading │  Fetching /api/quiz
└────┬────┘
     │ Success
     ↓
┌────────┐     Timer expires (auto-submit current question)
│ active │  ←──────────────────────────────────────┐
└────┬───┘                                          │
     │ User answers all questions                   │
     │ and clicks "Submit Quiz"                     │
     ↓                                              │
┌────────────┐                                      │
│ submitting │  POST /api/grade                     │
└─────┬──────┘                                      │
      │ Success                                     │
      ↓                                             │
┌───────────┐                                       │
│ completed │  Viewing results                      │
└─────┬─────┘                                       │
      │ User clicks "Try Again"                     │
      └──────→ back to 'loading'                    │
                                                    │
┌───────┐   Any fetch/submit failure               │
│ error │  ←──────────────────────────────────────┘
└───┬───┘
    │ User clicks "Try Again"
    └──────→ back to 'loading'
```

### Transition Rules
```typescript
// Valid transitions
idle       → loading    (user starts quiz)
loading    → active     (questions loaded)
loading    → error      (fetch failed)
active     → submitting (user submits quiz)
active     → error      (network error)
submitting → completed  (grading successful)
submitting → error      (grading failed)
completed  → loading    (user retries)
error      → loading    (user retries)

// Invalid transitions (prevented by state machine)
idle       → active     ✗
active     → loading    ✗
completed  → active     ✗
```

---

## Quiz State Structure
```typescript
interface QuizState {
  // Current state
  status: QuizStatus;
  
  // Questions data
  questions: Question[];
  currentIndex: number;  // 0-11 for 12 questions
  
  // User answers
  answers: Answer[];
  
  // Timer
  timeRemaining: number; // Seconds left for current question
  
  // Results (populated after submission)
  score: number | null;
  results: Array<{ id: string; correct: boolean }> | null;
  
  // Error handling
  error: string | null;
}

// Initial state
const initialState: QuizState = {
  status: 'idle',
  questions: [],
  currentIndex: 0,
  answers: [],
  timeRemaining: 60,
  score: null,
  results: null,
  error: null,
};
```

---

## Actions & Reducers

### Action Types
```typescript
type QuizAction =
  | { type: 'START_QUIZ' }
  | { type: 'LOAD_QUESTIONS'; payload: Question[] }
  | { type: 'ANSWER_QUESTION'; payload: Answer }
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREVIOUS_QUESTION' }
  | { type: 'TICK_TIMER' }
  | { type: 'TIMEOUT' }
  | { type: 'SUBMIT_QUIZ' }
  | { type: 'SET_RESULTS'; payload: { score: number; results: Result[] } }
  | { type: 'ERROR'; payload: string }
  | { type: 'RESET' };
```

### Reducer Logic
```typescript
function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'START_QUIZ':
      return {
        ...state,
status: 'loading',
error: null,
};
case 'LOAD_QUESTIONS':
  return {
    ...state,
    status: 'active',
    questions: action.payload,
    currentIndex: 0,
    answers: [],
    timeRemaining: 60,
  };

case 'ANSWER_QUESTION':
  const existingIndex = state.answers.findIndex(
    a => a.id === action.payload.id
  );
  
  const newAnswers = existingIndex >= 0
    ? state.answers.map((a, i) => 
        i === existingIndex ? action.payload : a
      )
    : [...state.answers, action.payload];
  
  return {
    ...state,
    answers: newAnswers,
  };

case 'NEXT_QUESTION':
  if (state.currentIndex < state.questions.length - 1) {
    return {
      ...state,
      currentIndex: state.currentIndex + 1,
      timeRemaining: 60, // Reset timer for new question
    };
  }
  return state;

case 'PREVIOUS_QUESTION':
  if (state.currentIndex > 0) {
    return {
      ...state,
      currentIndex: state.currentIndex - 1,
      timeRemaining: 60, // Reset timer
    };
  }
  return state;

case 'TICK_TIMER':
  return {
    ...state,
    timeRemaining: Math.max(0, state.timeRemaining - 1),
  };

case 'TIMEOUT':
  // Auto-submit current question (no answer) and move to next
  const currentQuestion = state.questions[state.currentIndex];
  const hasAnswer = state.answers.some(a => a.id === currentQuestion.id);
  
  if (!hasAnswer) {
    // Add empty answer
    const emptyAnswer: Answer = {
      id: currentQuestion.id,
      value: currentQuestion.type === 'checkbox' ? [] : '',
    };
    
    return quizReducer(
      { ...state, answers: [...state.answers, emptyAnswer] },
      { type: 'NEXT_QUESTION' }
    );
  }
  
  return quizReducer(state, { type: 'NEXT_QUESTION' });

case 'SUBMIT_QUIZ':
  return {
    ...state,
    status: 'submitting',
  };

case 'SET_RESULTS':
  return {
    ...state,
    status: 'completed',
    score: action.payload.score,
    results: action.payload.results,
  };

case 'ERROR':
  return {
    ...state,
    status: 'error',
    error: action.payload,
  };

case 'RESET':
  return initialState;

default:
  return state;
}
}

---

## Timer Logic

### Timer Behavior

- Each question has 60 seconds
- Timer starts when question is displayed
- Timer resets when moving to new question
- Visual warning at 20 seconds (amber)
- Visual danger at 10 seconds (red + pulse)
- Auto-submit when timer reaches 0

### Timer Implementation
```typescript
useEffect(() => {
  // Only tick timer when quiz is active
  if (status !== 'active') return;
  
  const interval = setInterval(() => {
    dispatch({ type: 'TICK_TIMER' });
    
    // Check if time expired
    if (timeRemaining <= 1) {
      dispatch({ type: 'TIMEOUT' });
    }
  }, 1000);
  
  // Cleanup interval on unmount or status change
  return () => clearInterval(interval);
}, [status, timeRemaining]);
```

### Timer Visual States
```typescript
function getTimerColor(timeRemaining: number) {
  if (timeRemaining > 20) return 'sage'; // Green - safe
  if (timeRemaining > 10) return 'amber'; // Yellow - caution
  return 'red'; // Red - danger
}

function shouldPulse(timeRemaining: number) {
  return timeRemaining <= 10;
}
```

---

## Question Navigation

### Navigation Rules

- User can navigate backward to previous questions
- User can navigate forward only if current question is answered
- Last question shows "Submit Quiz" instead of "Next"
- Navigation preserves user answers

### Navigation Logic
```typescript
const canGoPrevious = currentIndex > 0;
const canGoNext = currentIndex < questions.length - 1 && hasCurrentAnswer;
const isLastQuestion = currentIndex === questions.length - 1;

function hasCurrentAnswer() {
  const currentQuestion = questions[currentIndex];
  return answers.some(a => a.id === currentQuestion.id);
}
```

---

## Answer Handling

### Answer Types
```typescript
// Radio question (single choice)
{
  id: "q1",
  value: 0  // Index of selected choice
}

// Checkbox question (multiple choice)
{
  id: "q2",
  value: [0, 2, 3]  // Array of selected indices
}

// Text question (short answer)
{
  id: "q3",
  value: "Next.js"  // Text string
}
```

### Answer Validation
```typescript
function isAnswerValid(question: Question, answer: Answer): boolean {
  switch (question.type) {
    case 'radio':
      return typeof answer.value === 'number' &&
             answer.value >= 0 &&
             answer.value < (question.choices?.length || 0);
    
    case 'checkbox':
      return Array.isArray(answer.value) &&
             answer.value.length > 0 &&
             answer.value.every(v => 
               v >= 0 && v < (question.choices?.length || 0)
             );
    
    case 'text':
      return typeof answer.value === 'string' &&
             answer.value.trim().length > 0;
    
    default:
      return false;
  }
}
```

---

## Progress Calculation
```typescript
function calculateProgress(currentIndex: number, total: number): number {
  return Math.round(((currentIndex + 1) / total) * 100);
}

// Example: Question 3 of 12 = (3/12) * 100 = 25%
```

---

## Error Handling

### Error States

1. **Network Error (Loading)**
   - Cannot fetch questions from API
   - Display error alert with retry button
   - Allow user to try again

2. **Network Error (Submitting)**
   - Cannot submit answers for grading
   - Display error alert with retry button
   - Preserve user answers for retry

3. **Validation Error**
   - Invalid question data from API
   - Display generic error message
   - Prevent quiz from starting

### Error Recovery
```typescript
// In component
if (status === 'error') {
  return (
    <Alert variant="destructive">
      <AlertCircle />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {error || 'Something went wrong'}
      </AlertDescription>
      <Button onClick={() => dispatch({ type: 'RESET' })}>
        Try Again
      </Button>
    </Alert>
  );
}
```

---

## Data Persistence

### Session Scope

- All quiz state is in-memory only
- No localStorage or sessionStorage
- Refreshing page resets quiz
- Answers are lost on page refresh

### Why No Persistence?

Per requirements:
- Keep implementation simple
- Focus on core functionality
- No persistence layer needed for demo

---

## Performance Considerations

### State Updates

- Use `useReducer` for complex state updates
- Memoize callbacks with `useCallback`
- Memoize derived values with `useMemo`
```typescript
const currentQuestion = useMemo(
  () => questions[currentIndex],
  [questions, currentIndex]
);

const progress = useMemo(
  () => calculateProgress(currentIndex, questions.length),
  [currentIndex, questions.length]
);

const handleAnswer = useCallback((answer: Answer) => {
  dispatch({ type: 'ANSWER_QUESTION', payload: answer });
}, []);
```

### Re-render Optimization

- Split large components into smaller ones
- Use React.memo for expensive components
- Avoid inline object/array creation
```typescript
// Bad - creates new object every render
<QuestionCard question={questions[currentIndex]} />

// Good - memoized value
<QuestionCard question={currentQuestion} />
```

---

## Accessibility Flow

### Keyboard Navigation
Tab          → Move between interactive elements
Enter        → Submit form / select button
Space        → Toggle checkbox
Arrow keys   → Navigate radio group
Escape       → Cancel / close modal

### Screen Reader Flow

1. Page title announced on load
2. Question number and total announced
3. Timer updates announced with `aria-live="polite"`
4. Error messages announced immediately with `aria-live="assertive"`
5. Results announced on completion

### Focus Management
```typescript
// Focus first answer option when question changes
useEffect(() => {
  const firstOption = document.querySelector('[role="radio"], [role="checkbox"], input[type="text"]');
  if (firstOption) {
    (firstOption as HTMLElement).focus();
  }
}, [currentIndex]);
```

---

## Edge Cases

### 1. No Answer Provided
- Timer expires before user selects answer
- Auto-submit empty answer
- Mark as incorrect in results

### 2. Network Timeout
- Request takes > 30 seconds
- Show timeout error
- Allow retry

### 3. Invalid Question Data
- API returns malformed questions
- Show error and prevent quiz start
- Log error for debugging

### 4. Rapid Clicking
- User clicks "Next" multiple times quickly
- Prevent multiple state updates
- Debounce or disable button during transition

### 5. Browser Refresh
- All state is lost
- User returns to landing page
- No recovery mechanism (by design)

---

## Testing Scenarios

### Happy Path
1. Load landing page
2. Click "Start Quiz"
3. Answer all 12 questions
4. Submit quiz
5. View results
6. Click "Try Again"

### Timer Expiry
1. Start quiz
2. Wait for timer to reach 0
3. Verify auto-submit
4. Verify moves to next question

### Error Recovery
1. Disconnect network
2. Try to start quiz
3. See error message
4. Reconnect network
5. Click "Try Again"
6. Quiz loads successfully

### Navigation
1. Start quiz
2. Answer question 1
3. Go to question 2
4. Go back to question 1
5. Verify answer is preserved
6. Change answer
7. Go forward again
8. Verify new answer is saved

---

End of Flow Documentation