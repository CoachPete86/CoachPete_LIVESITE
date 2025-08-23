import React from "react";
import { useMealsPlan } from "../../hooks/useMealsPlan";
export default function MealsWeek({ weekNumber = 1, onSelectDay }) {
  const { getWeek } = useMealsPlan();
  const week = getWeek(weekNumber);
  if (!week) return <div className="p-4 text-red-400">Week {weekNumber} not found.</div>;
  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <h2 className="text-xl font-black mb-2 text-white">Meals — Week {weekNumber}</h2>
      <div className="grid grid-cols-2 gap-3">
        {week.days.map(d => (
          <button key={d.day} onClick={() => onSelectDay?.(d.day)} className="text-left bg-zinc-900/70 border border-zinc-800 rounded-xl p-3 hover:bg-zinc-900">
            <div className="text-sm text-zinc-400">{d.day}</div>
            <div className="font-bold text-zinc-100">{d.plan === "reset" ? "Reset" : d.plan === "balance" ? "Balance" : d.plan === "flex" ? "Flex" : "Boost"}</div>
          </button>
        ))}
      </div>
    </div>
  );
}