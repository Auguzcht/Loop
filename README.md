# Loop

> A modern full-stack quiz application demonstrating iteration through knowledge

**Stay in the loop** - Learn. Test. Loop.

[![Live Demo](https://img.shields.io/badge/demo-live-terracotta)](https://loop-quiz.vercel.app)
[![API](https://img.shields.io/badge/api-cloudflare-orange)](https://loop-api.workers.dev)

---

## 🎯 About Loop

Loop is a full-stack quiz platform built for the Enrolla coding challenge. The name reflects both the programming concept of iteration (looping through questions) and the continuous learning cycle - test, review, improve, repeat.

Just like a `for` loop iterates through an array, Loop guides you through knowledge assessment one question at a time.

### 🎨 Design Philosophy

- **Warm & Welcoming**: Cream/beige palette creates an approachable learning environment
- **Developer-Focused**: Clean, minimal interface that developers will appreciate
- **Smooth Interactions**: Every click, transition, and state change is thoughtfully animated

---

## ✨ Features

- **3 Question Types**: Radio (single choice), Checkbox (multiple choice), Text (short answer)
- **Timed Quiz**: 60-second countdown per question with visual warnings
- **Smart State Management**: Custom hooks with useReducer for predictable state
- **Responsive Design**: Seamless experience from mobile to desktop
- **Accessibility First**: Keyboard navigation, ARIA labels, high contrast
- **Type-Safe**: Full TypeScript coverage with Zod validation
- **Edge Runtime**: Lightning-fast with Cloudflare Workers + Vercel Edge

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Backend (Hono API)
```bash
cd backend
npm install
npm run dev        # Local development
npm run deploy     # Deploy to Cloudflare Workers
```

API will be available at `http://localhost:8787`

### Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev        # Local development at http://localhost:3000
npm run build      # Production build
```

Set environment variable:
```bash
NEXT_PUBLIC_API_URL=https://loop-api.workers.dev
```

---

## 🏗️ Architecture

### Tech Stack

**Backend**
- **Runtime**: Cloudflare Workers (Edge)
- **Framework**: Hono (lightweight, fast)
- **Validation**: Zod (type-safe schemas)

**Frontend**
- **Framework**: Next.js 15 (App Router)
- **Styling**: TailwindCSS + shadcn/ui
- **Font**: Montserrat (Google Fonts)
- **State**: React hooks (useReducer + Context)
- **Icons**: Lucide React

### Key Design Decisions

**Why useReducer over useState?**
Quiz state has complex transitions (loading → active → submitting → completed). A reducer centralizes this logic and makes state changes predictable and testable.

**Why custom hooks over Zustand?**
For this scope, React's built-in patterns are sufficient. Custom hooks (`useQuiz`, `useQuizTimer`) keep code clean while demonstrating deep React knowledge.

**Why Zod validation?**
Type-safe validation at the API boundary prevents runtime errors and provides excellent DX with TypeScript inference.

**Why Edge runtime?**
Zero cold starts, global distribution, and instant responses. Perfect for a quiz app where speed matters.

---

## 🎨 Design System

### Color Palette
- **Background**: Warm cream (#FFFBED)
- **Accent**: Terracotta (#D4845C)
- **Text**: Deep brown (#2D2A26)
- **Success**: Sage green (#7BA862)
- **Error**: Warm red (#C85D5D)

### Typography
- **Font**: Montserrat Light (300) for headings
- **Tagline**: "Stay in the loop"

See full design system in `DESIGN.md`

---

## 📁 Project Structure
```
loop/
├── backend/
│   ├── src/
│   │   ├── index.ts          # Hono app entry
│   │   ├── routes/           # API routes
│   │   ├── data/             # Mock questions
│   │   ├── schemas/          # Zod schemas
│   │   └── utils/            # Grading logic
│   └── wrangler.toml         # Cloudflare config
│
└── frontend/
    ├── src/
    │   ├── app/              # Next.js pages
    │   ├── components/       # React components
    │   │   ├── ui/          # shadcn components
    │   │   └── quiz/        # Custom quiz components
    │   ├── hooks/           # Custom hooks
    │   ├── lib/             # Utilities
    │   └── types/           # TypeScript types
    └── tailwind.config.ts   # Tailwind + custom colors
```

---

## 🧪 API Documentation

### GET `/api/quiz`

Returns 12 quiz questions.

**Response:**
```json
{
  "questions": [
    {
      "id": "q1",
      "type": "radio",
      "question": "Which HTTP status code indicates success?",
      "choices": ["200", "404", "500"],
      "correctIndex": 0
    }
  ]
}
```

### POST `/api/grade`

Grades quiz answers.

**Request:**
```json
{
  "answers": [
    { "id": "q1", "value": 0 },
    { "id": "q2", "value": [0, 2] },
    { "id": "q3", "value": "Next.js" }
  ]
}
```

**Response:**
```json
{
  "score": 10,
  "total": 12,
  "results": [
    { "id": "q1", "correct": true },
    { "id": "q2", "correct": false }
  ]
}
```

---

## 🎁 Bonus Features

### 1. Timed Quiz ⏱️
Each question has a 60-second countdown. Timer changes color based on remaining time:
- Green (>20s) → Amber (10-20s) → Red (<10s, pulsing)

Auto-submits question when time expires.

### 2. Custom State Management 🎯
Built a custom state management solution using `useReducer` with these benefits:
- Centralized state logic
- Predictable state transitions
- Easy to test and debug
- No external dependencies

Implementation in `hooks/useQuiz.ts`:
```typescript
type QuizAction = 
  | { type: 'LOAD_QUESTIONS'; payload: Question[] }
  | { type: 'ANSWER_QUESTION'; payload: Answer }
  | { type: 'NEXT_QUESTION' }
  | { type: 'SUBMIT_QUIZ' }
  | { type: 'TIMEOUT' }
```

---

## 🎯 Trade-offs & Future Improvements

### Shortcuts Taken
- **Mock data only** - Used hardcoded questions instead of a database
- **No authentication** - Anyone can take the quiz
- **Simple grading** - Text answers use exact string matching (case-insensitive)
- **No progress persistence** - Refresh loses quiz state

### With More Time, I'd Add:
- **Question bank** - Dynamic question selection from larger pool
- **Difficulty levels** - Easy/Medium/Hard questions
- **Categories** - Filter by topic (JavaScript, React, CSS, etc.)
- **Leaderboard** - Global/daily high scores
- **Social sharing** - Share results with friends
- **Analytics** - Track question difficulty, common mistakes
- **Improved text grading** - Fuzzy matching, keyword detection
- **Quiz history** - See past attempts and progress over time

---

## ⏱️ Time Spent

**Total**: ~16 hours

- Planning & Setup: 2 hours
- Backend (Hono + Validation): 3 hours
- Frontend Core (Components + State): 5 hours
- UI Polish & Animations: 3 hours
- Timer Implementation: 2 hours
- Testing & Deployment: 1 hour

---

## 🎬 Demo Video

[📹 Watch 5-minute walkthrough](https://www.loom.com/share/your-video-id)

Covers:
- Live quiz demo with all question types
- Timer functionality and auto-submit
- Code architecture walkthrough
- State management explanation
- Trade-offs and future improvements

---

## 🙏 Acknowledgments

Built for the **Enrolla Full-Stack Developer Challenge**

- Design inspired by warm, approachable learning platforms
- Name "Loop" reflects both programming iteration and continuous learning
- Montserrat font chosen for its clean, modern aesthetic

---

## 📝 License

MIT © Alfred Nodado (2025)

---

**Loop** - Because learning is an iteration, not a destination. Stay in the loop. 🔄