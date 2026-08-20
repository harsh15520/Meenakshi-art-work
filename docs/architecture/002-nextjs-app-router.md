# ADR 002: Next.js App Router Architecture

## Status
Accepted

## Context
Next.js offers two routing patterns: Pages Router (traditional) and App Router (newer). We need to choose which pattern to use for the Meenakshi Art Work website.

## Decision
Use **Next.js App Router** for all routing.

## Rationale

### App Router Advantages

**Layouts**
- Nested layouts allow shared UI (header, footer) to be defined once
- Route groups for organizing routes without affecting URL structure
- Template layouts for state that shouldn't persist across navigation

**Server Components by Default**
- Reduced client-side JavaScript bundle size
- Better performance by default
- Direct access to server resources (databases, file system)
- Improved SEO with server-rendered content

**Streaming**
- Progressive rendering with React Server Components
- Faster initial page load
- Better perceived performance
- Suspense boundaries for loading states

**Data Fetching**
- Built-in data fetching with async/await
- Automatic request deduplication
- Streaming responses for faster perceived performance
- No need for getStaticProps/getServerSideProps

**Improved Developer Experience**
- Colocation of components and data fetching
- Better TypeScript support
- Simpler mental model for routing
- Better error handling with error.tsx and loading.tsx

### Why Not Pages Router?

**Legacy Pattern**
- Pages Router is the older pattern, being phased out
- Less future-proof as Next.js focuses on App Router
- Fewer features and capabilities

**Client-Side Focus**
- Default to client components increases bundle size
- More manual optimization needed for performance
- Less efficient data fetching patterns

**Limited Layout Support**
- No nested layouts
- More complex to share UI across routes
- Requires higher-order components for shared layouts

## Implementation Details

### Directory Structure

```
app/
├── layout.tsx          # Root layout (header, footer)
├── page.tsx            # Homepage
├── academy/
│   ├── layout.tsx      # Academy-specific layout
│   └── page.tsx        # Academy listing
├── academy/[slug]/
│   └── page.tsx        # Individual artist profile
├── gallery/
│   └── page.tsx        # Gallery page
├── journal/
│   ├── layout.tsx      # Journal-specific layout
│   └── page.tsx        # Journal listing
├── journal/[slug]/
│   └── page.tsx        # Individual journal entry
└── contact/
    └── page.tsx        # Contact page
```

### Server vs Client Components

**Use Server Components for:**
- Data fetching
- Static content
- SEO-critical pages
- Components that don't need interactivity

**Use Client Components for:**
- Interactive elements (buttons, forms)
- State management
- Browser APIs (localStorage, window)
- Event listeners
- Framer Motion animations

### Data Fetching Pattern

```typescript
// Server Component with async data fetching
export default async function ArtistProfile({ params }: { params: { slug: string } }) {
  const artist = getArtistProfile(params.slug);
  
  if (!artist) {
    notFound();
  }
  
  return <ArtistProfileView artist={artist} />;
}
```

### Static Generation

Most pages use static generation for optimal performance:

```typescript
// Generate static params for dynamic routes
export async function generateStaticParams() {
  return artistProfiles.map((artist) => ({
    slug: artist.slug,
  }));
}
```

## Consequences

### Positive
- Better performance by default with server components
- Smaller client-side bundles
- Improved SEO with server rendering
- Modern, future-proof architecture
- Better developer experience

### Negative
- Learning curve for team unfamiliar with App Router
- Some third-party libraries may not support server components
- Need to carefully manage server/client component boundaries

### Migration Notes
- If migrating from Pages Router, would require significant refactoring
- Some patterns (getStaticProps, getServerSideProps) don't apply
- Need to use new data fetching patterns

## Alternatives Considered

### Pages Router
- Rejected: Legacy pattern, less future-proof, worse performance by default

### Hybrid Approach
- Rejected: Adds complexity, inconsistent patterns across the codebase

## References

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Server Components](https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading#server-components)
- [Rendering Patterns](https://nextjs.org/docs/app/building-your-application/rendering)
