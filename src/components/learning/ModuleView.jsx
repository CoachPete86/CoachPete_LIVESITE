import React from "react";
import { useLearningPlan } from "../../hooks/useLearningPlan";
export default function ModuleView({ moduleId, onBack, onOpenLesson }) {
  const { getModule } = useLearningPlan();
  const m = getModule(moduleId);
  if (!m) return null;
  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <button onClick={onBack} className="text-zinc-300 hover:underline">← Back</button>
      <h1 className="text-2xl font-black mt-2 text-white">{m.title}</h1>
      <p className="text-zinc-400">{m.summary}</p>
      <div className="mt-3 space-y-3">
        {m.lessons.map(lesson => (
          <button key={lesson.id} onClick={() => onOpenLesson?.(lesson, m)} className="w-full text-left bg-zinc-900/70 border border-zinc-800 rounded-xl p-3 hover:bg-zinc-900">
            <div className="font-bold text-zinc-100">{lesson.title}</div>
            <div className="text-xs text-zinc-400">{lesson.type.toUpperCase()} • {lesson.duration_min} min</div>
          </button>
        ))}
      </div>
    </div>
  );
}