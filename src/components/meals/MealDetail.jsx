import React from "react";
export default function MealDetail({ meal, onBack }) {
  if (!meal) return null;
  return (
    <div className="w-full max-w-xl mx-auto p-4">
      {onBack && <button onClick={onBack} className="text-zinc-300 hover:underline">← Back</button>}
      <h1 className="text-2xl font-black mt-2 text-white">{meal.name}</h1>
      <div className="text-zinc-400 mt-1">{meal.kcal} kcal • P{meal.P} C{meal.C} F{meal.F} • Fibre {meal.fibre}g • Salt {meal.salt}g</div>
      <section className="bg-zinc-900/70 border border-zinc-800 rounded-xl p-4 mt-4">
        <h2 className="font-bold text-white text-lg">Ingredients</h2>
        <ul className="list-disc pl-6 text-sm text-zinc-300 mt-1 space-y-1">{meal.ingredients.map((ing,i)=><li key={i}>{ing}</li>)}</ul>
      </section>
      <section className="bg-zinc-900/70 border border-zinc-800 rounded-xl p-4 mt-4">
        <h2 className="font-bold text-white text-lg">Method</h2>
        <ol className="list-decimal pl-6 text-sm text-zinc-300 mt-1 space-y-1">{meal.method.map((m,i)=><li key={i}>{m}</li>)}</ol>
      </section>
    </div>
  );
}