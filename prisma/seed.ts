import { prisma } from "../lib/db/client";
import { journalPeople } from "../data/journalPeople";
import { journalThreads, journalEntries } from "../data/journal";
import { journalComments } from "../data/journalComments";
import { artistProfiles } from "../data/artists";
import {
  customInStudio,
  customClientStory,
  recentlyDeliveredCommissions,
  COMMISSION_STAGE_LABELS,
} from "../data/customOrdersLive";
import {
  galleryRecentlyAdded,
  galleryInStudio,
  galleryMonthlyFavourite,
} from "../data/galleryLive";
import { paintingStories } from "../data/paintingStories";

/**
 * Build-time seed: imports the hand-maintained data/*.ts objects, enforces
 * relational integrity, and normalizes M:N relations into junction tables.
 *
 * The Prisma schema's @@unique / relations already reject duplicate PKs and
 * orphan FKs at write time. We additionally pre-validate and print a clear
 * report so a typo'd slug fails the build with an actionable message instead
 * of silently returning undefined at read time.
 */

type FkIssue = { relation: string; from: string; missingRef: string };
const fkIssues: FkIssue[] = [];

function checkFk(relation: string, from: string, ref: string | undefined | null, valid: Set<string>) {
  if (ref && !valid.has(ref)) {
    fkIssues.push({ relation, from, missingRef: ref });
  }
}

const json = (v: unknown) => JSON.stringify(v ?? null);

