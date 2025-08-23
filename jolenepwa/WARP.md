# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Jolene PWA is a React-based Progressive Web Application for health coaching, featuring walks, meals, and learning modules. Built with React 18, Tailwind CSS v3, and designed for mobile-first experience with offline capabilities.

## Development Commands

### Essential Commands
```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Test the built PWA locally
npx serve -s build

# Run tests (if available)
npm test
```

### Single Component Development
To work on individual components, navigate directly in the browser after `npm start`:
- Dashboard: `http://localhost:3000` (default)
- Walks: Accessible via dashboard navigation
- Meals: Accessible via dashboard navigation  
- Learning: Accessible via dashboard navigation

## Architecture Overview

### Application Structure
The app uses a single-page application architecture with client-side routing managed by state:

1. **AppShell.jsx** - Central navigation controller that manages all screen transitions using React state
2. **App.jsx** - Root component that renders AppShell
3. **Dashboard.jsx** - Main landing screen showing daily summary and weekly overview

### Screen Navigation Pattern
Navigation is handled through a state-based routing system in AppShell:
- `screen` state determines which component to render
- Each major section (walks, meals, learning) has multiple sub-screens
- Navigation flows: Dashboard → Section Week View → Day View → Detail View

### Component Organization
```
src/components/
├── dashboard/Dashboard.jsx     # Main dashboard with today's summary
├── walks/
│   ├── WeekPlanner.jsx        # Weekly walk planning view
│   └── DayView.jsx            # Daily walk details
├── meals/
│   ├── MealsWeek.jsx          # Weekly meal planning
│   ├── MealsDay.jsx           # Daily meal overview
│   └── MealDetail.jsx         # Individual meal details
└── learning/
    ├── LearningLibrary.jsx    # Module library overview
    ├── ModuleView.jsx         # Individual module details
    └── LessonView.jsx         # Lesson content viewer
```

### Data Management
Uses custom React hooks for data access:
- **useWalkPlan()** - Manages walking routes, weekly targets, and progress
- **useMealsPlan()** - Handles meal planning, recipes, and daily menus
- **useLearningPlan()** - Manages learning modules and lesson content

Data is stored in static JSON files under `src/data/`:
- `jolene_walks_12wk.js` - 12-week walking program data
- `jolene_meals_12wk.js` - Meal plans and recipes
- `jolene_learning_12wk.js` - Learning modules and lessons

### PWA Implementation
- **Service Worker**: `public/sw.js` provides offline functionality with cache-first strategy for static assets
- **Web App Manifest**: `public/manifest.webmanifest` configures installable app behavior
- **Registration**: Service worker registered in `src/index.js` with custom scope `/jolene/`

### Styling Architecture
- **Tailwind CSS v3** for utility-first styling
- **Dark Theme**: Uses zinc color palette with dark backgrounds
- **Mobile-First**: Responsive design optimized for mobile devices
- **Component Styling**: Inline Tailwind classes with consistent design system

## Key Development Patterns

### State Management
- Uses React useState for local component state
- Props drilling for data sharing between parent/child components
- Custom hooks abstract data access logic from static JSON files

### Navigation Pattern
The AppShell component uses conditional rendering based on screen state:
```javascript
if (screen === "walks-week") return <WeekPlanner />;
if (screen === "walks-day") return <DayView />;
// etc.
```

### Data Hook Pattern
Each domain (walks, meals, learning) has a dedicated hook:
```javascript
const { getPlannedWalk, getWeek } = useWalkPlan();
const { getDayMeals } = useMealsPlan();
const { MODULES } = useLearningPlan();
```

### Component Props Pattern
Components receive navigation callbacks and data identifiers:
```javascript
<Dashboard 
  weekNumber={week}
  dayLabel={day}
  onOpenWalk={() => setScreen("walks-week")}
  onOpenMeals={() => setScreen("meals-week")}
/>
```

## Deployment Configuration

- **Homepage**: Configured for deployment to `https://www.coachpeteryan.com/jolene`
- **Service Worker Scope**: Set to `/jolene/` for subdirectory deployment
- **Build Output**: Standard Create React App build process outputs to `build/` directory
