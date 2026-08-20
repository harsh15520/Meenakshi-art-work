# Component Props Documentation

This document describes the prop interfaces for all React components in the Meenakshi Art Work website.

## Table of Contents

- [Layout Components](#layout-components)
- [UI Components](#ui-components)
- [Animation Components](#animation-components)
- [Page Components](#page-components)

---

## Layout Components

### Header

**File**: `components/Header.tsx`

**Props**: None (stateful component with internal state)

**Description**: Main site navigation header with desktop and mobile navigation, ambient sound toggle, and contact CTA.

**Features**:
- Desktop navigation menu
- Mobile hamburger menu
- Ambient sound toggle button
- WhatsApp inquiry CTA
- Analytics tracking on navigation clicks

---

### Footer

**File**: `components/Footer.tsx`

**Props**: None

**Description**: Site footer with navigation links, contact information, and social links.

---

### ErrorBoundary

**File**: `components/ErrorBoundary.tsx`

**Props**:
```typescript
interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}
```

**Description**: React error boundary that catches component errors and reports them to Sentry.

**Usage**:
```tsx
<ErrorBoundary fallback={<CustomError />}>
  <YourComponent />
</ErrorBoundary>
```

---

## UI Components

### InquiryLink

**File**: `components/InquiryLink.tsx`

**Props**:
```typescript
interface Props {
  children: React.ReactNode;
  message: string;
  className?: string;
}
```

**Description**: WhatsApp contact link generator with analytics tracking.

**Usage Example**:
```tsx
<InquiryLink message="Hello, I'm interested in academy classes">
  Join Academy
</InquiryLink>
```

**Props Details**:
- `children` - Link text or content to display
- `message` - Pre-filled WhatsApp message (URL-encoded automatically)
- `className` - Optional CSS classes for styling (defaults to "button-primary")

---

### WhatsAppButton

**File**: `components/WhatsAppButton.tsx`

**Props**: None

**Description**: Floating WhatsApp button for quick contact access.

---

### Reveal

**File**: `components/Reveal.tsx`

**Props**:
```typescript
interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}
```

**Description**: Animation wrapper that reveals content with a fade-in effect.

**Usage Example**:
```tsx
<Reveal delay={0.2}>
  <h2>Animated Heading</h2>
</Reveal>
```

**Props Details**:
- `children` - Content to animate
- `className` - Optional CSS classes
- `delay` - Animation delay in seconds (default: 0)

---

### GuestbookNote

**File**: `components/GuestbookNote.tsx`

**Props**:
```typescript
interface Props extends Testimonial {
  index: number;
  rotation: number;
  delay： number;
}
```

**Description**: Testimonial note component with rotation animation for the guestbook wall.

**Props Details**:
- Inherits all `Testimonial` props (name, quote, credibility, type, image)
- `index` - Position index for z-index layering
- `rotation` - Rotation angle in degrees
- `delay` - Animation delay in seconds

---

### GuestbookCtaSticky

**File**: `components/GuestbookCtaSticky.tsx`

**Props**: None

**Description**: Sticky call-to-action component for the guestbook section.

---

## Animation Components

### InteriorPage

**File**: `components/InteriorPage.tsx`

**Props**:
```typescript
interface Props {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}
```

**Description**: Page wrapper with animated background and consistent interior page layout.

**Usage Example**:
```tsx
<InteriorPage title="Art Academy" subtitle="Structured fine-art training">
  <AcademyContent />
</InteriorPage>
```

**Props Details**:
- `children` - Page content
- `title` - Page title
- `subtitle` - Optional page subtitle
- `backgroundImage` - Optional background image path

---

## Page Components

### Home

**File**: `app/page.tsx`

**Props**: None

**Description**: Homepage component with hero section, services, founder section, gallery, and guestbook.

**Features**:
- Scroll depth tracking
- Engagement time tracking
- Animated sections with Reveal components

---

## Component Patterns

### Client Components

Components marked with `"use client"` are client-side components that:
- Can use React hooks (useState, useEffect)
- Can handle user interactions
- Can access browser APIs
- Can use analytics tracking

### Server Components

Components without `"use client"` are server components that:
- Render on the server
- Can access server resources
- Have smaller client bundles
- Cannot use React hooks

### Animation Pattern

Most animated content uses the `Reveal` component:

```tsx
<Reveal delay={0.1}>
  <Content />
</Reveal>
```

This provides consistent fade-in animations across the site.

### Analytics Pattern

Interactive components use analytics functions from `lib/analytics.ts`:

```tsx
import { trackEvent } from '@/lib/analytics';

const handleClick = () => {
  trackEvent('custom_event', { param: 'value' });
};
```

---

## Adding New Components

When creating new components:

1. Add JSDoc comment describing the component
2. Document all props with TypeScript interfaces
3. Include usage examples in the JSDoc
4. Add analytics tracking if interactive
5. Use Reveal wrapper for animated content
6. Follow existing naming conventions

### Component Template

```tsx
/**
 * ComponentName - Brief description of what this component does.
 *
 * @param prop1 - Description of prop1
 * @param prop2 - Description of prop2
 *
 * @example
 * <ComponentName prop1="value" prop2={123}>
 *   Child content
 * </ComponentName>
 */
"use client"; // if needed

interface Props {
  prop1: string;
  prop2: number;
}

export default function ComponentName({ prop1, prop2 }: Props) {
  return (
    <div>{prop1} - {prop2}</div>
  );
}
```

---

## Component Dependencies

### External Libraries

- **Framer Motion** - Used for animations in Reveal and InteriorPage
- **Next.js** - Image, Link, and other Next.js components
- **React** - Core React functionality

### Internal Dependencies

- **lib/analytics.ts** - Analytics tracking functions
- **data/*.ts** - Static data imports
- **components/** - Other components

---

## Styling Conventions

Components use Tailwind CSS classes:

- Use utility classes for styling
- Follow mobile-first responsive design
- Use semantic HTML elements
- Maintain consistent spacing scales
- Use design tokens for colors and spacing

---

## Accessibility

Components should:

- Use semantic HTML elements
- Include appropriate ARIA labels
- Support keyboard navigation
- Have proper focus states
- Include alt text for images
- Support screen readers
