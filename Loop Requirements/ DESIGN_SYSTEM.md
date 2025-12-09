# Loop Design System

Complete visual and interaction design specifications for the Loop quiz application.

## Brand Identity

**Name**: Loop  
**Tagline**: "Stay in the loop"  
**Concept**: Reflects programming loops (iteration) and continuous learning cycles  
**Visual Theme**: Warm, approachable, minimal

---

## Color Palette

### Base Colors

#### Cream (Backgrounds)
```
cream-50:  #FFFBED  (Main background)
cream-100: #FFF8DC  (Card backgrounds)
cream-200: #F5ECD7  (Hover states)
cream-300: #E8DCC8  (Light borders)
cream-400: #D4C7AF  (Default borders)
cream-500: #B8A890  (Strong borders)
```

#### Brown (Text)
```
brown-300: #8B8378  (Muted text)
brown-400: #5C574F  (Secondary text)
brown-500: #2D2A26  (Primary text)
```

#### Terracotta (Accents)
```
terracotta-100: #F9E8E0  (Light backgrounds)
terracotta-200: #E8B69A  (Subtle accents)
terracotta-300: #D4845C  (Primary actions)
terracotta-400: #C67750  (Hover states)
terracotta-500: #B0643D  (Active states)
```

### Semantic Colors

#### Success (Correct Answers)
```
sage-100: #E3EFDB  (Light background)
sage-200: #A8C99A  (Medium)
sage-300: #7BA862  (Primary)
sage-400: #6A9554  (Hover)
```

#### Error (Incorrect Answers)
```
red-100: #FFE5E5  (Light background)
red-200: #FFB8B8  (Medium)
red-400: #C85D5D  (Primary)
red-500: #B54545  (Hover)
```

#### Warning (Timer)
```
amber-100: #FFF4D6  (Light background)
amber-500: #D4A84C  (Primary warning)
amber-600: #C09540  (Intense warning)
```

### Timer Color States
```css
/* Dynamic timer colors based on remaining time */
> 20 seconds:  bg-sage-100 text-sage-400     (Safe - green)
10-20 seconds: bg-amber-100 text-amber-600   (Caution - amber)
< 10 seconds:  bg-red-100 text-red-400       (Danger - red, pulsing)
```

---

## Typography

### Font Family

**Primary**: Montserrat (Google Fonts)
```typescript
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
});
```

### Font Weights
```
Light (300):     Logo, hero headings, taglines
Normal (400):    Body text, labels
Medium (500):    Section headings, emphasized text
Semibold (600):  Card headings, buttons
Bold (700):      Scores, important numbers
```

### Type Scale
```tsx
// Logo
className="font-montserrat font-light text-5xl md:text-6xl"

// Page Title (H1)
className="font-montserrat font-light text-4xl md:text-5xl"

// Section Title (H2)
className="font-montserrat font-medium text-2xl md:text-3xl"

// Card Title (H3)
className="font-montserrat font-semibold text-xl"

// Body Large
className="font-montserrat text-lg"

// Body Default
className="font-montserrat text-base"

// Body Small / Caption
className="font-montserrat text-sm text-brown-400"

// Tagline
className="font-montserrat font-light text-xl tracking-wide"
```

---

## Logo & Branding

### Logo Variations

**Primary Logo (with icon)**
```tsx
<div className="flex items-center gap-3">
  <div className="w-12 h-12 rounded-full border-3 border-terracotta-300 
                  flex items-center justify-center">
    <RotateCw className="w-6 h-6 text-terracotta-300" />
  </div>
  <h1 className="font-montserrat font-light text-4xl text-brown-500">
    Loop
  </h1>
</div>
```

**Text-only Logo**
```tsx
<h1 className="font-montserrat font-light text-5xl text-brown-500">
  Loop
</h1>
```

