---
agent: agent
applyTo: "frontend/src/**/*.tsx,frontend/tailwind.config.ts,frontend/src/app/globals.css"
---

Loop uses a warm cream/beige color palette with terracotta accents. All styling must follow this system.

Color Palette (Tailwind classes):
- Backgrounds: bg-cream-50 (#FFFBED), bg-cream-100 (#FFF8DC), bg-cream-200 (#F5ECD7)
- Text: text-brown-500 (#2D2A26), text-brown-400 (#5C574F), text-brown-300 (#8B8378)
- Accents: bg-terracotta-300 (#D4845C), hover:bg-terracotta-400 (#C67750)
- Borders: border-cream-300 (#E8DCC8), border-cream-400 (#D4C7AF)
- Success: text-sage-300 (#7BA862)
- Error: text-red-400 (#C85D5D)
- Warning: text-amber-500 (#D4A84C)

Typography:
- Font: font-montserrat (Montserrat from Google Fonts)
- Logo: font-light text-5xl (Montserrat 300)
- Headings: font-medium or font-semibold
- Body: font-normal text-base

Common Patterns:

Button Primary:
```tsx
className="bg-terracotta-300 hover:bg-terracotta-400 text-white px-8 py-3 rounded-xl font-medium transition-all hover:shadow-lg"
```

Button Secondary:
```tsx
className="bg-cream-200 hover:bg-cream-300 text-brown-500 px-8 py-3 rounded-xl font-medium border-2 border-cream-400 transition-all"
```

Card:
```tsx
className="bg-cream-100 border-2 border-cream-400 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
```

Input:
```tsx
className="bg-cream-100 border-2 border-cream-400 focus:border-terracotta-300 focus:ring-2 focus:ring-terracotta-200 text-brown-500 px-6 py-4 rounded-xl"
```

Radio/Checkbox Option:
```tsx
className="flex items-center gap-4 p-5 rounded-xl border-2 border-cream-400 hover:border-terracotta-300 hover:bg-cream-200 transition-all cursor-pointer data-[state=checked]:bg-terracotta-50 data-[state=checked]:border-terracotta-300"
```

Progress Bar:
```tsx
<Progress value={progress} className="h-2 bg-cream-300" indicatorClassName="bg-terracotta-300" />
```

Timer Badge (Dynamic):
```tsx
className={cn(
  "font-bold text-xl px-4 py-2 rounded-lg transition-all",
  timeRemaining > 20 && "bg-sage-100 text-sage-400",
  timeRemaining <= 20 && timeRemaining > 10 && "bg-amber-100 text-amber-600",
  timeRemaining <= 10 && "bg-red-100 text-red-400 animate-pulse"
)}
```

Spacing:
- Container max-width: max-w-4xl mx-auto
- Section padding: px-6 py-8
- Card padding: p-6 or p-8 for larger cards
- Gap between elements: gap-4 or gap-6
- Vertical spacing: space-y-4 or space-y-6

Responsive:
- Use Tailwind breakpoints: sm:, md:, lg:, xl:
- Mobile-first approach
- Common pattern: text-3xl md:text-4xl lg:text-5xl

Animations:
- Transitions: transition-all duration-200 ease-in-out
- Hover effects: hover:scale-[1.02] hover:shadow-lg
- Page entrance: animate-in fade-in slide-in-from-bottom-4 duration-700
- Pulse (timer <10s only): animate-pulse

Focus States:
- Always include: focus:outline-none focus:ring-2 focus:ring-terracotta-300 focus:ring-offset-2

Never use:
- Colors outside the cream/terracotta/brown palette
- Fonts other than Montserrat
- Inline styles (prefer Tailwind classes)
- Hard-coded color values in className

Reference Loop Requirements/DESIGN_SYSTEM.md for complete design specifications.