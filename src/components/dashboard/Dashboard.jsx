import React, { useMemo } from "react";
import { useWalkPlan } from "../../hooks/useWalkPlan";
import { useMealsPlan } from "../../hooks/useMealsPlan";
import { useLearningPlan } from "../../hooks/useLearningPlan";

export default function Dashboard({ weekNumber = 1, dayLabel = "Mon", onOpenWalk, onOpenMeals, onOpenLearning }) {
  const { getPlannedWalk, getWeek: getWalkWeek } = useWalkPlan();
  const { getDayMeals } = useMealsPlan();
  const { MODULES } = useLearningPlan();

  const walk = getPlannedWalk(weekNumber, dayLabel);
  const meals = getDayMeals(weekNumber, dayLabel);
  const lesson = MODULES[0]?.lessons?.[0];
  const moduleObj = MODULES[0];

  const weeklyTargetMiles = useMemo(() => {
    const w = getWalkWeek(weekNumber);
    if (!w) return 0;
    return w.days.reduce((sum, d) => sum + (d.targetMiles || 0), 0);
  }, [weekNumber, getWalkWeek]);

  return (
    <div className="w-full max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-black text-white">Dashboard</h1>
      <div className="text-zinc-400">Mock Today: Week {weekNumber}, {dayLabel}</div>

      <section className="bg-zinc-900/70 border border-zinc-800 rounded-xl p-4">
        <h2 className="font-bold text-white text-lg mb-2">Today</h2>
        {walk && (
          <div className="mb-3">
            <div className="text-zinc-300 text-sm">Walk</div>
            <div className="font-semibold text-zinc-100">{walk.route.name}</div>
            <div className="text-xs text-zinc-400">Target {walk.targetMiles} mi • Planned {walk.route.miles} mi</div>
            <div className="flex gap-2 mt-2">
              <a className="flex-1 text-center rounded-lg px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold" href={walk.route.appleMapsUrl}>Open in Maps</a>
              <button onClick={() => onOpenWalk?.()} className="rounded-lg px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-bold">View</button>
            </div>
          </div>
        )}
        {meals && (
          <div className="mb-3">
            <div className="text-zinc-300 text-sm">Meals</div>
            <div className="font-semibold text-zinc-100">{meals.plan.label}</div>
            <div className="text-xs text-zinc-400">Today’s menu: {meals.recipes.map(r => r.name).join(" • ")}</div>
            <div className="mt-2">
              <button onClick={() => onOpenMeals?.()} className="rounded-lg px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-bold">Open Meals</button>
            </div>
          </div>
        )}
        {lesson && moduleObj && (
          <div className="mb-1">
            <div className="text-zinc-300 text-sm">Learning</div>
            <div className="font-semibold text-zinc-100">{moduleObj.title}</div>
            <div className="text-xs text-zinc-400">Next: {lesson.title} • {lesson.duration_min} min</div>
            <div className="mt-2">
              <button onClick={() => onOpenLearning?.()} className="rounded-lg px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-bold">Start</button>
            </div>
          </div>
        )}
      </section>

      <section className="bg-zinc-900/70 border border-zinc-800 rounded-xl p-4">
        <h2 className="font-bold text-white text-lg mb-2">This Week</h2>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-zinc-300">Walks — Target miles</div>
            <div className="text-zinc-100 font-semibold">{weeklyTargetMiles.toFixed(1)} mi</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-zinc-300">Meals — Planned</div>
            <div className="text-zinc-100 font-semibold">7 days</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-zinc-300">Learning — Lessons</div>
            <div className="text-zinc-100 font-semibold">{MODULES.reduce((a,m)=>a+m.lessons.length,0)} total</div>
          </div>
        </div>
      </section>
    </div>
  );
}