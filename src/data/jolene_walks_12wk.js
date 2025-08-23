export const PLAN_JSON = { meta:{defaults:{steps_per_mile:2100}}};
export const STEPS_PER_MILE = 2100;
export const ROUTE_LIBRARY = {
  "regents_canal_loop": { id:"regents_canal_loop", name:"Regent's Canal Loop", miles:4.0,
    start:{name:"Gaisford St, Kentish Town", lat:51.551, lng:-0.140},
    appleMapsUrl:"https://maps.apple.com/?q=Regents+Canal&ll=51.539,-0.144" }
};
export const WEEKLY_SCHEDULE = [{ week:1, days:[
  {day:"Mon", targetMiles:4, routeId:"regents_canal_loop"},
  {day:"Tue", targetMiles:5, routeId:"regents_canal_loop"},
  {day:"Wed", targetMiles:6, routeId:"regents_canal_loop"},
  {day:"Thu", targetMiles:4, routeId:"regents_canal_loop"},
  {day:"Fri", targetMiles:6, routeId:"regents_canal_loop"},
  {day:"Sat", targetMiles:7, routeId:"regents_canal_loop"},
  {day:"Sun", targetMiles:5, routeId:"regents_canal_loop"} ]}];
