# Loop Project Structure

Complete file and folder organization for the Loop quiz application.

---

## Repository Structure
```
Loop/
├── .github/
│   └── prompts/
│       ├── loop-project.prompt.md
│       ├── components.prompt.md
│       ├── state-management.prompt.md
│       ├── api-client.prompt.md
│       ├── styling.prompt.md
│       ├── backend.prompt.md
│       └── typescript.prompt.md
│
├── Loop Requirements/
│   ├── DESIGN_SYSTEM.md
│   ├── FLOW_DOCUMENTATION.md
│   ├── API_SPECIFICATION.md
│   ├── PROJECT_STRUCTURE.md (this file)
│   ├── COMPONENT_SPECS.md
│   └── IMPLEMENTATION_CHECKLIST.md
│
├── backend/
│   ├── src/
│   │   ├── index.ts
│   │   ├── routes/
│   │   │   ├── quiz.ts
│   │   │   └── grade.ts
│   │   ├── data/
│   │   │   └── questions.ts
│   │   ├── schemas/
│   │   │   └── validation.ts
│   │   └── utils/
│   │       └── grading.ts
│   ├── package.json
│   ├── package-lock.json
│   ├── wrangler.toml
│   ├── tsconfig.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── quiz/
│   │   │   │   └── page.tsx
│   │   │   ├── results/
│   │   │   │   └── page.tsx
│   │   │   ├── globals.css
│   │   │   └── favicon.ico
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── checkbox.tsx
│   │   │   │   ├── radio-group.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── progress.tsx
│   │   │   │   ├── badge.tsx
│   │   │   │   ├── alert.tsx
│   │   │   │   ├── skeleton.tsx
│   │   │   │   └── toast.tsx
│   │   │   ├── quiz/
│   │   │   │   ├── QuizContainer.tsx
│   │   │   │   ├── QuestionCard.tsx
│   │   │   │   ├── RadioQuestion.tsx
│   │   │   │   ├── CheckboxQuestion.tsx
│   │   │   │   ├── TextQuestion.tsx
│   │   │   │   ├── QuizTimer.tsx
│   │   │   │   ├── QuizProgress.tsx
│   │   │   │   └── QuizNavigation.tsx
│   │   │   └── shared/
│   │   │       ├── ErrorBoundary.tsx
│   │   │       ├── LoadingState.tsx
│   │   │       └── Logo.tsx
│   │   ├── hooks/
│   │   │   ├── useQuiz.ts
│   │   │   ├── useQuizTimer.ts
│   │   │   └── useQuizAPI.ts
│   │   ├── lib/
│   │   │   ├── utils.ts
│   │   │   └── api.ts
│   │   └── types/
│   │       └── quiz.ts
│   ├── public/
│   │   └── (static assets)
│   ├── package.json
│   ├── package-lock.json
│   ├── next.config.js
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   ├── postcss.config.js
│   ├── components.json
│   ├── .env.local
│   └── README.md
│
├── README.md
├── .gitignore
└── LICENSE
```

---

## Backend Structure

### `/backend`

Root directory for the Hono API running on Cloudflare Workers.

#### `/backend/src`

Source code for the API.

##### `/backend/src/index.ts`

Main entry point for the Hono application.

**Purpose**:
- Initialize Hono app
- Configure CORS middleware
- Register routes
- Set up error handlers
- Export app for Cloudflare Workers

**Key exports**:
```typescript
export default app;
```

##### `/backend/src/routes/`

API route handlers.

**`quiz.ts`**:
- Handles `GET /api/quiz`
- Returns mock questions
- No parameters required

**`grade.ts`**:
- Handles `POST /api/grade`
- Validates request body
- Grades answers
- Returns score and results

##### `/backend/src/data/`

Mock data storage.

**`questions.ts`**:
- Exports `mockQuestions` array
- Contains 12 questions (4 radio, 4 checkbox, 4 text)
- Includes correct answers for grading

##### `/backend/src/schemas/`

Zod validation schemas.

**`validation.ts`**:
- `AnswerSchema` - Validates single answer
- `GradeRequestSchema` - Validates grade request
- Type exports for TypeScript

##### `/backend/src/utils/`

Utility functions.

**`grading.ts`**:
- `gradeAnswers()` - Main grading function
- `gradeQuestion()` - Grades individual question
- Logic for radio, checkbox, text questions

#### Configuration Files

**`package.json`**:
```json
{
  "name": "loop-api",
  "type": "module",
  "scripts": {
    "dev": "wrangler dev",
    "deploy": "wrangler deploy"
  },
  "dependencies": {
    "hono": "^4.0.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "@cloudflare/workers-types": "^4.20240129.0",
    "wrangler": "^3.0.0",
    "typescript": "^5.3.0"
  }
}
```

**`wrangler.toml`**:
```toml
name = "loop-api"
main = "src/index.ts"
compatibility_date = "2024-01-01"

[env.production]
name = "loop-api"
```