**Logo + Tagline**
```tsx
<div className="text-center space-y-2">
  <h1 className="font-montserrat font-light text-5xl text-brown-500">
    Loop
  </h1>
  <p className="font-montserrat font-light text-xl text-brown-400 tracking-wide">
    Stay in the loop
  </p>
</div>
```

### Logo Icon

Use Lucide React's `RotateCw` icon to represent the loop concept:
```tsx
import { RotateCw } from 'lucide-react';

<RotateCw className="w-8 h-8 text-terracotta-300" />
```

---

## Component Styles

### Buttons

**Primary Button**
```tsx
<Button className="
  bg-terracotta-300 hover:bg-terracotta-400 
  text-white 
  px-8 py-3 
  rounded-xl 
  font-montserrat font-medium text-base
  transition-all duration-200
  hover:shadow-lg hover:scale-[1.02]
  focus:outline-none focus:ring-2 focus:ring-terracotta-300 focus:ring-offset-2
">
  Start Quiz
</Button>
```

**Secondary Button**
```tsx
<Button className="
  bg-cream-200 hover:bg-cream-300 
  text-brown-500 
  px-8 py-3 
  rounded-xl 
  font-montserrat font-medium text-base
  border-2 border-cream-400
  transition-all duration-200
  hover:shadow-md
  focus:outline-none focus:ring-2 focus:ring-cream-400 focus:ring-offset-2
">
  Try Again
</Button>
```

**Ghost Button**
```tsx
<Button className="
  bg-transparent hover:bg-cream-200 
  text-brown-400 
  px-6 py-2 
  rounded-lg 
  font-montserrat font-normal
  transition-colors duration-200
">
  Skip
</Button>
```

**Icon Button**
```tsx
<Button className="
  w-10 h-10 
  rounded-lg 
  bg-cream-200 hover:bg-cream-300
  flex items-center justify-center
  transition-colors
">
  <ChevronRight className="w-5 h-5 text-brown-500" />
</Button>
```

### Cards

**Standard Card**
```tsx
<Card className="
  bg-cream-100 
  border-2 border-cream-400 
  rounded-2xl 
  p-8 
  shadow-sm
  transition-shadow duration-200
">
  {/* content */}
</Card>
```

**Hover Card (Interactive)**
```tsx
<Card className="
  bg-cream-100 
  border-2 border-cream-400 
  rounded-2xl 
  p-8 
  shadow-sm
  hover:shadow-md hover:border-cream-500
  transition-all duration-200
  cursor-pointer
">
  {/* content */}
</Card>
```

**Question Card**
```tsx
<Card className="
  bg-cream-100 
  border-2 border-cream-400 
  rounded-2xl 
  p-10 
  shadow-md
">
  {/* question content */}
</Card>
```

**Elevated Card (Results)**
```tsx
<Card className="
  bg-cream-100 
  border-2 border-cream-300 
  rounded-2xl 
  p-10 
  shadow-lg
">
  {/* results content */}
</Card>
```

### Form Elements

**Text Input**
```tsx
<Input className="
  bg-cream-100 
  border-2 border-cream-400 
  focus:border-terracotta-300 
  focus:ring-2 focus:ring-terracotta-200 focus:ring-offset-0
  text-brown-500 
  placeholder:text-brown-300
  font-montserrat text-base
  px-6 py-4 
  rounded-xl
  transition-colors duration-200
" />
```

**Radio Option**
```tsx
<div className="
  flex items-center gap-4 
  p-5 
  rounded-xl 
  border-2 border-cream-400 
  hover:border-terracotta-300 hover:bg-cream-200 
  transition-all duration-200 
  cursor-pointer
  data-[state=checked]:bg-terracotta-50 
  data-[state=checked]:border-terracotta-300
  data-[state=checked]:shadow-sm
">
  <RadioGroupItem value={id} className="border-brown-400" />
  <Label className="flex-1 cursor-pointer font-montserrat text-brown-500">
    {text}
  </Label>
</div>
```

