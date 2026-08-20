import type { PaintingStory } from "../exhibitionImages";

// Pilot Story 3: Tiger Family - Stillness narrative (Gallery piece)
const story: PaintingStory = {
    slug: "tiger-family-quiet-hour",
    contextualTitle: "The Quiet Hour Before Sunset",
    pieceId: "Tiger Family",
    storyContext: "gallery",
    emotionalSignature: "protective",

    openingScene: {
      image: "/images/exhibition/5.webp",
      narrative: "This is a tigress and her cub in the last light of the day — not the ferocious tiger of calendars and logos, but an animal at the quiet end of her work. The heat has broken, the long gold hour has come, and she is simply watching. The painting was made to hold that single, unremarkable, extraordinary moment: the hour a mother stands guard and nothing happens.",
      video: { youtubeId: "C9Lh1tSOM8s" },
    },

    posterMoment: {
      title: "The Two Traps of the Tiger",
      subtitle: "A Family, in One Light",
      image: "/images/painting/oil-painting-51.webp",
      problemEyebrow: "The Problem",
      problem: "The tiger is the most painted big cat on earth, and almost always the same tiger — teeth bared, body coiled, mid-charge. A mother with a cub pulls toward the opposite trap: the soft, sentimental version, all warmth and no teeth. The real difficulty was refusing both — not a predator to fear, not a postcard to like, but a specific animal doing the oldest and hardest thing she does, which is keep her young alive and unseen. This is a gallery piece, so no one asked for a tiger. It had to earn its wall by being a tiger you haven't already seen a hundred times. The failure mode was a beautiful, interchangeable big cat. The aim was one family, in one light, holding one quiet — unmistakably this painting and no other.",
      problemQuote: "This is a gallery piece, so no one asked for a tiger. It had to earn its wall by being a tiger you haven't already seen a hundred times.",
      solutionEyebrow: "Where She Looks",
      solution: "Everything turns on where she looks. Her eyes are not on you and not on the cub — they rest on a point beyond the frame, out in the cooling air. That single choice does the work: it makes her a guardian on duty rather than a subject performing for us. You end up feeling watched-over, not watched. I drew her head more times than I can count. Early studies met the viewer's eyes and turned instantly aggressive, a challenge. Then I tried her looking down at the cub — instantly tender, too sweet, the other cliché. Only when the gaze lifted past everything, into the distance, did the room finally go still. That was the one.",
      comparisonImage: "/images/painting/tiger-family-quiet-hour/gaze-comparison.webp",
      closingLine: "One family. One light. One quiet.",
      closingSubline: "This is not a story about the tiger. It is a story about the choice to protect — and the courage to stay unseen.",
    },

    modules: [
      {
        type: 'color-decisions',
        title: "Lit by the Same Low Sun",
        icon: 'sun',
        layoutGroup: 'two-traps',
        content: {
          type: 'color-decisions',
          palette: [
            { color: "Burnt sienna and cadmium gold", role: "The long light before sunset", reasoning: "Laid into the mother's flank and the dry grass so the canvas seems lit by the same low sun that is about to leave the room." },
            { color: "Dusty teal in the shadows", role: "Atmospheric depth", reasoning: "A cool note held behind the cub so the warm body reads as the only thing still catching the light." },
            { color: "Raw umber and bone", role: "Grounding", reasoning: "The earth at the bottom edge, kept matte and quiet so the eye stays with the family and never drops to the floor." },
          ],
        },
        order: 3,
      },
      {
        type: 'hidden-symbolism',
        title: "A Body, Not a Barrier",
        icon: 'paw',
        layoutGroup: 'two-traps',
        content: {
          type: 'hidden-symbolism',
          symbols: [
            {
              element: "The mother's position, centred and forward",
              meaning: "She stands directly between the viewer and the cub. Not a barrier — a body. In the wild a tigress does exactly this: she is the wall the world has to pass through. The painting honours that quietly, without ever showing a threat.",
            },
            {
              element: "The cub tucked at her side",
              meaning: "The cub is half-hidden behind her leg, peering out. It is the oldest story of childhood — safety and the urge to step into the open, at once. The tension is the point; nothing in the frame resolves it.",
            },
          ],
        },
        order: 4,
      },
      {
        type: 'future-home',
        title: "The West Wall at Golden Hour",
        icon: 'frame',
        content: {
          type: 'future-home',
          imaginedContext: "I picture it on a west wall, where the real evening sun reaches it for the last hour of the day. Whoever lives there will be cooking, or reading, or just passing through, and the room will fill with the same gold that is on the canvas.",
          heroImage: "/images/painting/tiger-family-quiet-hour/future-home-hero.webp",
          pullQuote: "For that one hour the painting and the room become the same light.",
          potentialSettings: [
            { label: "A west-facing living room that catches the late sun", icon: 'sofa', image: "/images/painting/tiger-family-quiet-hour/setting-living-room.webp" },
            { label: "A quiet study or home library", icon: 'book', image: "/images/painting/tiger-family-quiet-hour/setting-study.webp" },
            { label: "A child's reading nook, where the cub finally makes sense", icon: 'star', image: "/images/painting/tiger-family-quiet-hour/setting-reading-nook.webp" },
          ],
        },
        order: 5,
      },
      {
        type: 'ideal-owner',
        title: "For the One Who Stops in Doorways",
        content: {
          type: 'ideal-owner',
          description: "This was painted for someone who already knows the strongest thing in a room can also be the calmest. Not a collector of drama. Someone who stops in doorways.",
          heroImage: "/images/painting/tiger-family-quiet-hour/ideal-owner-hero.webp",
          pullQuote: "Who feels the weight of a mother watching, and recognises it.",
          traits: [
            { label: "Notices light changing through a day", icon: 'sun' },
            { label: "Values family without needing it loud", icon: 'people' },
            { label: "Wants a painting that lowers the temperature of a room", icon: 'lotus' },
          ],
        },
        order: 6,
      },
      {
        type: 'light-interaction',
        title: "One Window of the Day",
        icon: 'clock',
        content: {
          type: 'light-interaction',
          description: "The whole palette was mixed for one window of the day. In the wrong light it is only a tiger; in the right light it warms and seems to breathe.",
          heroImage: "/images/painting/tiger-family-quiet-hour/light-hero.webp",
          timesOfDay: [
            { time: "4 PM", headline: "Flat, indirect light.", effect: "The golds sit quiet and almost editorial — you read it as a composition.", image: "/images/painting/tiger-family-quiet-hour/light-4pm.webp" },
            { time: "6 PM", headline: "The golden hour.", effect: "The mother's flank and the grass ignite; the painting finally matches the room's own warmth.", image: "/images/painting/tiger-family-quiet-hour/light-6pm.webp" },
            { time: "7 PM", headline: "Light gone, only lamp glow.", effect: "The teal shadows take over and she becomes a guardian in the dark — protective in the literal sense.", image: "/images/painting/tiger-family-quiet-hour/light-7pm.webp" },
          ],
          closingLine: "Three moments. Three moods. One painting that lives with light.",
        },
        order: 7,
      },
    ],

    signatureInteraction: {
      type: 'ambient-sound',
      data: {
        sounds: [
          { type: "wind", description: "Gentle wind through leaves", synth: 'wind' },
          { type: "birds", description: "Distant bird calls at sunset", synth: 'birds' },
          { type: "leaves", description: "Leaves rustling in evening breeze", synth: 'leaves' },
        ],
      },
    },

    founderVideo: { youtubeId: "qWM4X-1tibA", title: "Meenakshi on this painting" },

    inquiryMethod: "whatsapp",
  };

export default story;
