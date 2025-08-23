import React from "react";
import { useLearningPlan } from "../../hooks/useLearningPlan";
export default function LearningLibrary({ onOpenModule }) {
  const { listModules } = useLearningPlan();
  const modules = listModules();
  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <h2 className="text-xl font-black mb-2 text-white">Learning</h2>
      <div className="space-y-3">
        {modules.map(m => (
          <button key={m.id} onClick={() => onOpenModule?.(m.id)} className="w-full text-left bg-zinc-900/70 border border-zinc-800 rounded-xl p-3 hover:bg-zinc-900">
            <div className="font-bold text-zinc-100">{m.title}</div>
            <div className="text-xs text-zinc-400">{m.summary}</div>
          </button>
        ))}
      </div>
    </div>
  );
}