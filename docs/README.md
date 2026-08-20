# Documentation Index

## CS fundamentals — applied & assessed against this codebase

Four documents survey the actual code through a specific lens each — what's already
applied, what could be, evidence-based (real file paths, not generic advice). Same
format across all four; read any one and the others will feel familiar.

- [data-structures.md](./data-structures.md) — every content interface (`PaintingStory`,
  `JournalEntry`, `ArtistProfile`, …), the in-memory hash-map/inverted-index layer built
  once at module load, the `NarrativeModule` discriminated union, and the
  file-per-record storage layout (`data/paintingStories/<slug>.ts`, etc.).
- [os-concepts-assessment.md](./os-concepts-assessment.md) — processes, scheduling,
  memory, the file system, IPC, synchronization, deadlock/starvation, virtualization,
  caching, security, fault tolerance, real-time timers, distributed resources.
- [computer-networks-assessment.md](./computer-networks-assessment.md) — HTTP/TLS
  lifecycle, CDN/edge delivery, DNS/preconnect, caching headers, the WhatsApp deep-link
  integration, bandwidth management, the offline service worker, network-layer
  security (CSP/SRI), crawling, and real-time/push (not yet applied).
- [dbms-assessment.md](./dbms-assessment.md) — the build-time Prisma/SQLite relational
  layer over `data/*.ts` (schema design, keys, foreign keys, normalization, indexing,
  transactions, constraints, caching/materialized views, denormalization, migrations),
  including an ER diagram of `prisma/schema.prisma`.

**Cross-references worth knowing:** the referential-integrity build gate
(`prisma/seed.ts`, verified live in `npm run build` output) shows up as both a DBMS
constraint story and an OS fault-tolerance story. The rate-limiting gap on the
unauthenticated certificate route shows up identically in the OS, CN, and DBMS docs —
it's one real gap, described from three angles. `NETWORKING_IMPROVEMENTS_PLAN.md` (repo
root) is the original implementation plan behind most of the CN doc's "Applied" items
(Service Worker, middleware/HTTPS, preconnect, retry/backoff, signed URLs) — read it for
more granular implementation notes on each.

## Data & content

- [data-structures.md](./data-structures.md) (above)
- [component-props.md](./component-props.md) — prop interfaces for every React component.

## Architecture Decision Records

- [architecture/001-technology-stack.md](./architecture/001-technology-stack.md)
- [architecture/002-nextjs-app-router.md](./architecture/002-nextjs-app-router.md)
- [architecture/003-data-management.md](./architecture/003-data-management.md) — why
  content is hand-written TypeScript rather than a live database (read alongside
  `dbms-assessment.md`'s "Stack context" section, which explains the build-time
  relational layer added on top of this decision).
- [architecture/004-analytics-privacy.md](./architecture/004-analytics-privacy.md)

## Operations

- [setup.md](./setup.md) — local dev + deployment setup.
- [monitoring.md](./monitoring.md) / [monitoring-runbook.md](./monitoring-runbook.md) —
  monitoring/alerting setup and the runbook for responding to alerts.

## Content audits

- [visitor-matrix/README.md](./visitor-matrix/README.md) — per-page Perspective ×
  Situation audits (home, gallery, painting, academy, custom-orders, journal, contact).

## Elsewhere in the repo (not under `docs/`)

- `CLAUDE.md` — process checklist and hard-won gotchas; read before editing anything.
- `CODEBASE_ASSESSMENT.md`, `PERFORMANCE_ASSESSMENT.md`,
  `performance-impact-assessment.md` — broader codebase/performance audits that predate
  and partly motivate the CS-fundamentals docs above.
- `NETWORKING_IMPROVEMENTS_PLAN.md` — the implementation plan behind most of
  `computer-networks-assessment.md`'s "Applied" findings.
