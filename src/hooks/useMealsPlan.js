import { MEALS_PLAN_JSON, MEAL_PLANS, MEAL_WEEKS, MEAL_DAY_TO_PLAN } from "../data/jolene_meals_12wk";
export function useMealsPlan() {
  const getWeek = (weekNumber) => MEAL_WEEKS.find(w => Number(w.week) === Number(weekNumber)) || null;
  const getDayPlanKey = (dayLabel) => MEAL_DAY_TO_PLAN[dayLabel];
  const getPlan = (planKey) => MEAL_PLANS[planKey] || null;
  const getDayMeals = (weekNumber, dayLabel) => {
    const planKey = getDayPlanKey(dayLabel);
    const plan = getPlan(planKey);
    if (!plan) return null;
    const recipes = (plan.default_day||[]).map(id => (plan.recipes||[]).find(r => r.id === id)).filter(Boolean);
    return { planKey, plan, recipes };
  };
  return { getWeek, getDayPlanKey, getPlan, getDayMeals, MEALS_PLAN_JSON };
}