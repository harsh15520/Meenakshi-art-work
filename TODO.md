# Academy Registry Marquee — Visible Band Above Chest

## Goal
Restructure the Student Locker so the Academy Artists Registry marquee renders
as a visible, full-width horizontal band (between the header and the chest)
instead of an absolutely-positioned decorative layer that disappeared behind
the chest box.

## Steps
- [x] 1. `StudentLocker.tsx` — place `<AcademyRegistryMarquee />` outside the
      stage as a normal-flow full-width band; keep `.student-locker__stage`
      for the chest frame only.
- [x] 2. `globals.css` — `.academy-registry` is now `position:relative` (visible
      band) with a soft gold band background, top/bottom borders, padding and
      opacity .85 so it reads on both desktop and mobile.
- [x] 3. Verify responsive alignment (≤620px) — keep band fully visible, tighten
      gap/padding; entries remain on a single scrolling line.
- [ ] 4. Typecheck (`tsc --noEmit`) passes.

