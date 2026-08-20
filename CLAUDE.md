# Working in this repo

Meenakshi Art Work — a Next.js 15 (App Router) + TypeScript site for an oil
painting academy/studio in Saharanpur. For architecture, data model, and setup,
read `README.md` and `docs/` (especially `docs/architecture/003-data-management.md`
and `docs/setup.md`) — this file does not repeat any of that. This file is a
process checklist and a list of hard-won gotchas from prior sessions. Read it
before editing anything, and follow the verification bar below before calling
any change done.

## The verification bar for every edit

1. **Type-check first.** `npx tsc --noEmit -p .` after any `.ts`/`.tsx` change.
   Fast, and catches real errors early.
2. **Run a full production build before calling anything done.** `npm run build`
   — not just `tsc`, not just the dev server. `npm run dev` never runs ESLint, so
   it will not catch build-blocking lint errors. This is not hypothetical: a prior
   session's changes passed `tsc` and looked fine in dev, but `next build` failed
   on ~130 pre-existing ESLint errors that dev mode had been silently skipping.
3. **On Windows, kill stray dev servers before building.** If `npm run dev` was
   running, stop it first (`taskkill //F //IM node.exe`) before `npm run build` —
   a live dev server holds a lock on `.next/trace` and the build fails with
   `EPERM: operation not permitted`.
4. **For any visual/UI change, verify with a real running browser and real
   interaction** — actual scroll events, actual clicks/tabs — not just a static
   full-page screenshot. Full-page CDP screenshots produce false positives here:
   - `Reveal.tsx`'s IntersectionObserver-driven fade-ins don't fire during a
     synthetic full-page capture, so sections render as blank gaps that are
     completely normal for a real scrolling user.
   - `position: sticky` elements (the header) can appear to duplicate mid-page in
     a stitched full-page image.
   Confirm anything that looks broken by actually scrolling the page and
   re-screenshotting before treating it as a bug.
5. **`next dev`'s first compile is slow** (30–60s+ is normal). A connection-refused
   or timeout on the very first request after starting the server does not mean
   it crashed — retry with a longer timeout before concluding it's down.

## Known project-specific gotchas

- **ESLint (via `next lint`/`next build`) only scans `app/`, `components/`,
  `lib/`, `pages/`, `src/` by default — not `data/`.** A field typed `any` in
  `data/*.ts` will never fail the build, even though the same looseness in a
  component will. Don't treat lint silence in `data/` as a signal that the code
  there is fine — it just means nothing is checking it.
- **Files headed "auto-generated — do not edit manually"** (e.g.
  `data/studentMosaic.ts`, produced by `scripts/build_students_mosaic.py`) must
  not be hand-edited. If its output needs correcting for a specific case, override
  at the point of consumption instead — see how `components/MeetStudentsWall.tsx`
  cross-checks each tile's `hasProfile` against `getArtistProfile(slug)?.isSample`
  rather than editing the generated tile data directly.
- **A `isSample` / "placeholder" / "demo data" flag is not self-enforcing.** Its
  presence in a data file, even with a comment saying "should not be published,"
  guarantees nothing. Check every consumer by hand: `generateStaticParams`, the
  page body's `notFound()` guard, and any nav/listing component that might link to
  it. One such flag sat unenforced in `data/artists.ts` for a fictional artist
  profile that was fully live in production and linked from the homepage.
- **Excluding a slug from `generateStaticParams` does not make that route 404.**
  Next's `dynamicParams` defaults to `true`, so the page still renders on demand
  unless the page body *also* explicitly checks the condition and calls
  `notFound()`. Both layers are required together.
- **`<Image fill>` needs an explicit, accurate `sizes` prop.** Omitting it (or
  leaving a wrong value, like `sizes="100vw"` on an image that isn't full-width)
  makes Next fetch the largest configured `deviceSizes` entry (up to 3840px wide)
  regardless of actual display size — real bandwidth waste on an image-heavy site.
- **CSS-`transform`-animated marquee/carousel tracks defeat Next Image's native
  lazy-loading.** Native lazy-load judges "near viewport" from an element's
  *static* layout position, which a `transform` animation doesn't change — so
  images laid out far outside the initial viewport in the DOM (as in a doubled
  marquee track) never fetch, no matter how soon the animation visually brings
  them on screen. Any such track needs `loading="eager"` on its images.
- **Before writing `data: any` (or reaching for a loose type), check whether a
  precise type already exists nearby that this specific consumer just isn't
  using.** This codebase tends to define a real discriminated union once (e.g.
  `ModuleContent` in `data/narrativeModules.ts`) and then leave some individual
  components still typed as `any` instead of importing the matching member type.
  Prefer wiring up the existing type over inventing a new loose one.

## Investigation / bug-report discipline

- Root-cause every visual finding to actual code (file:line) before reporting it.
  "Looks broken in a screenshot" is a hypothesis, not a finding — verify it.
- Before calling something a bug, check whether it's consistent, intentional
  design used elsewhere in the codebase. (Example: per-category accent colors in
  `ExhibitionWalk.tsx`, driven by a `THEME_HUES` JS map, looked like an accidental
  CSS override at first glance — grepping for the CSS custom property's actual
  usage showed it was fully intentional and unrelated to the visual in question.)
- To tell whether an image genuinely failed to load vs. just hasn't loaded yet:
  check `img.complete` and `img.naturalWidth` *and* cross-reference the network
  log for that exact request URL. A `naturalWidth` of 0 checked immediately after
  navigation is often a timing artifact, not a broken image — recheck after the
  page has settled.

## Scope discipline

- If verification (`build`/`lint`/`tsc`) surfaces a large pre-existing issue
  unrelated to the requested change, stop and ask before expanding scope. Don't
  silently take it on, and don't silently ignore it either — the size and
  unrelatedness of the issue is the user's call, not yours.
- When given specific instructions on some items plus "do the rest of a list,"
  write an explicit plan enumerating every item, with the specifically-called-out
  items visibly flagged, before starting any edits.