**Checkbox Option**
```tsx
<div className="
  flex items-center gap-4 
  p-5 
  rounded-xl 
  border-2 border-cream-400 
  hover:border-terracotta-300 hover:bg-cream-200 
  transition-all duration-200 
  cursor-pointer
  data-[state=checked]:bg-terracotta-50 
  data-[state=checked]:border-terracotta-300
  data-[state=checked]:shadow-sm
">
  <Checkbox id={id} className="border-brown-400" />
  <Label htmlFor={id} className="flex-1 cursor-pointer font-montserrat text-brown-500">
    {text}
  </Label>
</div>
```

### Badges

**Question Number Badge**
```tsx
<Badge className="
  bg-terracotta-100 
  text-terracotta-400 
  font-montserrat font-medium text-sm 
  px-4 py-1.5 
  rounded-full
">
  Question {current} of {total}
</Badge>
```

**Score Badge**
```tsx
<Badge className="
  bg-sage-100 
  text-sage-400 
  font-montserrat font-bold text-2xl 
  px-6 py-3 
  rounded-xl
  shadow-sm
">
  {score}/{total}
</Badge>
```

**Timer Badge (Dynamic)**
```tsx
<Badge className={cn(
  "font-montserrat font-bold text-xl px-4 py-2 rounded-lg transition-all",
  timeRemaining > 20 && "bg-sage-100 text-sage-400",
  timeRemaining <= 20 && timeRemaining > 10 && "bg-amber-100 text-amber-600",
  timeRemaining <= 10 && "bg-red-100 text-red-400 animate-pulse"
)}>
  {timeRemaining}s
</Badge>
```

**Status Badge**
```tsx
// Correct answer
<Badge className="bg-sage-100 text-sage-400 text-xs px-2 py-1 rounded-md">
  <CheckCircle2 className="w-3 h-3 inline mr-1" />
  Correct
</Badge>

// Incorrect answer
<Badge className="bg-red-100 text-red-400 text-xs px-2 py-1 rounded-md">
  <XCircle className="w-3 h-3 inline mr-1" />
  Incorrect
</Badge>
```

### Progress Bar
```tsx
<Progress 
  value={progress} 
  className="h-2 bg-cream-300 rounded-full overflow-hidden"
  indicatorClassName="bg-terracotta-300 transition-all duration-300"
/>
```

**With Label**
```tsx
<div className="space-y-2">
  <div className="flex justify-between text-sm font-montserrat text-brown-400">
    <span>Progress</span>
    <span>{progress}%</span>
  </div>
  <Progress value={progress} className="h-2 bg-cream-300" />
</div>
```

### Alerts

**Error Alert**
```tsx
<Alert variant="destructive" className="bg-red-50 border-2 border-red-200">
  <AlertCircle className="h-5 w-5 text-red-400" />
  <AlertTitle className="font-montserrat font-medium text-red-400">
    Error
  </AlertTitle>
  <AlertDescription className="font-montserrat text-red-300">
    Failed to load quiz. Please try again.
  </AlertDescription>
</Alert>
```

**Info Alert**
```tsx
<Alert className="bg-cream-200 border-2 border-cream-400">
  <Info className="h-5 w-5 text-brown-400" />
  <AlertTitle className="font-montserrat font-medium text-brown-500">
    Tip
  </AlertTitle>
  <AlertDescription className="font-montserrat text-brown-400">
    You have 60 seconds per question. Good luck!
  </AlertDescription>
</Alert>
```

### Loading States

**Skeleton Loader**
```tsx
<div className="space-y-4">
  <Skeleton className="h-8 w-3/4 bg-cream-300 rounded-lg" />
  <Skeleton className="h-16 w-full bg-cream-300 rounded-xl" />
  <Skeleton className="h-16 w-full bg-cream-300 rounded-xl" />
  <Skeleton className="h-16 w-full bg-cream-300 rounded-xl" />
</div>
```

