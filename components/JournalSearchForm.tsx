import { ReadonlyURLSearchParams } from "next/navigation";

interface JournalSearchFormProps {
  searchParams: ReadonlyURLSearchParams;
  className?: string;
  compact?: boolean;
}

export default function JournalSearchForm({ searchParams, className = "", compact = false }: JournalSearchFormProps) {
  const currentQ = searchParams.get("q") || "";

  return (
    <form method="GET" action="/journal" className={`journal-search-bar ${className}`.trim()}>
      <input
        type="text"
        name="q"
        placeholder={compact ? "Search..." : "Search stories, tags, people..."}
        defaultValue={currentQ}
        className="journal-search-input"
      />
      <button type="submit" className="button-outline journal-search-button">
        {compact ? "Go" : "Search"}
      </button>
    </form>
  );
}
