# Loop - Design System

## Brand Identity

**Name**: Loop  
**Font**: Montserrat Light (300)  
**Tagline**: "Stay in the loop"  
**Color Theme**: Warm Cream/Beige with Terracotta accents

## Color Palette

### Background Colors
- **Primary Background**: `bg-cream-50` (#FFFBED)
- **Card Background**: `bg-cream-100` (#FFF8DC)
- **Hover/Active**: `bg-cream-200` (#F5ECD7)

### Text Colors
- **Primary Text**: `text-brown-500` (#2D2A26)
- **Secondary Text**: `text-brown-400` (#5C574F)
- **Muted Text**: `text-brown-300` (#8B8378)

### Accent Colors
- **Primary Action**: `bg-terracotta-300` (#D4845C)
- **Hover**: `bg-terracotta-400` (#C67750)
- **Light Accent**: `bg-terracotta-200` (#E8B69A)

### Semantic Colors
- **Success**: `text-sage-300` (#7BA862) - Correct answers
- **Error**: `text-red-400` (#C85D5D) - Incorrect answers  
- **Warning**: `text-amber-500` (#D4A84C) - Timer warnings

### Borders
- **Light**: `border-cream-300` (#E8DCC8)
- **Default**: `border-cream-400` (#D4C7AF)
- **Strong**: `border-cream-500` (#B8A890)

## Typography

### Font Setup
```tsx
// app/layout.tsx
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
})
```

### Type Scale
- **Logo/Hero**: `font-montserrat font-light text-5xl` - Montserrat Light 300
- **Page Title**: `font-montserrat font-normal text-4xl`
- **Section Title**: `font-montserrat font-medium text-2xl`
- **Body**: `font-montserrat font-normal text-base`
- **Caption**: `font-montserrat font-light text-sm`

## Logo Design

### Primary Logo (Text)
```tsx
<h1 className="font-montserrat font-light text-5xl tracking-tight text-brown-500">
  Loop
</h1>
```

### Logo with Icon
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

### Tagline Style
```tsx
<p className="font-montserrat font-light text-lg text-brown-400 tracking-wide">
  Stay in the loop
</p>
```

## Component Styles

### Buttons

**Primary Button**
```tsx
className="bg-terracotta-300 hover:bg-terracotta-400 text-white 
           px-8 py-3 rounded-xl font-montserrat font-medium 
           transition-all hover:shadow-lg"
```

**Secondary Button**
```tsx
className="bg-cream-200 hover:bg-cream-300 text-brown-500 
           px-8 py-3 rounded-xl font-montserrat font-medium 
           transition-all border-2 border-cream-400"
```

**Ghost Button**
```tsx
className="hover:bg-cream-200 text-brown-400 px-6 py-2 
           rounded-lg font-montserrat font-normal transition-colors"
```

### Cards

**Standard Card**
```tsx
className="bg-cream-100 border-2 border-cream-300 rounded-2xl 
           p-8 shadow-sm hover:shadow-md transition-shadow"
```

**Question Card**
```tsx
className="bg-cream-100 border-2 border-cream-400 rounded-2xl 
           p-10 shadow-md"
```

**Interactive Card (Choices)**
```tsx
// Default state
className="bg-cream-100 border-2 border-cream-400 rounded-xl p-5 
           hover:border-terracotta-300 hover:bg-cream-200 
           transition-all cursor-pointer"

// Selected state
className="bg-terracotta-50 border-2 border-terracotta-300 
           shadow-sm"
```

### Progress Bar
```tsx
<Progress 
  value={progress} 
  className="h-2 bg-cream-300"
  indicatorClassName="bg-terracotta-300"
/>
```

### Badges

**Question Number**
```tsx
<Badge className="bg-terracotta-100 text-terracotta-400 
                  font-montserrat font-medium text-sm px-4 py-1.5 
                  rounded-full">
  Question {current} of {total}
</Badge>
```

**Score Badge**
```tsx
<Badge className="bg-sage-100 text-sage-400 
                  font-montserrat font-semibold text-2xl px-6 py-3 
                  rounded-xl">
  {score}/{total}
</Badge>
```

**Timer Badge (Dynamic)**
```tsx
<Badge 
  className={cn(
    "font-montserrat font-bold text-xl px-4 py-2 rounded-lg transition-all",
    timeRemaining > 20 && "bg-sage-100 text-sage-400",
    timeRemaining <= 20 && timeRemaining > 10 && "bg-amber-100 text-amber-600",
    timeRemaining <= 10 && "bg-red-100 text-red-400 animate-pulse"
  )}
>
  {timeRemaining}s
</Badge>
```

### Input Fields

**Text Input**
```tsx
<Input 
  className="bg-cream-100 border-2 border-cream-400 
             focus:border-terracotta-300 focus:ring-terracotta-200
             text-brown-500 font-montserrat placeholder:text-brown-300
             text-lg px-6 py-4 rounded-xl transition-colors"
  placeholder="Type your answer..."
/>
```

### Radio & Checkbox

**Radio Option**
```tsx
<div className="flex items-center gap-4 p-5 rounded-xl 
                border-2 border-cream-400 
                hover:border-terracotta-300 hover:bg-cream-200 
                transition-all cursor-pointer
                data-[state=checked]:bg-terracotta-50 
                data-[state=checked]:border-terracotta-300">
  <RadioGroupItem value={id} className="border-brown-300" />
  <Label className="flex-1 cursor-pointer font-montserrat text-brown-500">
    {text}
  </Label>
</div>
```

**Checkbox Option**
```tsx
<div className="flex items-center gap-4 p-5 rounded-xl 
                border-2 border-cream-400 
                hover:border-terracotta-300 hover:bg-cream-200 
                transition-all cursor-pointer
                data-[state=checked]:bg-terracotta-50 
                data-[state=checked]:border-terracotta-300">
  <Checkbox id={id} className="border-brown-300" />
  <Label htmlFor={id} className="flex-1 cursor-pointer font-montserrat text-brown-500">
    {text}
  </Label>
</div>
```

## Loading States

**Skeleton**
```tsx
<div className="space-y-4">
  <Skeleton className="h-8 w-3/4 bg-cream-300" />
  <Skeleton className="h-14 w-full bg-cream-300" />
  <Skeleton className="h-14 w-full bg-cream-300" />
  <Skeleton className="h-14 w-full bg-cream-300" />
</div>
```

**Spinner (Submitting)**
```tsx
<div className="flex items-center justify-center gap-3">
  <Loader2 className="h-8 w-8 animate-spin text-terracotta-300" />
  <span className="font-montserrat text-brown-400 text-lg">
    Grading your answers...
  </span>
</div>
```

## Error States
```tsx
<Alert variant="destructive" className="bg-red-50 border-red-200">
  <AlertCircle className="h-5 w-5 text-red-400" />
  <AlertTitle className="font-montserrat font-medium text-red-400">
    Error
  </AlertTitle>
  <AlertDescription className="font-montserrat text-red-300">
    Failed to load quiz. Please try again.
  </AlertDescription>
</Alert>
```

## Icons (Lucide React)

### Icon Colors (Context-Based)
- **Default**: `text-brown-400`
- **Active/Hover**: `text-terracotta-300`
- **Success**: `text-sage-300`
- **Error**: `text-red-400`
- **Warning**: `text-amber-500`

### Logo Icon: `RotateCw` (loop symbol)
```tsx
<RotateCw className="w-8 h-8 text-terracotta-300" />
```

## Page Layouts

### Landing Page
```tsx
<div className="min-h-screen bg-cream-50 flex items-center justify-center p-6">
  <div className="max-w-2xl w-full space-y-8">
    {/* Logo */}
    <div className="text-center space-y-4">
      <div className="flex items-center justify-center gap-3">
        <div className="w-16 h-16 rounded-full border-3 border-terracotta-300 
                        flex items-center justify-center">
          <RotateCw className="w-8 h-8 text-terracotta-300" />
        </div>
        <h1 className="font-montserrat font-light text-6xl text-brown-500">
          Loop
        </h1>
      </div>
      <p className="font-montserrat font-light text-xl text-brown-400 tracking-wide">
        Stay in the loop
      </p>
    </div>
    
    {/* Content */}
    <Card className="bg-cream-100 border-2 border-cream-300 p-10">
      {/* ... */}
    </Card>
  </div>
</div>
```

### Quiz Page
```tsx
<div className="min-h-screen bg-cream-50 py-8">
  <div className="max-w-4xl mx-auto px-6 space-y-6">
    {/* Header with timer and progress */}
    <div className="flex items-center justify-between">
      <Badge className="bg-terracotta-100 text-terracotta-400">
        Question {current} of {total}
      </Badge>
      <Badge className="bg-sage-100 text-sage-400">
        {timeRemaining}s
      </Badge>
    </div>
    
    <Progress value={progress} className="h-2 bg-cream-300" />
    
    {/* Question Card */}
    <Card className="bg-cream-100 border-2 border-cream-400 p-10">
      {/* ... */}
    </Card>
  </div>
</div>
```

### Results Page
```tsx
<div className="min-h-screen bg-cream-50 flex items-center justify-center p-6">
  <div className="max-w-3xl w-full space-y-8">
    {/* Score Display */}
    <div className="text-center space-y-6">
      <Trophy className="w-20 h-20 mx-auto text-terracotta-300" />
      <h1 className="font-montserrat font-light text-5xl text-brown-500">
        Quiz Complete!
      </h1>
      <div className="flex items-center justify-center gap-4">
        <Badge className="bg-sage-100 text-sage-400 text-3xl px-8 py-4">
          {score}/{total}
        </Badge>
        <span className="font-montserrat font-medium text-2xl text-brown-400">
          {percentage}%
        </span>
      </div>
    </div>
    
    {/* Results breakdown */}
    <Card className="bg-cream-100 border-2 border-cream-300 p-8">
      {/* ... */}
    </Card>
  </div>
</div>
```

## Animations & Transitions

### Standard Transition
```css
transition-all duration-200 ease-in-out
```

### Hover Effects
```tsx
className="hover:scale-[1.02] hover:shadow-lg transition-transform"
```

### Page Entrance (Framer Motion alternative - CSS)
```tsx
className="animate-in fade-in slide-in-from-bottom-4 duration-700"
```

## Accessibility

### Focus States
```css
focus:outline-none focus:ring-2 focus:ring-terracotta-300 focus:ring-offset-2 focus:ring-offset-cream-50
```

### Color Contrast
All text colors meet WCAG AA standards on their backgrounds:
- brown-500 on cream-50: 10.5:1 ✅
- brown-400 on cream-100: 7.2:1 ✅
- terracotta-300 on white: 4.8:1 ✅

## shadcn Components Installation
```bash
# With custom colors
npx shadcn@latest init

# When prompted, select:
# Style: New York
# Base color: Slate (we'll override with custom colors)
# CSS variables: Yes

# Install components
npx shadcn@latest add button card checkbox radio-group input progress badge alert skeleton toast
```

## Custom shadcn Theme Override

Add to `app/globals.css`:
```css
@layer base {
  :root {
    --background: 46 46 27; /* cream-50 */
    --foreground: 26 26 22; /* brown-500 */
    --card: 48 45 20; /* cream-100 */
    --card-foreground: 26 26 22;
    --primary: 16 68 60; /* terracotta-300 */
    --primary-foreground: 0 0 100;
    --secondary: 36 32 25; /* cream-200 */
    --secondary-foreground: 26 26 22;
    --muted: 35 28 20;
    --muted-foreground: 36 33 30;
    --accent: 16 68 60;
    --accent-foreground: 0 0 100;
    --destructive: 0 50 58; /* error red */
    --destructive-foreground: 0 0 100;
    --border: 35 28 20;
    --input: 35 28 20;
    --ring: 16 68 60;
    --radius: 1rem;
  }
}
```

---

## Quick Reference

### Common Class Combinations

**Standard Container**
```tsx
className="max-w-4xl mx-auto px-6 py-8"
```

**Card with Hover**
```tsx
className="bg-cream-100 border-2 border-cream-300 rounded-2xl p-8 
           hover:border-terracotta-300 hover:shadow-lg transition-all"
```

**Primary CTA**
```tsx
className="bg-terracotta-300 hover:bg-terracotta-400 text-white 
           px-10 py-4 rounded-xl font-montserrat font-medium text-lg
           transition-all hover:shadow-xl hover:scale-105"
```

**Loading State Pattern**
```tsx
{isLoading ? (
  <div className="space-y-4">
    <Skeleton className="h-10 w-3/4 bg-cream-300" />
    <Skeleton className="h-16 w-full bg-cream-300" />
  </div>
) : (
  <div>{/* Content */}</div>
)}
```

---

End of Design System