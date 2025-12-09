# Loop - Quick Start Guide

## 🎯 What You've Built

A full-stack quiz application with:
- **Backend:** Hono API on Cloudflare Workers (12 questions, instant grading)
- **Frontend:** Next.js 15 with Loop design system (60s timer, 3 pages)
- **Tests:** Comprehensive unit tests for all backend endpoints

---

## 🚀 Getting Started

### 1. Start the Backend (Port 8787)

```bash
cd loop-api
npm run dev
```

✅ Backend running at: **http://localhost:8787**

Test it:
```bash
curl http://localhost:8787
curl http://localhost:8787/api/quiz
```

### 2. Start the Frontend (Port 3000)

Open a new terminal:
```bash
cd loop-app
npm run dev
```

✅ Frontend running at: **http://localhost:3000**

### 3. Run Tests

```bash
cd loop-api
npm install  # Install test dependencies (jest, ts-jest)
npm test     # Run all 20+ unit tests
```

---

## 📱 Using the Application

1. **Visit:** http://localhost:3000
2. **Click:** "Start Quiz" button
3. **Answer:** 12 questions (radio, checkbox, text)
4. **Watch:** 60-second countdown timer
5. **Submit:** Your answers for instant grading
6. **View:** Results with score breakdown
7. **Retry:** Take the quiz again!

---

## 🧪 Testing the Backend

### Run All Tests
```bash
cd loop-api
npm test
```

### Expected Output
```
 PASS  src/__tests__/api.test.ts
  Quiz API Tests
    GET /api/quiz
      ✓ should return 12 questions
      ✓ should return questions with correct structure
      ✓ should return 4 radio, 4 checkbox, and 4 text questions
    POST /api/grade
      ✓ should grade answers correctly
      ✓ should handle radio questions correctly
      ✓ should handle checkbox questions correctly
      ✓ should handle text questions with case-insensitive matching
      ✓ should return validation error for invalid request
      ✓ should handle empty answers array
      ✓ should handle incorrect answers
    GET /
      ✓ should return API information
    CORS
      ✓ should include CORS headers

Test Suites: 1 passed, 1 total
Tests:       12+ passed, 12+ total
```

### Watch Mode (Auto-rerun on changes)
```bash
npm run test:watch
```

### Coverage Report
```bash
npm run test:coverage
```

---

## 🔧 Configuration Files

### Backend (.env)
No .env needed for local development. Port 8787 configured in `wrangler.jsonc`.

### Frontend (.env.local)
Already configured:
```
NEXT_PUBLIC_API_URL=http://localhost:8787
```

---

## 📊 API Endpoints

### GET /api/quiz
Returns 12 quiz questions.

**Example:**
```bash
curl http://localhost:8787/api/quiz
```

**Response:**
```json
{
  "questions": [
    {
      "id": "q1",
      "type": "radio",
      "question": "Which HTTP status code indicates successful resource creation?",
      "choices": ["200 OK", "201 Created", "204 No Content", "202 Accepted"],
      "correctIndex": 1
    },
    ...
  ]
}
```

### POST /api/grade
Grades user answers.

**Example:**
```bash
curl -X POST http://localhost:8787/api/grade \
  -H "Content-Type: application/json" \
  -d '{
    "answers": [
      {"id": "q1", "value": 1},
      {"id": "q5", "value": [0, 2, 3]},
      {"id": "q9", "value": "Cascading Style Sheets"}
    ]
  }'
```

**Response:**
```json
{
  "score": 10,
  "total": 12,
  "results": [
    {"id": "q1", "correct": true},
    {"id": "q2", "correct": false},
    ...
  ]
}
```

---

## 🎨 Design System

### Colors
- **Background:** Cream (#FFFBED)
- **Cards:** Cream 100 (#FFF8DC)
- **Text:** Brown 500 (#2D2A26)
- **Primary Action:** Terracotta 300 (#D4845C)
- **Success:** Sage 300 (#7BA862)

### Typography
- **Font:** Montserrat (weights 300-700)
- **Logo:** Light (300)
- **Body:** Normal (400)
- **Headings:** Medium (500)

---

## 🐛 Troubleshooting

### Backend won't start
```bash
cd loop-api
npm install
npm run dev
```

### Frontend can't connect to API
1. Check backend is running on port 8787
2. Verify `.env.local` has correct URL
3. Check browser console for CORS errors

### Tests failing
```bash
cd loop-api
npm install  # Reinstall dependencies
npm test
```

### Port already in use
Kill the process:
```bash
# Backend (8787)
lsof -ti:8787 | xargs kill -9

# Frontend (3000)
lsof -ti:3000 | xargs kill -9
```

---

## ✅ Verification Checklist

Before showing to employer:

- [ ] Backend running on port 8787
- [ ] Frontend running on port 3000
- [ ] Can load landing page
- [ ] Can start quiz and see questions
- [ ] Timer counts down
- [ ] Can navigate between questions
- [ ] Can submit quiz
- [ ] Results page shows score
- [ ] All tests passing (`npm test`)
- [ ] No console errors in browser

---

## 📝 What to Show Employer

1. **Code Quality**
   - TypeScript throughout
   - Custom hooks (useQuiz, useQuizTimer)
   - Error boundaries
   - Loading states
   - Type-safe API client

2. **Testing**
   - Unit tests for backend
   - Test coverage for grading logic
   - Request validation tests
   - Show test output: `npm test`

3. **Design**
   - Custom design system (Loop theme)
   - Warm cream/terracotta aesthetic
   - Montserrat typography
   - Responsive layout

4. **Architecture**
   - Clean separation (backend/frontend)
   - RESTful API design
   - State management with useReducer
   - Component composition

5. **Features**
   - 60s timer with auto-submit
   - 3 question types
   - Instant grading
   - Results breakdown
   - Try again functionality

---

## 🚀 Next Steps

Ready to deploy:
- Backend: Deploy to Cloudflare Workers
- Frontend: Deploy to Vercel
- Update NEXT_PUBLIC_API_URL with production URL

---

**Built with:** Next.js 15 • Hono • TypeScript • Tailwind CSS • shadcn/ui
