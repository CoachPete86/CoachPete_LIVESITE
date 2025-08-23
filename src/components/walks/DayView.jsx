import React from "react";
import { useWalkPlan } from "../../hooks/useWalkPlan";
export default function DayView({ weekNumber = 1, dayLabel = "Mon", onBack }) {
  const { getPlannedWalk } = useWalkPlan();
  const planned = getPlannedWalk(weekNumber, dayLabel);
  if (!planned) return null;
  const { targetMiles, route } = planned;
  return (
    <div className="w-full max-w-xl mx-auto p-4">
      {onBack && <button onClick={onBack} className="text-zinc-300 hover:underline">← Back</button>}
      <h1 className="text-2xl font-black mt-2 text-white">{dayLabel} — {route.name}</h1>
      <p className="text-zinc-400 mb-3">Target: <span className="font-semibold text-zinc-200">{targetMiles} miles</span> • Planned: <span className="text-zinc-200">{route.miles} mi</span></p>
      <section className="bg-zinc-900/70 border border-zinc-800 rounded-xl p-4 mb-4">
        <p className="text-sm text-zinc-400">Start: <span className="text-zinc-200">{route.start.name}</span></p>
        <img className="w-full rounded-lg mt-3" alt={`${route.name} preview`} src={`https://maps.apple.com/api/staticmap?center=${route.start.lat},${route.start.lng}&z=15&lang=en-GB&scale=2&size=640x360&annotations=point:${route.start.lat},${route.start.lng}:Start`} />
        <div className="flex flex-col sm:flex-row gap-2 mt-3">
          <a className="flex-1 text-center rounded-lg px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold" href={route.appleMapsUrl}>Open in Apple Maps</a>
        </div>
      </section>
    </div>
  );
}