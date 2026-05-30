import React, { useMemo } from "react";
import Tooltip from "./Tooltip";

type Props = {
  submissionCalendar: Record<string, number>;
  isDark?: boolean;
  weeks?: number;
  cell?: number;
  gap?: number;
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function level(count: number): number {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

const DARK = ["#1b2230", "#0e4429", "#006d32", "#26a641", "#39d353"];
const LIGHT = ["#EBEDF0", "#9BE9A8", "#40C463", "#30A14E", "#216E39"];

const keyFor = (d: Date) =>
  `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

const ContribHeatmap: React.FC<Props> = ({
  submissionCalendar,
  isDark = true,
  weeks = 20,
  cell = 12,
  gap = 3,
}) => {
  const palette = isDark ? DARK : LIGHT;

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    for (const [ts, c] of Object.entries(submissionCalendar || {})) {
      const d = new Date(parseInt(ts) * 1000);
      // LeetCode timestamps are UTC day boundaries
      const local = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
      const k = keyFor(local);
      m.set(k, (m.get(k) || 0) + (Number(c) || 0));
    }
    return m;
  }, [submissionCalendar]);

  const { columns, monthLabels, today } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // End on Saturday of the current week so columns are whole weeks.
    const end = new Date(today);
    end.setDate(today.getDate() + (6 - today.getDay()));
    const start = new Date(end);
    start.setDate(end.getDate() - (weeks * 7 - 1));

    const columns: Date[][] = [];
    const cur = new Date(start);
    for (let w = 0; w < weeks; w++) {
      const col: Date[] = [];
      for (let d = 0; d < 7; d++) {
        col.push(new Date(cur));
        cur.setDate(cur.getDate() + 1);
      }
      columns.push(col);
    }

    // Month label appears on the first column whose first day starts a new month.
    const monthLabels: { col: number; label: string }[] = [];
    let prevMonth = -1;
    columns.forEach((col, i) => {
      const m = col[0].getMonth();
      if (m !== prevMonth) {
        monthLabels.push({ col: i, label: MONTHS[m] });
        prevMonth = m;
      }
    });

    return { columns, monthLabels, today };
  }, [weeks]);

  const colWidth = cell + gap;

  return (
    <div className="inline-flex flex-col">
      {/* month labels */}
      <div className="relative" style={{ height: 14, marginLeft: 0 }}>
        {monthLabels.map(({ col, label }) => (
          <span
            key={`${col}-${label}`}
            className={isDark ? "absolute text-[10px] text-gray-500" : "absolute text-[10px] text-[#86868B]"}
            style={{ left: col * colWidth }}
          >
            {label}
          </span>
        ))}
      </div>

      <div className="flex" style={{ gap }}>
        {columns.map((col, ci) => (
          <div key={ci} className="flex flex-col" style={{ gap }}>
            {col.map((day, di) => {
              const future = day.getTime() > today.getTime();
              const count = counts.get(keyFor(day)) || 0;
              const bg = future ? "transparent" : palette[level(count)];
              return (
                <Tooltip
                  key={di}
                  text={
                    future
                      ? ""
                      : `${count} submission${count === 1 ? "" : "s"} · ${day.toLocaleDateString()}`
                  }
                >
                  <div
                    style={{
                      width: cell,
                      height: cell,
                      borderRadius: Math.max(2, Math.round(cell / 5)),
                      backgroundColor: bg,
                      outline: future
                        ? "none"
                        : isDark
                          ? "1px solid rgba(255,255,255,0.03)"
                          : "1px solid rgba(0,0,0,0.04)",
                      outlineOffset: -1,
                    }}
                  />
                </Tooltip>
              );
            })}
          </div>
        ))}
      </div>

      {/* legend */}
      <div
        className={`flex items-center gap-1 mt-2 text-[10px] ${isDark ? "text-gray-500" : "text-[#86868B]"}`}
      >
        <span>less</span>
        {palette.map((c, i) => (
          <span
            key={i}
            style={{
              width: cell - 2,
              height: cell - 2,
              borderRadius: 2,
              backgroundColor: c,
              display: "inline-block",
            }}
          />
        ))}
        <span>more</span>
      </div>
    </div>
  );
};

export default ContribHeatmap;
