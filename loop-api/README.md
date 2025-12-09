# Loop Quiz API

Quiz API built with Hono and Cloudflare Workers.

## Features

- Quiz question delivery with deterministic shuffling
- Answer grading with time tracking
- Secure answer validation (correct answers never exposed to client)
- Type-safe API with Zod validation

## Development

```txt
npm install
npm run dev
```

## Testing

Run unit and integration tests:

```txt
npm test
```

## Deployment

```txt
npm run deploy
```

## API Endpoints

### GET /api/quiz

Returns quiz questions. Supports optional deterministic shuffling.

**Query Parameters:**
- `session_id` (optional): Unique identifier for deterministic shuffling
- `shuffle` (optional): Set to `"true"` to enable shuffling

**Example:**
```
GET /api/quiz?shuffle=true&session_id=user-123
```

When shuffling is enabled with a session_id:
- Questions are shuffled deterministically (same session_id always produces same order)
- Multiple choice options are also shuffled per question
- Ensures consistent experience for the same user/session

**Response:**
```json
{
  "questions": [
    {
      "id": "string",
      "type": "radio" | "checkbox" | "text",
      "question": "string",
      "choices": ["string"]
    }
  ]
}
```

### POST /api/grade

Grade quiz answers with optional time tracking.

**Request Body:**
```json
{
  "answers": [
    {
      "id": "string",
      "value": "number | number[] | string",
      "timeSpent": "number (optional, in milliseconds)"
    }
  ]
}
```

**Response:**
```json
{
  "score": "number",
  "total": "number",
  "results": [
    {
      "id": "string",
      "correct": "boolean",
      "timeSpent": "number (if provided)",
      "userAnswer": "any",
      "correctAnswer": "any"
    }
  ]
}
```

## Architecture

### Deterministic Shuffling

The API uses seeded random shuffling to ensure users get consistent question/choice orders:

- **Shuffle Utility** (`src/utils/shuffle.ts`): Fisher-Yates shuffle with LCG
- **Seed Generation**: Converts string identifiers to numeric seeds
- **Per-Question Shuffling**: Choices shuffled using `sessionId + questionId` as seed

### Grading Logic

The grading system (`src/utils/grading.ts`) supports:

- **Radio questions**: Single correct index
- **Checkbox questions**: Multiple correct indexes (order-independent)
- **Text questions**: Case-insensitive, whitespace-trimmed comparison
- **Time tracking**: Optional millisecond timing per question
- **Answer storage**: Both user answer and correct answer returned

## Type Generation

[For generating/synchronizing types](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```txt
npm run cf-typegen
```

Pass the `CloudflareBindings` as generics when instantiating `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```
