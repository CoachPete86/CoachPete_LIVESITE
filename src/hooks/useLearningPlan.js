import { LEARNING_JSON, MODULES } from "../data/jolene_learning_12wk";
export function useLearningPlan() {
  const listModules = () => MODULES.map(m => ({ id: m.id, title: m.title, summary: m.summary, estimated_total_min: m.estimated_total_min, lessons: m.lessons.map(l => ({ id: l.id, title: l.title, type: l.type, duration_min: l.duration_min || 2 })) }));
  const getModule = (moduleId) => MODULES.find(m => m.id === moduleId) || null;
  return { LEARNING_JSON, listModules, getModule, MODULES };
}