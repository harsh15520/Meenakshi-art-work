# ADR 003: Static Data Management Approach

## Status
Accepted

## Context
The Meenakshi Art Work website needs to manage various types of content:
- Artist profiles and their artworks
- Journal entries and threads
- Testimonials and reviews
- Curriculum information
- Gallery images

We need to decide how to store and manage this content.

## Decision
Use **TypeScript data files** in the `data/` directory for all content management.

## Rationale

### Why Static Data Files?

**Simplicity**
- No database setup or maintenance required
- No migration scripts or schema changes
- Content is version-controlled with Git
- Easy to edit and review content changes

**Performance**
- Zero database query latency
- Content is bundled with the application
- Fast static site generation
- No external dependencies for content delivery

**Cost**
- No database hosting costs
- No database scaling concerns
- No backup complexity (Git serves as backup)

**Development Workflow**
- Content changes go through normal Git workflow
- Pull requests for content review
- Easy rollback with Git history
- Content and code in the same repository

**Suitability for Use Case**
- Content changes infrequently (artist profiles, journal entries)
- No user-generated content
- No real-time content requirements
- Small to medium content volume (< 1000 entries)

### Why Not a Database?

**Overhead**
- Database setup and maintenance
- Connection management
- Query optimization
- Backup and restore procedures

**Complexity**
- ORM or query builder needed
- Migration management
- Schema changes over time
- Development vs production database sync

**Cost**
- Database hosting costs (even for free tiers)
- Scaling costs as content grows
- Backup storage costs

**Unnecessary for This Use Case**
- No user authentication needed
- No user-generated content
- No real-time updates
- Content is primarily static

### Data File Structure

```typescript
// data/artists.ts
export const artistProfiles: ArtistProfile[] = [
  {
    slug: "aarna",
    name: "Aarna",
    // ... other fields
  }
];

export function getArtistProfile(slug: string): ArtistProfile | undefined {
  return artistProfiles.find((profile) => profile.slug === slug);
}
```

### Type Safety

Using TypeScript provides:
- Compile-time type checking
- Autocomplete in IDE
- Refactoring safety
- Self-documenting code

### Static Generation

Next.js can generate static pages at build time:

```typescript
// Generate static params for dynamic routes
export async function generateStaticParams() {
  return artistProfiles.map((artist) => ({
    slug: artist.slug,
  }));
}
```

## Implementation Details

### Data Organization

```
data/
├── artists.ts          # Artist profiles and artworks
├── journal.ts          # Journal entries and threads
├── journalPeople.ts    # People mentioned in journal
├── testimonials.ts     # Customer reviews
├── curriculum.ts       # Academy curriculum phases
├── categoryImages.ts   # Gallery category images
└── exhibitionImages.ts # Exhibition artwork images
```

### Helper Functions

Each data file exports helper functions:

```typescript
// Get single item by slug
export function getArtistProfile(slug: string): ArtistProfile | undefined

// Get related items
export function getArtwork(slug: string, artworkSlug: string)

// Get filtered lists
export function getActiveThreads(): JournalThread[]

// Get statistics
export function getJournalStats(): JournalStats
```

### Content Updates

**Adding New Content:**
1. Edit the appropriate data file
2. Add new entry to the array
3. Ensure all required fields are populated
4. Add corresponding images to public/ directory
5. Commit and deploy

**Updating Content:**
1. Find the entry in the data file
2. Update the fields
3. Commit and deploy

**Removing Content:**
1. Remove entry from data file
2. Optionally remove associated images
3. Commit and deploy

## Consequences

### Positive
- Simple and maintainable
- Fast performance
- No database costs
- Version-controlled content
- Type-safe content structure
- Easy content review process

### Negative
- No real-time content updates
- Requires redeployment for content changes
- Manual content management (no CMS)
- Large data files could impact build time
- No search functionality without additional implementation

### Mitigations

**For Real-Time Needs:**
- If real-time updates become necessary, can migrate to a CMS later
- Incremental static regeneration (ISR) can provide near real-time updates

**For Content Management:**
- Can add a simple admin interface later if needed
- Can integrate with a headless CMS (Contentful, Sanity) while keeping data files as source

**For Search:**
- Can implement client-side search with Fuse.js
- Can use Algolia or similar for advanced search

**For Large Data Volumes:**
- Data files can be split into smaller files
- Can lazy load data as needed
- Can migrate to database if data volume becomes problematic

## When to Reconsider

Consider migrating to a database or CMS if:

- Content needs to be updated by non-technical users
- Real-time content updates are required
- Content volume exceeds 10,000 entries
- User-generated content is needed
- Complex content relationships emerge
- Content editors need a visual interface

## Alternatives Considered

### Database (PostgreSQL, MySQL)
- Rejected: Overkill for current needs, adds complexity and cost

### Headless CMS (Contentful, Sanity)
- Rejected: Additional cost, learning curve, not needed for current use case

### Markdown Files with Frontmatter
- Rejected: Less type-safe, harder to maintain complex relationships

### JSON Files
- Rejected: No type safety, harder to maintain, no helper functions

## References

- [Next.js Static Generation](https://nextjs.org/docs/app/building-your-application/optimizing/static-exports)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
