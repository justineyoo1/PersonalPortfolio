interface LeetCodeCalendarProps {
  submissionCalendar: Record<string, number>;
  isDark?: boolean;
  viewMode?: "year" | "month";
}

const LeetCodeCalendar = ({
  submissionCalendar,
  isDark = true,
  viewMode = "year",
}: LeetCodeCalendarProps) => {
  const now = Date.now();
  const days = viewMode === "month" ? 30 : 120;
  const msPerDay = 24 * 60 * 60 * 1000;

  const points = Array.from({ length: days }, (_, i) => {
    const dayTs = now - (days - 1 - i) * msPerDay;
    const key = String(Math.floor(dayTs / 1000));
    return submissionCalendar[key] ?? 0;
  });

  const maxCount = Math.max(1, ...points);

  const getCellClass = (count: number) => {
    if (count === 0) return isDark ? "bg-gray-800" : "bg-gray-200";
    const ratio = count / maxCount;
    if (ratio < 0.34) return "bg-emerald-300/50";
    if (ratio < 0.67) return "bg-emerald-400/70";
    return "bg-emerald-500";
  };

  return (
    <div className="mt-3 w-full px-4">
      <div className="grid grid-cols-30 gap-1">
        {points.map((count, index) => (
          <div
            key={`lc-cell-${index}`}
            className={`h-2 w-2 rounded-sm ${getCellClass(count)}`}
            title={`${count} submissions`}
          />
        ))}
      </div>
    </div>
  );
};

export default LeetCodeCalendar;
