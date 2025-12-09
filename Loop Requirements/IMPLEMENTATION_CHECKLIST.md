# Loop Implementation Checklist

Step-by-step implementation guide.

---

## Phase 1: Setup (2 hours)

### Backend Setup
- [ ] `npm create hono@latest backend` (Cloudflare Workers)
- [ ] Install dependencies: `hono`, `zod`
- [ ] Configure `wrangler.toml`
- [ ] Set up TypeScript config
- [ ] Create folder structure

### Frontend Setup
- [ ] `npx create-next-app@latest frontend` (App Router, TypeScript, Tailwind)
- [ ] Install shadcn: `npx shadcn@latest init`
- [ ] Install components: button, card, checkbox, radio-group, input, progress, badge, alert, skeleton, toast
- [ ] Configure Tailwind with custom colors
- [ ] Set up Montserrat font
- [ ] Create folder structure
- [ ] Add `.env.local` with API URL

---

## Phase 2: Backend (3 hours)

### Mock Data
- [ ] Create `src/data/questions.ts` with 12 questions
  - [ ] 4 radio questions
  - [ ] 4 checkbox questions
  - [ ] 4 text questions

### Validation
- [ ] Create `src/schemas/validation.ts`
- [ ] Define Zod schemas (Answer, GradeRequest)
- [ ] Export TypeScript types

### Routes
- [ ] Create `src/routes/quiz.ts` (GET /api/quiz)
- [ ] Create `src/routes/grade.ts` (POST /api/grade)
- [ ] Implement error handling

### Grading Logic
- [ ] Create `src/utils/grading.ts`
- [ ] Implement `gradeAnswers()` function
- [ ] Handle radio/checkbox/text grading

### Main App
- [ ] Configure CORS in `src/index.ts`
- [ ] Register routes
- [ ] Add error handlers
- [ ] Test with `npm run dev`

### Deploy
- [ ] `npm run deploy` to Cloudflare Workers
- [ ] Test deployed API with cURL

---

## Phase 3: Core Frontend (5 hours)

### Types
- [ ] Create `src/types/quiz.ts` with all interfaces

### API Client
- [ ] Create `src/lib/api.ts`
- [ ] Implement `fetchQuiz()`
- [ ] Implement `submitQuiz()`

### State Management
- [ ] Create `src/hooks/useQuiz.ts`
- [ ] Implement reducer with all actions
- [ ] Export quiz state and actions

### Timer Hook
- [ ] Create `src/hooks/useQuizTimer.ts`
- [ ] Implement countdown logic
- [ ] Handle timeout auto-submit

### Shared Components
- [ ] Create `Logo.tsx`
- [ ] Create `LoadingState.tsx`
- [ ] Create `ErrorBoundary.tsx`

---

## Phase 4: Quiz Components (4 hours)

### Question Components
- [ ] Create `QuestionCard.tsx` (wrapper)
- [ ] Create `RadioQuestion.tsx`
- [ ] Create `CheckboxQuestion.tsx`
- [ ] Create `TextQuestion.tsx`

### Quiz UI
- [ ] Create `QuizTimer.tsx` with color states
- [ ] Create `QuizProgress.tsx`
- [ ] Create `QuizNavigation.tsx`
- [ ] Create `QuizContainer.tsx` (main)

---

## Phase 5: Pages (3 hours)

### Landing Page
- [ ] Design `app/page.tsx`
- [ ] Add logo and tagline
- [ ] Add start button
- [ ] Link to `/quiz`

### Quiz Page
- [ ] Design `app/quiz/page.tsx`
- [ ] Integrate `QuizContainer`
- [ ] Handle loading states
- [ ] Handle errors

### Results Page
- [ ] Design `app/results/page.tsx`
- [ ] Display score
- [ ] Show breakdown
- [ ] Add retry button

---

## Phase 6: Polish (4 hours)

### Styling
- [ ] Apply warm cream palette everywhere
- [ ] Ensure Montserrat font usage
- [ ] Add transitions and animations
- [ ] Polish hover states

### Responsive Design
- [ ] Test mobile layout
- [ ] Test tablet layout
- [ ] Adjust spacing for all screens

### Accessibility
- [ ] Add ARIA labels
- [ ] Test keyboard navigation
- [ ] Verify color contrast
- [ ] Test with screen reader

### Edge Cases
- [ ] Test timer expiry
- [ ] Test network errors
- [ ] Test empty answers
- [ ] Test rapid clicking

---

## Phase 7: Deploy (2 hours)

### Frontend Deployment
- [ ] Push to GitHub
- [ ] Connect to Vercel
- [ ] Set environment variables
- [ ] Deploy

### Testing
- [ ] Test full flow on production
- [ ] Test on multiple devices
- [ ] Fix any issues

---

## Phase 8: Documentation (2 hours)

### README
- [ ] Write project description
- [ ] Add live demo links
- [ ] Document architecture
- [ ] List features
- [ ] Explain trade-offs
- [ ] Record honest time spent

### Code Comments
- [ ] Add JSDoc to complex functions
- [ ] Comment non-obvious logic

---

## Phase 9: Video (1 hour)

### Loom Recording
- [ ] Practice run
- [ ] Record demo (2 min)
- [ ] Record code walkthrough (2 min)
- [ ] Record architecture explanation (30s)
- [ ] Record wrap-up (10s)
- [ ] Upload and get link

---

## Final Submission

- [ ] GitHub repo is clean
- [ ] README is complete
- [ ] Both apps deployed and working
- [ ] Loom video ready
- [ ] Send email to Erik

---

## Time Tracking

Expected: ~16 hours
- Setup: 2h
- Backend: 3h
- Frontend Core: 5h
- Components: 4h
- Pages: 3h
- Polish: 4h
- Deploy: 2h
- Docs: 2h
- Video: 1h

Track actual time and be honest in README!

---

End of Implementation Checklist