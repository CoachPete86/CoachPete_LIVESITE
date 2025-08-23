import React from "react";
import { useWalkPlan } from "../../hooks/useWalkPlan";

export default function WeekPlanner({ weekNumber = 1, onSelectDay, onBack }) {
  const { getWeek, dayLabels, getPlannedWalk } = useWalkPlan();
  const week = getWeek(weekNumber);
  if (!week) {
    return <div className="p-4 text-red-400">Week {weekNumber} not found.</div>;
  }

  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-black text-white">Walks - Week {weekNumber}</h2>
        {onBack && (
          <button
            onClick={onBack}
            className="text-sm px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 hover:bg-zinc-800"
          >
            ? Back
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {dayLabels.map((d) => {
          const planned = getPlannedWalk(weekNumber, d);
          const label = (planned && planned.route && planned.route.name) ? planned.route.name : "-";
          const miles =
            (planned && planned.route && planned.route.miles) != null
              ? planned.route.miles
              : (planned && planned.targetMiles) != null
              ? planned.targetMiles
              : "-";
          return (
            <button
              key={d}
              onClick={() => onSelectDay && onSelectDay(d)}
              className="text-left bg-zinc-900/70 border border-zinc-800 rounded-xl p-3 hover:bg-zinc-900"
            >
              <div className="text-sm text-zinc-400">{d}</div>
              <div className="font-bold text-zinc-100">{label}</div>
              <div className="text-xs text-zinc-400 mt-1">~{miles} mi</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
