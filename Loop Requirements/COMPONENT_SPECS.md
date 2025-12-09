# Loop Component Specifications

Detailed specifications for all React components.

---

## Quiz Components

### QuizContainer

**Location**: `src/components/quiz/QuizContainer.tsx`

**Purpose**: Main wrapper for quiz interface, manages state and API calls

**Props**: None (top-level component)

**State Management**:
```typescript
const { status, questions, currentIndex, answers, timeRemaining, score } = useQuiz();
const { fetchQuiz, submitQuiz } = useQuizAPI();
```

**Renders**:
- Loading state → `LoadingState`
- Error state → `Alert` with retry
- Active state → Question components + Timer + Progress + Navigation
- Completed state → Redirect to results

---

### QuestionCard

**Location**: `src/components/quiz/QuestionCard.tsx`

**Props**:
```typescript
interface QuestionCardProps {
  question: Question;
  answer: Answer | undefined;
  onAnswer: (answer: Answer) => void;
}
```

**Behavior**: Routes to correct question type component based on `question.type`

**Styling**: `bg-cream-100 border-2 border-cream-400 rounded-2xl p-10`

---

### RadioQuestion

**Props**:
```typescript
interface RadioQuestionProps {
  question: RadioQuestion;
  value: number | undefined;
  onChange: (value: number) => void;
}
```

**Features**:
- Single selection
- Visual feedback on selection
- Keyboard navigation (arrow keys)

**Key Classes**: `data-[state=checked]:bg-terracotta-50 data-[state=checked]:border-terracotta-300`

---

### CheckboxQuestion

**Props**:
```typescript
interface CheckboxQuestionProps {
  question: CheckboxQuestion;
  value: number[];
  onChange: (value: number[]) => void;
}
```

**Features**:
- Multiple selection
- Toggle on/off
- At least one required

---

### TextQuestion

**Props**:
```typescript
interface TextQuestionProps {
  question: TextQuestion;
  value: string;
  onChange: (value: string) => void;
}
```

**Features**:
- Text input
- Trim whitespace
- Non-empty validation

---

### QuizTimer

**Props**:
```typescript
interface QuizTimerProps {
  timeRemaining: number;
}
```

**Dynamic Styling**:
```typescript
timeRemaining > 20: 'bg-sage-100 text-sage-400'
10-20s: 'bg-amber-100 text-amber-600'
<10s: 'bg-red-100 text-red-400 animate-pulse'
```

---

### QuizProgress

**Props**:
```typescript
interface QuizProgressProps {
  current: number;
  total: number;
}
```

**Displays**: Progress bar + "Question X of Y" badge

---

### QuizNavigation

**Props**:
```typescript
interface QuizNavigationProps {
  canGoPrevious: boolean;
  canGoNext: boolean;
  isLastQuestion: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}
```

**Buttons**:
- Previous (disabled if first question)
- Next (disabled if no answer)
- Submit (only on last question)

---

## Shared Components

### Logo

**Props**:
```typescript
interface LogoProps {
  withIcon?: boolean;
  withTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}
```

**Variants**: Icon + text, text only, with/without tagline

---

### ErrorBoundary

**Props**:
```typescript
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}
```

**Features**: Catches errors, displays fallback UI, reset button

---

### LoadingState

**Props**:
```typescript
interface LoadingStateProps {
  message?: string;
  variant?: 'spinner' | 'skeleton';
}
```

**Variants**: Spinner with text, skeleton loaders

---

## Page Components

### Landing Page

**Route**: `/`

**Components**: Logo, welcome text, start button

**Actions**: Navigate to `/quiz` on start

---

### Quiz Page

**Route**: `/quiz`

**Components**: QuizContainer, Timer, Progress, Questions, Navigation

**State**: Managed by `useQuiz` hook

---

### Results Page

**Route**: `/results`

**Display**: Score, breakdown, retry button

**Data**: Passed via URL params or state

---

End of Component Specs