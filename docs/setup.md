# Setup Guide

This guide will help you set up the Meenakshi Art Work website for development and deployment.

## Prerequisites

- Node.js 18+ installed
- npm or pnpm package manager
- Git (for version control)

## Development Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd meenakshi-art-work1
```

### 2. Install Dependencies

```bash
npm install
```

Or if using pnpm:

```bash
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Required - absolute URL of your site (no trailing slash)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Optional - Sentry configuration (for error tracking)
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
NEXT_PUBLIC_SENTRY_ENVIRONMENT=development
SENTRY_AUTH_TOKEN=your-sentry-auth-token
SENTRY_ORG=your-org-name
SENTRY_PROJECT=meenakshi-art-work

# Optional - Google Analytics (for business analytics)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 4. Run Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm run test` - Run unit tests with Vitest
- `npm run test:watch` - Run tests in watch mode
- `npm run test:e2e` - Run end-to-end tests with Playwright

## Project Structure

```
meenakshi-art-work1/
├── app/                 # Next.js App Router pages
├── components/          # Reusable React components
├── data/               # Static data files
├── lib/                # Utility functions
├── public/             # Static assets (images, etc.)
├── docs/               # Documentation
└── tests/              # Test files
```

## Adding New Content

### Adding a New Artist Profile

1. Edit `data/artists.ts`
2. Add a new entry to the `artistProfiles` array
3. Ensure all required fields are populated
4. Add corresponding images to `public/images/academy/[artist-slug]/`

### Adding a New Journal Entry

1. Edit `data/journal.ts`
2. Add a new entry to the `journalEntries` array
3. If part of an ongoing thread, create/update a `JournalThread` entry
4. Add any mentioned people to `data/journalPeople.ts` if needed

### Adding Testimonials

1. Edit `data/testimonials.ts`
2. Add to either `postcards` (featured) or `stickyNotes` (quick reviews)

## Deployment

### Vercel Deployment (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy automatically on push to main branch

### Manual Deployment

```bash
npm run build
npm run start
```

The built files will be in the `.next` directory.

## Monitoring Setup

### Sentry (Error Tracking)

1. Create a Sentry account at https://sentry.io
2. Create a new project for Next.js
3. Add the DSN to your environment variables
4. Source maps are uploaded automatically on production builds

### Vercel Analytics

1. Enable Vercel Analytics in project settings
2. The `@vercel/analytics` package is already installed
3. Data appears in your Vercel dashboard automatically

### Google Analytics

1. Create a GA4 property at https://analytics.google.com
2. Add the Measurement ID to your environment variables
3. Custom events are tracked via `lib/analytics.ts`

## Troubleshooting

### Build Errors

If you encounter build errors:

1. Run `npm run typecheck` to check for TypeScript errors
2. Run `npm run lint` to check for linting issues
3. Clear the `.next` cache: `rm -rf .next`
4. Reinstall dependencies: `rm -rf node_modules && npm install`

### Images Not Loading

1. Ensure images are in the `public/` directory
2. Check image paths in data files start with `/images/`
3. Verify image formats are supported (jpg, png, webp, avif)

### Environment Variables Not Working

1. Ensure `.env.local` is in the root directory
2. Restart the development server after adding variables
3. Check that variable names start with `NEXT_PUBLIC_` for client-side access

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
