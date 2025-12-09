---
agent: agent
applyTo: "frontend/src/components/**/*.tsx,frontend/src/components/**/*.ts"
---

All components in Loop must follow these guidelines:

Design System:
- Colors: Use cream-50 (#FFFBED) backgrounds, cream-100 (#FFF8DC) for cards, brown-500 (#2D2A26) for text, terracotta-300 (#D4845C) for accents
- Typography: Montserrat font family only (weights: 300, 400, 500, 600)
- Spacing: Use consistent Tailwind spacing (p-6, p-8, gap-4, gap-6)
- Borders: Use border-2 with cream-400 or terracotta-300
- Shadows: Use shadow-sm for cards, shadow-md for hover states

Component Structure:
- Use functional components with TypeScript
- Export with named exports only
- Define Props interface above component
- Use explicit TypeScript types, no 'any'
- Import cn helper from @/lib/utils for conditional classes

Required Patterns:
- Add loading states for async operations
- Add error boundaries for error handling
- Include ARIA labels for accessibility
- Support keyboard navigation (Tab, Enter, Space)
- Use proper focus states: focus:ring-2 focus:ring-terracotta-300

Styling Pattern:
```tsx
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export function ComponentName({ className }: Props) {
  return (
    <div className={cn(
      "bg-cream-100 border-2 border-cream-400 rounded-xl p-6",
      "hover:border-terracotta-300 transition-all",
      className
    )}>
      {/* content */}
    </div>
  );
}
```

Never modify shadcn/ui components in components/ui/ directly. Extend them through className prop or wrapper components.

Reference Loop Requirements/DESIGN_SYSTEM.md for complete styling guidelines.