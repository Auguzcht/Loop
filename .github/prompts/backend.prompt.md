---
agent: agent
applyTo: "backend/src/**/*.ts"
---

Loop backend is built with Hono on Cloudflare Workers runtime.

Stack:
- Framework: Hono (lightweight, fast)
- Runtime: Cloudflare Workers (Edge)
- Validation: Zod schemas
- No database, no authentication

API Routes:

GET /api/quiz
- Returns 12 mock questions
- Response: { questions: Question[] }
- No authentication required

POST /api/grade
- Accepts answers array
- Validates request body with Zod
- Returns score and results
- Request: { answers: Answer[] }
- Response: { score: number, total: number, results: Array<{ id: string, correct: boolean }> }

Validation Pattern:
```typescript
import { z } from 'zod';

const AnswerSchema = z.object({
  id: z.string(),
  value: z.union([z.string(), z.number(), z.array(z.number())]),
});

const GradeRequestSchema = z.object({
  answers: z.array(AnswerSchema),
});

// In route handler
app.post('/api/grade', async (c) => {
  try {
    const body = await c.req.json();
    const validated = GradeRequestSchema.parse(body);
    
    // Grade logic
    const result = gradeAnswers(validated.answers);
    
    return c.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: 'Invalid request body' }, 400);
    }
    return c.json({ error: 'Internal server error' }, 500);
  }
});
```

CORS Configuration:
```typescript
import { cors } from 'hono/cors';

app.use('/*', cors({
  origin: ['http://localhost:3000', 'https://loop-quiz.vercel.app'],
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type'],
}));
```

Error Handling:
- Validate all inputs with Zod
- Return 400 for validation errors
- Return 500 for server errors
- Include descriptive error messages
- Never expose internal errors to client

Mock Data:
- 12 questions total: 4 radio, 4 checkbox, 4 text
- Store in data/questions.ts
- Mix technical (web dev) and general knowledge
- Include engaging, non-boring questions

Grading Logic:
- Radio: Compare answer value to correctIndex
- Checkbox: Compare answer array to correctIndexes
- Text: Case-insensitive exact match with correctText

TypeScript Types:
```typescript
type Question = {
  id: string;
  type: 'radio' | 'checkbox' | 'text';
  question: string;
  choices?: string[];
  correctIndex?: number;
  correctIndexes?: number[];
  correctText?: string;
};

type Answer = {
  id: string;
  value: string | number | number[];
};
```

Reference Loop Requirements/API_SPECIFICATION.md for complete API contracts.