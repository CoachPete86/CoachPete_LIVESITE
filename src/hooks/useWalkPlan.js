import { PLAN_JSON, ROUTE_LIBRARY, WEEKLY_SCHEDULE, STEPS_PER_MILE } from "../data/jolene_walks_12wk";
export function useWalkPlan() {
  const getWeek = (weekNumber) => WEEKLY_SCHEDULE.find(w => Number(w.week) === Number(weekNumber)) || null;
  const getDayEntry = (weekNumber, dayLabel) => (getWeek(weekNumber)?.days||[]).find(d => d.day === dayLabel) || null;
  const getRoute = (routeId) => ROUTE_LIBRARY[routeId] || null;
  const getPlannedWalk = (weekNumber, dayLabel) => {
    const entry = getDayEntry(weekNumber, dayLabel);
    const route = entry ? getRoute(entry.routeId) : null;
    return entry && route ? { ...entry, route } : null;
  };
  const stepsToMiles = (steps) => (steps / (PLAN_JSON?.meta?.defaults?.steps_per_mile || STEPS_PER_MILE));
  const milesToSteps = (miles) => Math.round(miles * (PLAN_JSON?.meta?.defaults?.steps_per_mile || STEPS_PER_MILE));
  const dayLabels = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  return { PLAN_JSON, ROUTE_LIBRARY, WEEKLY_SCHEDULE, dayLabels, getWeek, getDayEntry, getRoute, getPlannedWalk, stepsToMiles, milesToSteps, STEPS_PER_MILE };
}