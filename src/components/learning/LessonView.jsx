import React from "react";
export default function LessonView({ module, lesson, onBack }) {
  const isQuiz = lesson.type === "quiz";
  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <button onClick={onBack} className="text-zinc-300 hover:underline">← Back</button>
      <h1 className="text-2xl font-black mt-2 text-white">{lesson.title}</h1>
      <div className="text-zinc-500 text-sm mb-2">{module?.title || ""} • {lesson.duration_min || 2} min</div>
      {!isQuiz ? (
        <div className="space-y-3">
          {(lesson.points||[]).map((p,i)=>(<div key={i} className="bg-zinc-900/70 border border-zinc-800 rounded-xl p-3 text-zinc-200">{p}</div>))}
          {lesson.task && (<div className="bg-zinc-900/70 border border-zinc-800 rounded-xl p-3"><div className="font-bold text-white">Task</div><div className="text-zinc-200 mt-1">{lesson.task}</div></div>)}
        </div>
      ) : (
        <div className="space-y-3">
          {(lesson.questions||[]).map((q,i) => (
            <div key={i} className="bg-zinc-900/70 border border-zinc-800 rounded-xl p-3">
              <div className="text-zinc-100 font-semibold mb-2">Q{i+1}. {q.q}</div>
              <div className="grid grid-cols-1 gap-2">
                {q.a.map((opt, idx) => (
                  <button key={idx} onClick={() => alert(idx === q.correctIndex ? 'Correct ✅' : 'Try again')} className="text-left bg-zinc-950 border border-zinc-800 rounded-lg p-2 hover:bg-zinc-900 text-zinc-200">{opt}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}