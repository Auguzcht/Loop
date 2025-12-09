---
agent: agent
applyTo: "**/*.ts,**/*.tsx"
excludeAgent: code-review
---

All TypeScript code in Loop must follow strict typing guidelines.

Type Safety Rules:
- Never use 'any' type
- Use explicit types for function parameters and return values
- Define interfaces for all object shapes
- Use type unions for discriminated unions (e.g., question types)
- Use proper type guards when narrowing types

Common Types:

Question Types:
```typescript
type QuestionType = 'radio' | 'checkbox' | 'text';

interface BaseQuestion {
  id: string;
  type: QuestionType;
  question: string;
}

interface RadioQuestion extends BaseQuestion {
  type: 'radio';
  choices: string[];
  correctIndex: number;
}

interface CheckboxQuestion extends BaseQuestion {
  type: 'checkbox';
  choices: string[];
  correctIndexes: number[];
}

interface TextQuestion extends BaseQuestion {
  type: 'text';
  correctText: string;
}

type Question = RadioQuestion | CheckboxQuestion | TextQuestion;
```

Answer Types:
```typescript
interface Answer {
  id: string;
  value: string | number | number[];
}
```

Quiz State:
```typescript
type QuizStatus = 'idle' | 'loading' | 'active' | 'submitting' | 'completed' | 'error';

interface QuizState {
  status: QuizStatus;
  questions: Question[];
  currentIndex: number;
  answers: Answer[];
  timeRemaining: number;
  score: number | null;
  results: Array<{ id: string; correct: boolean }> | null;
  error: string | null;
}
```

Component Props:
```typescript
interface QuestionCardProps {
  question: Question;
  answer: Answer | undefined;
  onAnswer: (answer: Answer) => void;
  timeRemaining: number;
}
```

Type Guards:
```typescript
function isRadioQuestion(question: Question): question is RadioQuestion {
  return question.type === 'radio';
}

function isCheckboxQuestion(question: Question): question is CheckboxQuestion {
  return question.type === 'checkbox';
}

function isTextQuestion(question: Question): question is TextQuestion {
  return question.type === 'text';
}
```

Generic Patterns:
```typescript
// Use generics for reusable utilities
function createAsyncState<T>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  return { data, loading, error, setData, setLoading, setError };
}
```

Never:
- Use 'any' type (use 'unknown' if truly unknown)
- Suppress TypeScript errors with @ts-ignore
- Use type assertions unless absolutely necessary
- Leave types implicit when they're not obvious

Always:
- Define interfaces for object shapes
- Use type unions for variants
- Export types that are used across files
- Use strict mode in tsconfig.json
```

---

## Directory Structure
```
.github/
└── prompts/
    ├── loop-project.prompt.md         # General project context
    ├── components.prompt.md           # Component guidelines
    ├── state-management.prompt.md     # State management rules
    ├── api-client.prompt.md          # API integration patterns
    ├── styling.prompt.md             # Design system and styling
    ├── backend.prompt.md             # Hono backend rules
    └── typescript.prompt.md          # TypeScript guidelines