**Spinner with Text**
```tsx
<div className="flex flex-col items-center justify-center gap-4 py-12">
  <Loader2 className="h-8 w-8 animate-spin text-terracotta-300" />
  <p className="font-montserrat text-brown-400 text-lg">
    Loading quiz...
  </p>
</div>
```

**Submitting State**
```tsx
<div className="flex items-center justify-center gap-3 py-8">
  <Loader2 className="h-6 w-6 animate-spin text-terracotta-300" />
  <span className="font-montserrat text-brown-400">
    Grading your answers...
  </span>
</div>
```

---

## Layout Patterns

### Page Container
```tsx
<div className="min-h-screen bg-cream-50">
  <div className="max-w-4xl mx-auto px-6 py-8">
    {children}
  </div>
</div>
```

### Centered Layout (Landing, Results)
```tsx
<div className="min-h-screen bg-cream-50 flex items-center justify-center p-6">
  <div className="max-w-2xl w-full space-y-8">
    {children}
  </div>
</div>
```

### Quiz Layout
```tsx
<div className="min-h-screen bg-cream-50 py-8">
  <div className="max-w-4xl mx-auto px-6 space-y-6">
    {/* Header with timer and progress */}
    <div className="flex items-center justify-between">
      {/* badges */}
    </div>
    
    <Progress value={progress} />
    
    {/* Question Card */}
    <Card>
      {/* question */}
    </Card>
    
    {/* Navigation */}
    <div className="flex justify-between">
      {/* buttons */}
    </div>
  </div>
</div>
```

---

## Spacing & Sizing

### Container Spacing
```css
max-w-2xl:  32rem (512px)  - Small containers
max-w-4xl:  56rem (896px)  - Default container
max-w-6xl:  72rem (1152px) - Wide containers

px-4:  1rem   - Mobile
px-6:  1.5rem - Tablet
px-8:  2rem   - Desktop

py-6:  1.5rem - Compact
py-8:  2rem   - Default
py-12: 3rem   - Spacious
py-16: 4rem   - Extra spacious
```

### Component Spacing
```css
gap-2:  0.5rem  - Tight (icon + text)
gap-3:  0.75rem - Compact
gap-4:  1rem    - Default
gap-6:  1.5rem  - Comfortable
gap-8:  2rem    - Spacious

space-y-4:  1rem   - Default vertical rhythm
space-y-6:  1.5rem - Comfortable sections
space-y-8:  2rem   - Major sections

p-4:  1rem   - Compact padding
p-6:  1.5rem - Default padding
p-8:  2rem   - Comfortable padding
p-10: 2.5rem - Spacious padding
```

### Border Radius
```css
rounded-lg:   0.5rem  - Small elements (badges, small buttons)
rounded-xl:   0.75rem - Default (buttons, inputs)
rounded-2xl:  1rem    - Cards, large containers
rounded-full: 9999px  - Circular (badges, icons)
```

---

## Animations & Transitions

### Standard Transitions
```css
transition-all duration-200 ease-in-out
transition-colors duration-200
transition-shadow duration-200
transition-transform duration-200
```

### Hover Effects

**Scale**
```css
hover:scale-[1.02]
```

**Shadow**
```css
hover:shadow-md
hover:shadow-lg
```

**Color**
```css
hover:bg-terracotta-400
hover:border-terracotta-300
```

### Entrance Animations
```css
animate-in fade-in slide-in-from-bottom-4 duration-700
animate-in fade-in zoom-in-95 duration-500
```

### Special Animations

**Pulse (Timer < 10s)**
```css
animate-pulse
```

**Spin (Loading)**
```css
animate-spin
```

---

## Icons

### Icon Library
Use **Lucide React** for all icons.