**`tsconfig.json`**:
```json
{
  "compilerOptions": {
    "target": "ES2021",
    "module": "ES2022",
    "lib": ["ES2021"],
    "moduleResolution": "bundler",
    "types": ["@cloudflare/workers-types"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

---

## Frontend Structure

### `/frontend`

Root directory for the Next.js application.

#### `/frontend/src/app`

Next.js 15 App Router pages.

##### `/frontend/src/app/layout.tsx`

Root layout component.

**Purpose**:
- Configure HTML structure
- Load Montserrat font
- Set up global providers
- Apply global styles

**Key features**:
- Font configuration
- Metadata export
- Toast provider
- Dark mode support (future)

##### `/frontend/src/app/page.tsx`

Landing page (root route `/`).

**Purpose**:
- Welcome screen
- Logo and tagline
- Brief instructions
- "Start Quiz" button

**Layout**:
- Centered container
- Logo with icon
- Tagline
- Description card
- Primary CTA button

##### `/frontend/src/app/quiz/page.tsx`

Quiz interface (`/quiz` route).

**Purpose**:
- Main quiz-taking interface
- Displays questions one at a time
- Shows timer and progress
- Handles navigation

**Components used**:
- `QuizContainer`
- `QuestionCard`
- `QuizTimer`
- `QuizProgress`
- `QuizNavigation`

**State management**:
- Uses `useQuiz` hook
- Uses `useQuizTimer` hook
- Uses `useQuizAPI` hook

##### `/frontend/src/app/results/page.tsx`

Results page (`/results` route).

**Purpose**:
- Display final score
- Show question-by-question breakdown
- Provide retry option

**Layout**:
- Centered container
- Trophy icon
- Score display
- Results breakdown
- "Try Again" button

##### `/frontend/src/app/globals.css`

Global styles and Tailwind configuration.

**Contains**:
- Tailwind directives
- Custom CSS variables
- Global resets
- Utility classes

#### `/frontend/src/components`

React components.

##### `/frontend/src/components/ui/`

shadcn/ui components (auto-generated, don't modify directly).

**Components**:
- `button.tsx` - Button variants
- `card.tsx` - Card container
- `checkbox.tsx` - Checkbox input
- `radio-group.tsx` - Radio group
- `input.tsx` - Text input
- `progress.tsx` - Progress bar
- `badge.tsx` - Badge/label
- `alert.tsx` - Alert messages
- `skeleton.tsx` - Loading skeletons
- `toast.tsx` - Toast notifications

##### `/frontend/src/components/quiz/`

Custom quiz-specific components.

**`QuizContainer.tsx`**:
- Wrapper for quiz interface
- Manages quiz state
- Handles API calls
- Renders child components

**`QuestionCard.tsx`**:
- Displays single question
- Routes to appropriate question type component
- Shows question number
- Container for answer options

**`RadioQuestion.tsx`**:
- Single-choice question
- Radio button group
- Selection handling
- Visual feedback

**`CheckboxQuestion.tsx`**:
- Multiple-choice question
- Checkbox group
- Multiple selection handling
- Visual feedback

**`TextQuestion.tsx`**:
- Short answer question
- Text input field
- Input validation
- Character counter (optional)

**`QuizTimer.tsx`**:
- Countdown timer display
- Dynamic color changes
- Pulse animation at <10s
- Auto-submit on timeout

**`QuizProgress.tsx`**:
- Progress bar
- Current question indicator
- Completion percentage

**`QuizNavigation.tsx`**:
- Previous/Next buttons
- Submit button (last question)
- Navigation logic
- Disabled states

##### `/frontend/
src/components/shared/`
Reusable shared components.
ErrorBoundary.tsx:

Catches React errors
Displays error UI
Provides recovery option

LoadingState.tsx:

Reusable loading component
Skeleton loaders
Spinner variants

Logo.tsx:

Loop logo component
Icon + text variants
Consistent branding

/frontend/src/hooks
Custom React hooks.
/frontend/src/hooks/useQuiz.ts
Main quiz state management hook.
Exports:
typescriptfunction useQuiz() {
  // Returns quiz state and actions
  return {
    status,
    questions,
    currentIndex,
    answers,
    timeRemaining,
    score,
    results,
    error,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    submitQuiz,
    reset,
  };
}
Uses:

useReducer for state management
useCallback for memoized actions
useMemo for derived values

/frontend/src/hooks/useQuizTimer.ts
Timer management hook.
Exports:
typescriptfunction useQuizTimer(
  isActive: boolean,
  onTimeout: () => void
) {
  // Returns timer state and controls
  return {
    timeRemaining,
    resetTimer,
    pauseTimer,
    resumeTimer,
  };
}
Features:

Countdown from 60 seconds
Auto-submit on timeout
Cleanup on unmount

/frontend/src/hooks/useQuizAPI.ts
API integration hook.
Exports:
typescriptfunction useQuizAPI() {
  return {
    fetchQuiz,
    submitQuiz,
    isLoading,
    error,
  };
}
Features:

Wraps fetch calls
Handles loading states
Error handling
TypeScript types

/frontend/src/lib
Utility libraries.
/frontend/src/lib/utils.ts
General utilities.
Key export:
typescriptimport { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
Purpose:

Combine Tailwind classes
Handle conditional classes
Resolve conflicts

/frontend/src/lib/api.ts
API client functions.
Exports:
typescriptexport async function fetchQuiz(): Promise<Question[]>;
export async function submitQuiz(answers: Answer[]): Promise<GradeResponse>;
Features:

Centralized API calls
Error handling
TypeScript types
Environment variable support

/frontend/src/types
TypeScript type definitions.
/frontend/src/types/quiz.ts
Quiz-related types.
Exports:
typescriptexport type QuestionType = 'radio' | 'checkbox' | 'text';
export type QuizStatus = 'idle' | 'loading' | 'active' | 'submitting' | 'completed' | 'error';

export interface Question { ... }
export interface RadioQuestion extends Question { ... }
export interface CheckboxQuestion extends Question { ... }
export interface TextQuestion extends Question { ... }
export interface Answer { ... }
export interface QuizState { ... }
export interface QuizResult { ... }
Configuration Files
package.json:
json{
  "name": "loop-quiz",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "next": "^15.0.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0",
    "class-variance-authority": "^0.7.0",
    "lucide-react": "^0.344.0",
    "@radix-ui/react-checkbox": "^1.0.4",
    "@radix-ui/react-radio-group": "^1.1.3",
    "@radix-ui/react-progress": "^1.0.3",
    "sonner": "^1.4.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "@types/react": "^18.3.0",
    "@types/node": "^20.0.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
next.config.js:
javascript/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
tailwind.config.ts:
typescriptimport type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFBED',
          100: '#FFF8DC',
          200: '#F5ECD7',
          300: '#E8DCC8',
          400: '#D4C7AF',
          500: '#B8A890',
        },
        brown: {
          300: '#8B8378',
          400: '#5C574F',
          500: '#2D2A26',
        },
        terracotta: {
          100: '#F9E8E0',
          200: '#E8B69A',
          300: '#D4845C',
          400: '#C67750',
          500: '#B0643D',
        },
        sage: {
          100: '#E3EFDB',
          200: '#A8C99A',
          300: '#7BA862',
          400: '#6A9554',
        },
      },
      fontFamily: {
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
tsconfig.json:
json{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
components.json (shadcn config):
json{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

**`.env.local`**:
```
NEXT_PUBLIC_API_URL=http://localhost:8787
# Production: NEXT_PUBLIC_API_URL=https://loop-api.workers.dev
```

---

## Root Files

### `README.md`

Main project README with:
- Project description
- Live demo links
- Quick start guide
- Architecture overview
- Features list
- Trade-offs
- Time spent

### `.gitignore`
```
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Next.js
.next/
out/
build/
dist/

