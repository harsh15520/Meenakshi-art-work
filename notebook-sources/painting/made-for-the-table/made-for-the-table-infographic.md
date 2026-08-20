# Made for the Table — Infographic Spec · "Flowers She Can Eat Off"

> **Source type:** Commissioned table-set infographic (one-page cheat-sheet) · **Slug:** `made-for-the-table`
> **Piece:** Jasmine · Wood Plate · Hand-painted wood, Round, 16 in · **Layout:** portrait (round-plate motif) preferred
> **Companion source:** `made-for-the-table-curator-report.md`
> **Hero / opening image:** `/images/custom/exhibition/5.webp` · **Detail ref:** `/images/custom/oil-painting-2.webp`

## One-line concept

A single-page visual cheat-sheet for "how a hand-painted table set gets made" — the birthday brief, the beautiful-and-usable problem, the sealed-wood material, the garden-matched palette, the four-week build, and the set in daily use.

## Sections to lay out

### 1. The commission at a glance (fact strip)
- **Piece:** Jasmine · Wood Plate
- **Medium:** Hand-painted wood (acrylic + food-safe sealant)
- **Size:** Round, 16 in · **Price:** ₹4,500
- **Gift from:** A daughter · **Completed in:** 4 weeks · **Delivered:** Pune

### 2. The brief
- Hand-painted wooden plates and a tray with jasmine and magnolia, for the mother's birthday.
- Beautiful — but safe to actually eat from.
- Client voice: *"She feeds us all on them now — the flowers match the jasmine in her garden."*

### 3. Two client notes (callouts)
- **Her jasmine, not a jasmine** — *"Could the jasmine match the ones in my mother's garden — not a generic flower, her jasmine?"*
- **Food-safe, not display-safe** — *"Please make the tray safe for actual food, not just display — she'll use it, not store it."*

### 4. The problem: beautiful and usable
- Painted tableware usually fails one way: too precious to use, or too plain to love.
- The brief demanded both — food-safe **and** genuinely beautiful.
- Why it mattered: the mother would use them daily; a display-only gift would have been a quiet insult.

### 5. The material (sealed wood)
- **Chosen:** acrylic-painted wood, finished with a food-safe sealant — wood takes floral colour warmly and, once sealed, survives washing and daily food.
- **Set aside:** ceramic (client wanted the lighter wood feel) · untreated wood (not food-safe) · printed melamine (no hand behind it).

### 6. Palette — her garden, exactly (three swatches)
- **White jasmine** — the daughter's request; matched to the mother's actual garden, not a generic bloom.
- **Soft magnolia pink** — the companion plate; a second note so the set reads as a pair, not a repeat.
- **Leaf green scrollwork** — the join; carries the eye around the rim so the flower sits in a garden, not floats.

### 7. Four weeks to the birthday (timeline strip)
- **W1** Wood prep and base — plates and tray sealed and primed → **W2–3** Florals — jasmine and magnolia painted by hand on each piece → **W4** Sealing and dispatch — food-safe top coat, set sent to Pune for the birthday.

### 8. Details people almost miss
- **The garden-matched jasmine** — painted from the mother's actual garden photo; the daughter's one non-negotiable.
- **The sealant coats** — three coats of food-safe finish; invisible, but the reason the art survives the sink.

### 9. Living on the table
- The mother serves the family on them daily — exactly as asked.
- The jasmine is recognised as "hers" by visiting grandchildren.
- The tray became the birthday-table centre piece, then stayed.

## Visual cues
- Round 16-in plate motif as the page frame, with leaf-green scrollwork running the rim.
- Garden-matched jasmine drawn twice side by side — a "stock flower" ghosted out, her garden jasmine solid — to show the match.
- Sealant coats as three faint stacked layers over a painted petal (labelled invisible), with a small sink/wash icon to show what they protect.
- Three palette dots (white jasmine, soft magnolia pink, leaf green) placed as plate–plate–rim, echoing the set reading as a pair.

---

## Provenance (spec → source)

| Section | Source (`data/paintingStories.ts` → `made-for-the-table`) |
|---|---|
| Commission facts | `exhibitionImages.ts` → `customOrdersExhibitionImages` room 5 `storyFacts` + piece data (`pieceId`, medium, size, price) |
| The brief | `modules` → `the-brief` |
| Client voice / two client notes | `exhibitionImages.ts` room 5 `testimonial` + `clientNotes` |
| Beautiful and usable | `modules` → `the-problem` |
| The material | `modules` → `material-choice` |
| Palette | `modules` → `color-decisions` |
| Timeline | `modules` → `process-timeline` |
| Notebook basis for sealant cue | `modules` → `artists-notebook` |
| Details people almost miss | `modules` → `details-people-almost-miss` |
| Living on the table | `modules` → `living-observations` |
| Visual cues (jasmine · scrollwork · sealant) | `signatureInteraction` (detail-explorer) |
