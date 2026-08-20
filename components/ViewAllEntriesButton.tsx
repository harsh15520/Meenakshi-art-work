"use client";

export default function ViewAllEntriesButton() {
  const handleClick = () => {
    const el = document.getElementById("all-entries");
    el?.classList.remove("journal-all-entries--collapsed");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <button type="button" className="button-outline journal-view-all-button" onClick={handleClick}>
      View All Entries
    </button>
  );
}