async function main() {
  console.log("🌱 Seeding SQLite from data/*.ts …");

  // Reset tables (idempotent build-time seed).
  await prisma.entryTag.deleteMany();
  await prisma.entryMention.deleteMany();
  await prisma.journalComment.deleteMany();
  await prisma.paintingStory.deleteMany();
  await prisma.galleryPainting.deleteMany();
  await prisma.commission.deleteMany();
  await prisma.artwork.deleteMany();
  await prisma.journalEntry.deleteMany();
  await prisma.journalThread.deleteMany();
  await prisma.journalPerson.deleteMany();
  await prisma.artistProfile.deleteMany();

  const personSlugs = new Set(journalPeople.map((p) => p.slug));
  const profileSlugs = new Set(artistProfiles.map((p) => p.slug));
  const threadSlugs = new Set(journalThreads.map((t) => t.slug));
  const entrySlugs = new Set(journalEntries.map((e) => e.slug));

  // ── ArtistProfile (CHECK: published profile needs shareCode) ───────────────
  // Inserted BEFORE JournalPerson because JournalPerson.academySlug is an FK to it.
  for (const p of artistProfiles) {
    if (!p.isSample && !p.shareCode) {
      console.warn(`⚠️  ArtistProfile ${p.slug} is published (isSample=false) but has no shareCode.`);
    }
  }
  await prisma.artistProfile.createMany({
    data: artistProfiles.map((p) => ({
      slug: p.slug,
      name: p.name,
      joinedYear: p.joinedYear,
      headline: p.headline,
      bio: p.bio ?? null,
      isSample: p.isSample ?? false,
      heroImage: p.heroImage,
      featuredArtworkSlug: p.featuredArtworkSlug ?? null,
      shareCode: p.shareCode ?? null,
      galleryWallImage: p.galleryWallImage ?? null,
      teacherNoteImage: p.teacherNoteImage ?? null,
      certificateId: p.certificate?.certificateId ?? null,
      certificateIssued: p.certificate?.issuedDate ?? null,
    })),
  });

  // ── Artwork (1:N under profile) ───────────────────────────────────────────
  const artworks = artistProfiles.flatMap((p) =>
    (p.artworks ?? []).map((a) => ({
      artworkSlug: a.artworkSlug,
      profileSlug: p.slug,
      title: a.title,
      image: a.image,
      displayImage: a.displayImage,
      medium: a.medium,
      size: a.size,
      year: a.year,
      description: a.description ?? null,
      story: a.story,
      exploredSkills: json(a.exploredSkills),
      macroShots: json(a.macroShots),
      roomMockups: json(a.roomMockups),
      behindTheCanvas: a.behindTheCanvas ? json(a.behindTheCanvas) : null,
    }))
  );
  for (const a of artworks) checkFk("Artwork.profileSlug", a.artworkSlug, a.profileSlug, profileSlugs);
  if (artworks.length) await prisma.artwork.createMany({ data: artworks });

  // ── JournalPerson (validate academySlug FK) ───────────────────────────────
  for (const p of journalPeople) {
    checkFk("JournalPerson.academySlug", p.slug, p.academySlug, profileSlugs);
  }
  await prisma.journalPerson.createMany({
    data: journalPeople.map((p) => ({
      slug: p.slug,
      name: p.name,
      role: p.role,
      academySlug: p.academySlug ?? null,
      isAnonymized: p.isAnonymized ?? false,
    })),
  });

  // ── JournalThread ─────────────────────────────────────────────────────────
  await prisma.journalThread.createMany({
    data: journalThreads.map((t) => ({
      slug: t.slug,
      title: t.title,
      workType: t.workType,
      status: t.status,
      statusNote: t.statusNote,
      statusUpdatedOn: t.statusUpdatedOn,
      startedOn: t.startedOn,
      completedOn: t.completedOn ?? null,
    })),
  });

  // ── JournalEntry + normalized M:N (mentions, tags) ────────────────────────
  await prisma.journalEntry.createMany({
    data: journalEntries.map((e) => ({
      slug: e.slug,
      title: e.title,
      category: e.category,
      format: e.format ?? null,
      excerpt: e.excerpt,
      body: json(e.body),
      publishedOn: e.publishedOn,
      readTimeMinutes: e.readTimeMinutes,
      status: e.status,
      threadSlug: e.threadSlug ?? null,
      stream: e.stream,
      stage: e.stage ?? null,
      emoji: e.emoji ?? null,
      stripLabel: e.stripLabel ?? null,
      coverImage: e.coverImage ?? null,
    })),
  });

  const mentions: { entrySlug: string; personSlug: string }[] = [];
  const tags: { entrySlug: string; tag: string }[] = [];
  for (const e of journalEntries) {
    checkFk("JournalEntry.threadSlug", e.slug, e.threadSlug, threadSlugs);
    for (const personSlug of e.mentionedPeople ?? []) {
      checkFk("EntryMention.personSlug", e.slug, personSlug, personSlugs);
      mentions.push({ entrySlug: e.slug, personSlug });
    }
    for (const tag of e.tags ?? []) tags.push({ entrySlug: e.slug, tag });
  }
  if (mentions.length) await prisma.entryMention.createMany({ data: mentions });
  if (tags.length) await prisma.entryTag.createMany({ data: tags });

  // ── JournalComment (validate entrySlug + personSlug FKs) ──────────────────
  for (const c of journalComments) {
    checkFk("JournalComment.entrySlug", c.id, c.entrySlug, entrySlugs);
    checkFk("JournalComment.personSlug", c.id, c.personSlug, personSlugs);
  }
  await prisma.journalComment.createMany({
    data: journalComments.map((c) => ({
      id: c.id,
      entrySlug: c.entrySlug,
      personSlug: c.personSlug,
      text: c.text,
      postedOn: c.postedOn,
      roleTag: c.roleTag ?? null,
      replyBy: c.replyBy ?? null,
    })),
  });

  // ── Commission (partitions from customOrdersLive) ─────────────────────────
  const commissions = [
    { ...customInStudio, partition: "in-studio" },
    { ...customClientStory.commission, partition: "client-story" },
    ...recentlyDeliveredCommissions.map((c) => ({ ...c, partition: "recently-delivered" })),
  ];
  await prisma.commission.createMany({
    data: commissions.map((c) => ({
      id: c.id,
      title: c.title,
      status: c.status,
      stage: c.stage ?? null,
      addedOn: c.addedOn,
      partition: c.partition,
      curatorsChoice: false,
      data: json(c),
    })),
  });

  // ── GalleryPainting (partitions from galleryLive) ─────────────────────────
  const galleryPaintings = [
    { ...galleryRecentlyAdded, partition: "recently-added" },
    { ...galleryInStudio, partition: "in-studio" },
    { ...galleryMonthlyFavourite.painting, partition: "monthly-favourite" },
  ];
  await prisma.galleryPainting.createMany({
    data: galleryPaintings.map((g) => ({
      id: g.id,
      title: g.title,
      status: g.status,
      stage: g.stage ?? null,
      addedOn: g.addedOn,
      partition: g.partition,
      journalSlug: g.journalSlug ?? null,
      curatorsChoice: g.curatorsChoice ?? false,
      data: json(g),
    })),
  });

  // ── PaintingStory ─────────────────────────────────────────────────────────
  // relate by best-effort slug match against journal entries.
  await prisma.paintingStory.createMany({
    data: paintingStories.map((s) => {
      const relatedJournalSlug = entrySlugs.has(s.slug) ? s.slug : null;
      return {
        slug: s.slug,
        contextualTitle: s.contextualTitle,
        storyContext: s.storyContext,
        relatedJournalSlug,
        data: json(s),
      };
    }),
  });

  // ── Report ────────────────────────────────────────────────────────────────
  const counts = {
    journalPerson: await prisma.journalPerson.count(),
    artistProfile: await prisma.artistProfile.count(),
    artwork: await prisma.artwork.count(),
    journalThread: await prisma.journalThread.count(),
    journalEntry: await prisma.journalEntry.count(),
    entryMention: await prisma.entryMention.count(),
    entryTag: await prisma.entryTag.count(),
    journalComment: await prisma.journalComment.count(),
    commission: await prisma.commission.count(),
    galleryPainting: await prisma.galleryPainting.count(),
    paintingStory: await prisma.paintingStory.count(),
  };
  console.log("✅ Seed complete:", counts);

  if (fkIssues.length) {
    console.error("\n❌ Orphan foreign keys detected:");
    for (const i of fkIssues) {
      console.error(`  - ${i.relation}: ${i.from} -> missing ${i.missingRef}`);
    }
    process.exit(1);
  } else {
    console.log("✅ Referential integrity OK (no orphan FKs).");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
