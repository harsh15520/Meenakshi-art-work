// Maps each academy phase (zero-padded num) to its YouTube Short.
// youtubeId may be an 11-char ID or a full YouTube URL (the component parses it).
// Mirrors the curriculumSlides / curriculumReports map pattern.
export type PhaseVideo = {
  youtubeId: string;
  title: string;
};

export const curriculumVideos: Record<string, PhaseVideo> = {
  "01": { youtubeId: "ITv9PzDDcW0", title: "Hand Control — phase short" },
  "02": { youtubeId: "bkelNuhM6K8", title: "Proportions — phase short" },
  "03": { youtubeId: "qKxTS4aAbTg", title: "Acrylic Techniques — phase short" },
  "04": { youtubeId: "BlVxzLQ10YI", title: "Oil Painting Basics — phase short" },
  "05": { youtubeId: "qgMSNKoTYx0", title: "Signature Style — phase short" },
};

// TODO: confirm exact channel handle/URL with the studio and replace this placeholder.
export const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@MeenakshiArtWork";
