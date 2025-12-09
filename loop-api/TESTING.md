# Loop API - Backend Testing

## Running Tests

The Loop API includes comprehensive unit tests for all endpoints and functionality.

### Install Test Dependencies

```bash
npm install
```

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (auto-rerun on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Test Coverage

The test suite covers:

### GET /api/quiz
- ✅ Returns exactly 12 questions
- ✅ Questions have correct structure (id, type, question)
- ✅ Distribution: 4 radio, 4 checkbox, 4 text questions
- ✅ Type-specific fields are present

### POST /api/grade
- ✅ Grades answers correctly
- ✅ Radio question validation (single choice)
- ✅ Checkbox question validation (multiple choices)
- ✅ Text question validation (case-insensitive)
- ✅ Handles incorrect answers properly
- ✅ Request validation (rejects invalid data)
- ✅ Empty answers handling
- ✅ Returns correct score and results array

### GET /
- ✅ Returns API information and available endpoints

### CORS
- ✅ CORS headers are properly configured
- ✅ Allows frontend origins

## Test Structure

```
loop-api/
├── src/
│   ├── __tests__/
│   │   └── api.test.ts     # Main API test suite
│   ├── routes/              # API routes
│   ├── utils/               # Grading logic
│   └── data/                # Question data
└── jest.config.json         # Jest configuration
```

## Writing New Tests

To add new tests, create or update files in `src/__tests__/` following the pattern:

```typescript
import { describe, it, expect } from '@jest/globals';
import app from '../index';

describe('Your Test Suite', () => {
  it('should test something', async () => {
    const res = await app.request('/your-endpoint');
    expect(res.status).toBe(200);
  });
});
```

## CI/CD Integration

These tests can be integrated into your CI/CD pipeline:

```yaml
# Example GitHub Actions
- name: Run Backend Tests
  run: |
    cd loop-api
    npm install
    npm test
```
