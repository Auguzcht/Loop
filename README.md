<div align="center">
  <img src="https://github.com/Auguzcht/Loop/blob/main/loop-app/public/loop-logo.svg" alt="Loop Logo" width="400"/>
  
  <h1>Loop</h1>
  
  > Stay in the loop - Learn. Test. Loop.
  
  [![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org)
  [![Hono](https://img.shields.io/badge/Hono-4.10-orange)](https://hono.dev)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org)
  [![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-f38020)](https://workers.cloudflare.com)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com)
</div>

---

## 🎯 About

A full-stack quiz application where every detail matters. Loop isn't just about answering questions - it's about the complete learning cycle, beautifully executed.

### 💡 The Name

"Loop" is intentionally layered with meaning:

**For Developers:**
- **Programming loops** - Iteration through questions (`for`, `while`, `.forEach()`)
- **Event loop** - Continuous, non-blocking learning process
- **Feedback loop** - Test → Review → Improve → Repeat

**For Users:**
- **Stay in the loop** - Engaged, informed, connected
- **Loop back** - Review wrong answers, retry quiz
- **In the loop** - Part of the learning community

The name works on every level. When you hear "Loop," you immediately understand it's both technical and approachable.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm/pnpm

### 📦 Installation & Development

**API (Cloudflare Workers)**
```bash
cd loop-api
npm install
npm run dev        # Local at http://localhost:8787
npm run deploy     # Deploy to Cloudflare Workers
npm test          # Run test suite (52 tests)
```

**Frontend (Next.js)**
```bash
cd loop-app
npm install
npm run dev        # Local at http://localhost:3000
npm run build      # Production build
npm start         # Serve production build
```

**Environment Variables**
```bash
# loop-app/.env.local
NEXT_PUBLIC_API_URL=https://loop-api.loop-api.workers.dev
```

---

## 🏗️ Architecture

### 🎨 Design Philosophy

**Inspired by Gizmo AI** - Clean, conversational interface that puts content first

**Retro Color Palette** - Monokai/Claude-inspired warmth:
- Cream background (#FAF8F5) - Easy on the eyes
- Terracotta accent (#C67750) - Warm, inviting
- Sage success (#90B494) - Gentle feedback
- Brown text (#5C4A3A) - High contrast without harshness

The result? A familiar, comforting aesthetic that developers recognize and users enjoy.

### ⚙️ Tech Stack

**Backend - Hono on Cloudflare Workers**
- **Why Edge?** Zero cold starts, global distribution, sub-50ms responses
- **Why Hono?** Lightweight (12kb), Express-like DX, built for edge runtimes
- **Why not Express?** Too heavy for edge, slower startup times

**Frontend - Next.js 15 App Router**
- **Why App Router?** Better data fetching patterns, React Server Components ready
- **Why Next.js?** Production-ready, excellent DX, Vercel deployment
- **React 19** - Latest features with React Compiler enabled

**Styling - Tailwind CSS v4 + shadcn/ui**
- **Why Tailwind v4?** CSS-first, faster builds, better DX
- **Why shadcn?** Copy-paste components, full control, no bloat
- **Framer Motion** - 60fps animations that feel native

**Validation - Zod**
- Type-safe schemas with TypeScript inference
- Runtime validation at API boundaries
- Single source of truth for types

**State Management - Custom React Hooks**
- `useReducer` for complex quiz state
- No external state library needed for this scope
- Predictable, testable state transitions

### 🎯 Key Architecture Decisions

**Node.js vs Edge Runtime?**
Edge wins for this use case - quiz responses need to be instant. Cloudflare Workers deploy globally in seconds, no cold starts, and handle spikes effortlessly.

**App Router vs Pages Router?**
App Router. Better patterns for data fetching, cleaner file structure, and we're building for the future. The learning curve was worth it.

**Custom Hooks vs Zustand/Redux?**
Custom hooks. For a quiz app, React's built-in patterns are perfect. `useReducer` handles complex state, `useContext` shares it. Adding Zustand would be overengineering.

**Monorepo vs Separate Repos?**
Separate deployment targets (Cloudflare Workers + Vercel) make a monorepo unnecessary. Independent repos keep things simple.

### 📚 Libraries & Rationale

**Production Dependencies:**
- `hono` - Fast, lightweight edge framework
- `zod` - Runtime type safety
- `next` - React meta-framework
- `framer-motion` - Silky smooth animations
- `recharts` - Beautiful, accessible charts
- `lucide-react` - Consistent icon system
- `tailwindcss` - Utility-first styling

**Development Tools:**
- `typescript` - Type safety everywhere
- `jest` + `ts-jest` - 52 tests for grading logic
- `eslint` + `prettier` - Code quality
- `wrangler` - Cloudflare deployment

**Why these and not alternatives?**
Every library serves a clear purpose. No bloat, no "just in case" dependencies. shadcn/ui components are copied into the project, so we control every line of code.

---

## ✨ Features

**Core Functionality:**
- 3 question types (radio, checkbox, text)
- Deterministic shuffling per session
- Time tracking per question
- Instant grading with detailed feedback
- 3D flip cards for answer review

**UX Polish:**
- Magnetic button effects
- Smooth page transitions
- Dynamic gradient backgrounds
- Sound effects (toggle-able)
- Loading states everywhere
- Responsive across all devices

**Developer Experience:**
- Full TypeScript coverage
- Comprehensive test suite
- Hot reload (frontend & backend)
- Type-safe API contracts
- Zero runtime errors (Zod validates everything)

---

## 🎨 Design System

### Color Palette
```css
--cream-50:     #FAF8F5;  /* Background */
--cream-400:    #E5D5C3;  /* Borders */
--terracotta:   #C67750;  /* Primary accent */
--sage:         #90B494;  /* Success */
--brown-500:    #5C4A3A;  /* Headings */
--brown-400:    #8B7355;  /* Body text */
```

### Typography
- **Font:** Inter (system fallback)
- **Headings:** 600 weight
- **Body:** 400 weight
- **Scale:** Tailwind's default type scale

---

## 🧪 API Reference

### `GET /api/quiz`

Fetch quiz questions with optional deterministic shuffling.

**Query Parameters:**
- `shuffle` - Set to `true` to enable shuffling
- `session_id` - Unique session identifier for deterministic results

**Response:**
```json
{
  "questions": [
    {
      "id": "q1",
      "type": "radio",
      "question": "What does API stand for?",
      "choices": ["...", "...", "..."],
      "correctIndex": 1
    }
  ]
}
```

### `POST /api/grade`

Grade user answers and return detailed results.

**Request:**
```json
{
  "answers": [
    { "id": "q1", "value": 1, "timeSpent": 5432 }
  ],
  "session_id": "session-123-abc"
}
```

**Response:**
```json
{
  "score": 10,
  "total": 12,
  "results": [
    {
      "id": "q1",
      "correct": true,
      "timeSpent": 5432,
      "userAnswer": 1,
      "correctAnswer": 1
    }
  ]
}
```

---

## 🎯 Trade-offs & Decisions

### What We Didn't Compromise On

**Type Safety** - Full TypeScript coverage with strict mode. Zod validates everything at runtime.

**User Experience** - Every interaction is animated. Every state change has feedback. No jarring transitions.

**Code Quality** - Clean, readable code. Comprehensive test suite. No "TODO" comments in production.

**Performance** - Edge runtime, optimized bundle sizes, lazy loading where it makes sense.

### Pragmatic Choices

**Component Libraries** - Used shadcn/ui to accelerate development. Why reinvent radio buttons? Copy-paste components give us full control without the boilerplate.

**Mock Data** - Hardcoded 12 questions instead of building a database. For this scope, a database adds complexity without value.

**Simple Text Matching** - Text answers use case-insensitive exact matching. Fuzzy matching or NLP would be overkill here.

**No Authentication** - Anyone can take the quiz. Adding auth would shift focus from the core experience.

**Session Storage** - Quiz state lives in sessionStorage. It's simple, works offline, and perfect for single-session quizzes.

### What I'd Add With More Time

**Question Bank** - Dynamic selection from hundreds of questions across categories

**Difficulty Tiers** - Easy/Medium/Hard modes with adaptive questioning

**Better Analytics** - Question difficulty heatmaps, common mistake patterns

**Social Features** - Leaderboards, shareable result cards

**Progress Persistence** - Save quiz state to resume later

**Admin Dashboard** - CRUD operations for questions without code changes

---

## ⏱️ Time Investment

**Total: ~17 hours**

**Planning & Assets (4 hours)**
- Concept ideation and naming
- Logo design iterations
- Color palette exploration
- Sound effect creation (with Claude & Gemini)
- UX flow mapping

**Development (12 hours)**
- Backend setup + API design: 2h
- Frontend core components: 4h
- State management & hooks: 2h
- Animations & polish: 2h
- Testing & bug fixes: 2h

**Optimization (1 hour)**
- SEO implementation
- Performance tuning
- Accessibility audit

This wasn't rushed. Every component was considered, every animation tweaked. Quality takes time.

---

## 📝 License

MIT © 2025

---

<div align="center">
  
  **Loop** - Because learning is iteration, not destination.
  
  <p><strong>Built with ❤️ by Alfred Nodado</strong></p>
  
</div>