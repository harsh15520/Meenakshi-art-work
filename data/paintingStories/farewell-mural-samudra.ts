import type { PaintingStory } from "../exhibitionImages";

// Pilot Story 2: Samudra Manthan - Monumental Effort narrative
const story: PaintingStory = {
    slug: "farewell-mural-samudra",
    contextualTitle: "The Grand Gesture",
    pieceId: "The Churning of the Ocean",
    storyContext: "commission",
    emotionalSignature: "grounded",

    openingScene: {
      image: "/images/custom/exhibition/2.webp",
      narrative: "Some farewells are too large for words. This one needed a wall. An institutional hall where decades of service were honored not with a speech, but with mythology that speaks about effort itself.",
    },

    modules: [
      {
        type: "the-brief",
        title: "The Institution's Request",
        content: {
          type: 'the-brief',
          originalRequest: "A farewell mural for a mentor who gave the institution everything. It had to feel monumental—not just the achievement, but the effort itself.",
          clientWords: "We wanted something that would remind future generations of what persistence looks like.",
        },
        order: 1,
      },
      {
        type: "scale-struggle",
        title: "Canvas to Wall Scale Challenge",
        content: {
          type: 'scale-struggle',
          challenge: "What works on canvas doesn't always translate to mural scale. The figures needed to be readable from across a large hall while maintaining detail up close.",
          adaptation: "Multiple scale studies were created to understand how figures would read from different distances. We tested viewing angles from multiple points in the hall.",
        },
        order: 2,
      },
      {
        type: 'process-timeline',
        title: "8-Week Timeline",
        content: {
          type: 'process-timeline',
          timeline: [
            { date: "Week 1", milestone: "Story brief and philosophy alignment", description: "We spent the first week understanding the mentor's philosophy and why the churning metaphor mattered." },
            { date: "Week 2", milestone: "Wall preparation and surface testing", description: "The institutional wall required special preparation. We tested surfaces in small sections before committing to the full 8×6 ft space." },
            { date: "Week 3-4", milestone: "Scale studies and figure composition", description: "Multiple scale studies and figure positioning for visual balance from multiple viewing angles." },
            { date: "Week 5-6", milestone: "Color layering and mural techniques", description: "Mural acrylics behave differently than canvas paints. We layered colors to withstand institutional lighting." },
            { date: "Week 7", milestone: "Detail work and refinement", description: "Final touches on the serpent Vasuki and emerging treasures." },
            { date: "Week 8", milestone: "Installation day completion", description: "Final touches added on the day of the farewell ceremony." },
          ],
        },
        order: 3,
      },
      {
        type: 'artists-notebook',
        title: "Mural Sketches",
        content: {
          type: 'artists-notebook',
          entries: [
            {
              sketch: "/images/custom/oil-painting-samudra-manthan.webp",
              notes: "The serpent Vasuki needs to wrap around the entire composition—it's the backbone of the story, representing effort itself.",
              date: "Week 2",
            },
            {
              sketch: "/images/custom/oil-painting-samudra-manthan.webp",
              notes: "Treasures shown in stages of emergence—some fully visible, some still forming. Achievement is a process, not a moment.",
              date: "Week 4",
            },
          ],
        },
        order: 4,
      },
      {
        type: 'installation-day',
        title: "Farewell Ceremony Installation",
        content: {
          type: 'installation-day',
          narrative: "The mural was completed over 8 weeks, with the final touches added on the day of the farewell ceremony. Students and faculty watched as the final details were revealed.",
          time: "Farewell Ceremony Day",
        },
        order: 5,
      },
      {
        type: 'room-transformation',
        title: "Hall Transformation",
        content: {
          type: 'room-transformation',
          before: "This wall was just a wall—functional, blank, serving no purpose beyond dividing space.",
          after: "Now it's a teacher. Every student who walks past sees what persistence looks like, rendered at scale.",
          beforeImage: "/images/custom/exhibition/2.webp",
          afterImage: "/images/custom/exhibition/2.webp",
        },
        order: 6,
      },
      {
        type: 'living-observations',
        title: "Living in the Hall",
        content: {
          type: 'living-observations',
          observations: [
            "Students now pause in front of it on their way to class. Some have started researching the story—mythology sparking curiosity.",
            "Faculty members use it as a teaching example when discussing perseverance and collective effort.",
            "The mural has become a landmark for giving directions in the institution.",
          ],
        },
        order: 7,
      },
      {
        type: 'studio-journal-chronology',
        title: "Studio Journal: The Complete Story",
        content: {
          type: 'studio-journal-chronology',
          entries: [
            {
              journalSlug: "textile-fabric-research-begins",
              title: "Material Research Beginnings",
              timestamp: "Week 1",
              preview: "The research for mural materials began alongside fabric testing...",
            },
          ],
        },
        order: 8,
      },
    ],

    signatureInteraction: {
      type: 'before-after-slider',
      data: {
        beforeImage: "/images/custom/exhibition/2.webp",
        afterImage: "/images/custom/exhibition/2.webp",
        beforeLabel: "Blank Wall",
        afterLabel: "Story Told",
      },
    },

    inquiryMethod: "whatsapp",
  };

export default story;
