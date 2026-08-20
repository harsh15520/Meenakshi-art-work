import { JournalStatus } from "@/data/journal";

interface JournalStatusBadgeProps {
  status: JournalStatus;
  className?: string;
}

export default function JournalStatusBadge({ status, className = "" }: JournalStatusBadgeProps) {
  if (status === "evergreen") return null;

  const baseClass = "journal-status-badge";
  const statusClass = `${baseClass}--${status}`;

  const label = {
    active: "Active",
    completed: "Completed",
  }[status];

  return <span className={`${baseClass} ${statusClass} ${className}`.trim()}>{label}</span>;
}
