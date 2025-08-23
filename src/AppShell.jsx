import React, { useState } from "react";
import Dashboard from "./components/dashboard/Dashboard";
import WeekPlanner from "./components/walks/WeekPlanner";
import DayView from "./components/walks/DayView";
import MealsWeek from "./components/meals/MealsWeek";
import MealsDay from "./components/meals/MealsDay";
import MealDetail from "./components/meals/MealDetail";
import LearningLibrary from "./components/learning/LearningLibrary";
import ModuleView from "./components/learning/ModuleView";
import LessonView from "./components/learning/LessonView";

export default function AppShell() {
  const [screen, setScreen] = useState("dashboard");
  const [week] = useState(1);
  const [day, setDay] = useState("Mon");
  const [meal, setMeal] = useState(null);
  const [moduleId, setModuleId] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [module, setModule] = useState(null);

  // Walks
  if (screen === "walks-week") {
    return (
      <WeekPlanner
        weekNumber={week}
        onSelectDay={(d) => {
          setDay(d);
          setScreen("walks-day");
        }}
      />
    );
  }
  if (screen === "walks-day") {
    return (
      <DayView
        weekNumber={week}
        dayLabel={day}
        onBack={() => setScreen("walks-week")}
      />
    );
  }

  // Meals
  if (screen === "meals-week") {
    return (
      <MealsWeek
        weekNumber={week}
        onSelectDay={(d) => {
          setDay(d);
          setScreen("meals-day");
        }}
      />
    );
  }
  if (screen === "meals-day") {
    return (
      <MealsDay
        weekNumber={week}
        dayLabel={day}
        onBack={() => setScreen("meals-week")}
        onOpenMeal={(m) => {
          setMeal(m);
          setScreen("meal-detail");
        }}
      />
    );
  }
  if (screen === "meal-detail") {
    return <MealDetail meal={meal} onBack={() => setScreen("meals-day")} />;
  }

  // Learning
  if (screen === "learning-library") {
    return (
      <LearningLibrary
        onOpenModule={(id) => {
          setModuleId(id);
          setScreen("module-view");
        }}
      />
    );
  }
  if (screen === "module-view") {
    return (
      <ModuleView
        moduleId={moduleId}
        onBack={() => setScreen("learning-library")}
        onOpenLesson={(lesson, m) => {
          setLesson(lesson);
          setModule(m);
          setScreen("lesson-view");
        }}
      />
    );
  }
  if (screen === "lesson-view") {
    return (
      <LessonView
        lesson={lesson}
        module={module}
        onBack={() => setScreen("module-view")}
      />
    );
  }

  // Default Dashboard
  return (
    <Dashboard
      weekNumber={week}
      dayLabel={day}
      onOpenWalk={() => setScreen("walks-week")}
      onOpenMeals={() => setScreen("meals-week")}
      onOpenLearning={() => setScreen("learning-library")}
    />
  );
}

