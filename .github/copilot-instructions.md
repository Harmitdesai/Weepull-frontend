# Copilot Instructions for Weepull Frontend

This document provides guidelines for enhancing UI in the Weepull frontend project.

## Project Overview

Weepull is a Next.js 15 application with App Router that enables users to manage data posts. It uses a modern stack focused on clean UI/UX and responsive design.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **Component Library**: shadcn/ui (new-york style) with Radix UI primitives
- **Icons**: Lucide React
- **3D Graphics**: react-three-fiber with Three.js
- **Forms**: react-hook-form with Zod validation
- **Authentication**: next-auth
- **Payments**: Stripe

## UI/UX Guidelines

### Design System

The project uses shadcn/ui components with the "new-york" style variant. When creating or modifying UI:

1. **Use existing components**: Import from `@/components/ui/*` for buttons, dialogs, inputs, etc.
2. **Follow shadcn patterns**: Use the `cn()` utility from `@/lib/utils` for conditional class merging
3. **Consistent theming**: Use CSS variables defined in `globals.css` (e.g., `--background`, `--foreground`, `--primary`)

### Color Palette

- **Surface colors**: `surface-upper`, `surface-up`, `surface`, `surface-down`, `surface-downer`
- **Confirm buttons**: `confirmButton` with variations (`up`, `upper`, `down`, `downer`)
- **Theme colors**: Use Tailwind's `hsl(var(--color-name))` pattern for theme-aware colors

### Component Patterns

```tsx
// Example component structure
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ComponentProps {
  className?: string;
  children: React.ReactNode;
}

export function Component({ className, children }: ComponentProps) {
  return (
    <div className={cn("base-classes", className)}>
      {children}
    </div>
  );
}
```

### Styling Guidelines

1. **Use Tailwind utilities first**: Prefer Tailwind classes over custom CSS
2. **Responsive design**: Use `sm:`, `md:`, `lg:`, `xl:` breakpoints consistently
3. **Dark mode**: The app supports dark mode via the `dark` class on the root element
4. **Custom gradients**: Use `bg-fancy` class for gradient backgrounds or the `btn-redeem` class for animated gradient buttons
5. **Animations**: Use `tailwindcss-animate` utilities for consistent animations

### Layout Conventions

- Navigation height: `var(--nav-height)` = 4rem
- Border radius: Use the custom `lg`, `md`, `sm` radius values from Tailwind config
- Max heights: Custom values `max-h-100` (25rem) and `max-h-120` (30rem) are available

## Component Organization

```
src/
├── app/                    # Next.js App Router pages
│   ├── _components/        # Page-specific components
│   ├── _hooks/             # Page-specific hooks
│   └── api/                # API routes
├── components/
│   ├── elements/           # Custom compound components (Nav, etc.)
│   └── ui/                 # shadcn/ui components
├── lib/                    # Utility functions
├── types/                  # TypeScript type definitions
└── utility/                # Helper functions
```

## Best Practices for UI Enhancement

### When Adding New Components

1. Check if shadcn/ui has the component: `npx shadcn@latest add <component-name>`
2. Place reusable components in `src/components/ui/` or `src/components/elements/`
3. Place page-specific components in `src/app/{page}/_components/`
4. Use TypeScript interfaces for props
5. Export components as named exports

### When Styling

1. Use semantic color tokens (`primary`, `secondary`, `accent`, `destructive`)
2. Apply hover states with Tailwind: `hover:bg-blue-500`
3. Use focus states for accessibility: `focus:outline-none focus:ring-2`
4. Apply transitions: `transition-all duration-300`
5. Use `transform` and `will-change-transform` for performant animations

### Accessibility

1. Use semantic HTML elements
2. Include proper ARIA labels where needed
3. Ensure sufficient color contrast
4. Support keyboard navigation
5. Use Radix UI primitives for complex interactive components

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Start production server
npm start
```

## Path Aliases

Use these TypeScript path aliases for imports:

- `@/components` → `src/components`
- `@/lib` → `src/lib`
- `@/hooks` → `src/hooks` (if available)

## Form Handling

Use react-hook-form with Zod for form validation:

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  field: z.string().min(1, "Required"),
});

const form = useForm({
  resolver: zodResolver(schema),
});
```

## Notes for Copilot

- When suggesting UI improvements, prefer shadcn/ui components
- Use the existing color palette and design tokens
- Maintain consistency with the existing component patterns
- Consider mobile responsiveness in all UI changes
- Follow the established file organization structure