# Environment
.env
.env.local
.env.*.local

# Wrangler
.wrangler/
.dev.vars

# Misc
.DS_Store
*.pem
*.log
npm-debug.log*

# IDE
.vscode/
.idea/
*.swp
*.swo
LICENSE
MIT License

File Naming Conventions
Components

PascalCase: QuizContainer.tsx, QuestionCard.tsx
Descriptive names: RadioQuestion.tsx not Radio.tsx

Hooks

camelCase with use prefix: useQuiz.ts, useQuizTimer.ts

Utilities

camelCase: grading.ts, validation.ts, utils.ts

Types

camelCase for files: quiz.ts
PascalCase for type names: Question, QuizState

Routes

lowercase: quiz/, results/
page.tsx for route pages


Import Aliases
Configure in tsconfig.json:
typescript"paths": {
  "@/*": ["./src/*"]
}
Usage:
typescriptimport { Button } from '@/components/ui/button';
import { useQuiz } from '@/hooks/useQuiz';
import { cn } from '@/lib/utils';
import type { Question } from '@/types/quiz';

Build Artifacts
Backend

.wrangler/ - Wrangler build artifacts (gitignored)
dist/ - Compiled output (gitignored)

Frontend

.next/ - Next.js build cache (gitignored)
out/ - Static export output (gitignored)
build/ - Production build (gitignored)


Development Workflow

Backend Development:

bash   cd backend
   npm install
   npm run dev  # Runs on localhost:8787

Frontend Development:

bash   cd frontend
   npm install
   npm run dev  # Runs on localhost:3000

Add shadcn Component:

bash   cd frontend
   npx shadcn@latest add button

Deploy Backend:

bash   cd backend
   npm run deploy

Deploy Frontend:

bash   # Push to GitHub, Vercel auto-deploys
   git push origin main

End of Project Structure