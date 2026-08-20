const PALETTE = ["var(--wine)", "var(--gold)", "#8a5a34", "#583a35", "#a06840", "#976238"];

function colorForName(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return PALETTE[Math.abs(hash) % PALETTE.length];
}

function initialsForName(name: string) {
  const words = name.replace(/[()]/g, "").split(" ").filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

export default function JournalAvatar({ name, size = 36 }: { name: string; size?: number }) {
  return (
    <span
      className="journal-avatar"
      style={{ width: size, height: size, fontSize: size * 0.38, background: colorForName(name) }}
    >
      {initialsForName(name)}
    </span>
  );
}
