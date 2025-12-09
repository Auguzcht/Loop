---
agent: agent
applyTo: "frontend/src/lib/api.ts,frontend/src/app/**/page.tsx"
---

All API calls in Loop must follow these patterns:

Base Configuration:
- API URL from environment: process.env.NEXT_PUBLIC_API_URL
- All API utilities in lib/api.ts
- Use fetch API (no axios or other libraries)

API Endpoints:
- GET /api/quiz - Returns 12 questions
- POST /api/grade - Accepts answers array, returns score and results

Request Pattern:
```typescript
async function fetchQuiz(): Promise<Question[]> {
  const response = await fetch(`${API_URL}/api/quiz`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch quiz: ${response.statusText}`);
  }
  
  const data = await response.json();
  return data.questions;
}

async function submitQuiz(answers: Answer[]): Promise<QuizResult> {
  const response = await fetch(`${API_URL}/api/grade`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers }),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to submit quiz: ${response.statusText}`);
  }
  
  return response.json();
}
```

Component Usage Pattern:
```typescript
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  async function loadQuiz() {
    try {
      setIsLoading(true);
      setError(null);
      const questions = await fetchQuiz();
      dispatch({ type: 'LOAD_QUESTIONS', payload: questions });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load quiz';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }
  
  loadQuiz();
}, []);
```

Error Handling:
- Always wrap API calls in try-catch
- Set loading state before request
- Clear loading state in finally block
- Show user-friendly error messages with toast notifications
- Store error in state for display in UI

TypeScript Types:
```typescript
interface Question {
  id: string;
  type: 'radio' | 'checkbox' | 'text';
  question: string;
  choices?: string[];
  correctIndex?: number;
  correctIndexes?: number[];
  correctText?: string;
}

interface Answer {
  id: string;
  value: string | number | number[];
}

interface QuizResult {
  score: number;
  total: number;
  results: Array<{ id: string; correct: boolean }>;
}
```

Reference Loop Requirements/API_SPECIFICATION.md for complete API contracts.