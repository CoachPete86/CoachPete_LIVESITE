import React from "react";
import { useMealsPlan } from "../../hooks/useMealsPlan";
export default function MealsDay({ weekNumber = 1, dayLabel = "Mon", onBack, onOpenMeal }) {
  const { getDayMeals } = useMealsPlan();
  const res = getDayMeals(weekNumber, dayLabel);
  if (!res) return null;
  const { plan, recipes } = res;
  return (
    <div className="w-full max-w-xl mx-auto p-4">
      {onBack && <button onClick={onBack} className="text-zinc-300 hover:underline">← Back</button>}
      <h1 className="text-2xl font-black mt-2 text-white">{dayLabel} — {plan.label}</h1>
      <div className="text-sm text-zinc-300">Daily target: {plan.daily_target.kcal} kcal • P{plan.daily_target.P} C{plan.daily_target.C} F{plan.daily_target.F}</div>
      <div className="mt-3 space-y-3">
        {recipes.map(r => (
          <button key={r.id} onClick={() => onOpenMeal?.(r)} className="w-full text-left bg-zinc-900/70 border border-zinc-800 rounded-xl p-3 hover:bg-zinc-900">
            <div className="font-bold text-zinc-100">{r.name}</div>
            <div className="text-xs text-zinc-400 mt-1">{r.kcal} kcal • P{r.P} C{r.C} F{r.F}</div>
          </button>
        ))}
      </div>
    </div>
  );
}