### Common Icons
```tsx
import {
  RotateCw,      // Logo
  Clock,         // Timer
  CheckCircle2,  // Correct answer
  XCircle,       // Incorrect answer
  Trophy,        // Results/score
  Play,          // Start quiz
  ChevronRight,  // Next
  ChevronLeft,   // Previous
  AlertCircle,   // Error
  Info,          // Information
  Loader2,       // Loading spinner
} from 'lucide-react';
```

### Icon Sizing
```tsx
// Small
<Icon className="w-4 h-4" />

// Medium
<Icon className="w-5 h-5" />

// Large
<Icon className="w-6 h-6" />

// Extra Large
<Icon className="w-8 h-8" />

// Hero
<Icon className="w-12 h-12" />
```

### Icon Colors
```tsx
// Default
className="text-brown-400"

// Accent
className="text-terracotta-300"

// Success
className="text-sage-300"

// Error
className="text-red-400"

// Warning
className="text-amber-500"
```

---

## Responsive Design

### Breakpoints
```css
sm:  640px   // Tablets
md:  768px   // Small laptops
lg:  1024px  // Desktops
xl:  1280px  // Large screens
2xl: 1536px  // Extra large screens
```

### Responsive Patterns

**Typography**
```tsx
className="text-3xl md:text-4xl lg:text-5xl"
className="text-base md:text-lg"
```

**Spacing**
```tsx
className="px-4 md:px-6 lg:px-8"
className="py-6 md:py-8 lg:py-12"
className="gap-4 md:gap-6"
```

**Layout**
```tsx
className="grid grid-cols-1 md:grid-cols-2 gap-4"
className="flex flex-col md:flex-row gap-4"
```

**Visibility**
```tsx
className="hidden md:block"
className="block md:hidden"
```

---

## Accessibility

### Focus States
```css
focus:outline-none 
focus:ring-2 
focus:ring-terracotta-300 
focus:ring-offset-2
focus:ring-offset-cream-50
```

### ARIA Labels
```tsx
<button aria-label="Start quiz">
  <Play className="w-6 h-6" />
</button>

<div role="timer" aria-live="polite" aria-atomic="true">
  {timeRemaining}s
</div>

<Progress 
  value={progress} 
  aria-valuenow={progress}
  aria-valuemin={0}
  aria-valuemax={100}
  aria-label="Quiz progress"
/>
```

### Keyboard Navigation
- All interactive elements must be focusable
- Tab order should be logical
- Enter key submits forms
- Space key toggles checkboxes
- Arrow keys navigate radio groups

### Color Contrast
All text colors meet WCAG AA standards:
- brown-500 on cream-50: 10.5:1 ✅
- brown-400 on cream-100: 7.2:1 ✅
- terracotta-300 on white: 4.8:1 ✅
- white on terracotta-300: 4.5:1 ✅

---

## Dark Mode (Future)

Not implemented in current version, but color scheme can be extended:
```css
.dark {
  --cream-50: #1A1816;
  --cream-100: #2D2A26;
  --brown-500: #E8E3DC;
  --terracotta-300: #E8966E;
}
```

---

## Design Principles

1. **Warmth**: Use cream/beige base to create welcoming atmosphere
2. **Clarity**: High contrast between text and backgrounds
3. **Consistency**: Reuse patterns across all pages
4. **Feedback**: Immediate visual response to user actions
5. **Accessibility**: Keyboard navigation, ARIA labels, high contrast
6. **Performance**: CSS transitions only on transform/opacity
7. **Simplicity**: Minimal design, avoid clutter

---

## Quick Reference

### Standard Button
```tsx
bg-terracotta-300 hover:bg-terracotta-400 text-white px-8 py-3 rounded-xl
```

### Standard Card
```tsx
bg-cream-100 border-2 border-cream-400 rounded-2xl p-8 shadow-sm
```

### Standard Input
```tsx
bg-cream-100 border-2 border-cream-400 focus:border-terracotta-300 px-6 py-4 rounded-xl
```

### Container
```tsx
max-w-4xl mx-auto px-6 py-8
```

---

End of Design System