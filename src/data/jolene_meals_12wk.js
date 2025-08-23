export const MEALS_PLAN_JSON = { weeks:[{week:1, days:[
  {day:"Mon", plan:"reset"},{day:"Tue", plan:"balance"},{day:"Wed", plan:"reset"},
  {day:"Thu", plan:"balance"},{day:"Fri", plan:"flex"},{day:"Sat", plan:"boost"},{day:"Sun", plan:"flex"}
]}]};
export const MEAL_DAY_TO_PLAN = { Mon:"reset", Tue:"balance", Wed:"reset", Thu:"balance", Fri:"flex", Sat:"boost", Sun:"flex" };
export const MEAL_PLANS = {
  reset:{ label:"Reset", daily_target:{kcal:1600,P:120,C:150,F:50}, default_day:["bfast","lunch","dinner"],
    recipes:[
      {id:"bfast", name:"Greek Yogurt Bowl", kcal:350, P:35, C:30, F:10, fibre:6, salt:0.5, tags:["garlic_onion_free"],
        ingredients:["0% Greek yogurt","berries","granola","honey"], method:["Mix and serve"]},
      {id:"lunch", name:"Chicken Salad", kcal:500, P:45, C:35, F:18, fibre:7, salt:1.2, tags:["garlic_onion_free"],
        ingredients:["Chicken breast","leaves","tomato","olive oil"], method:["Cook chicken","Assemble salad"]},
      {id:"dinner", name:"Salmon & Rice", kcal:650, P:45, C:60, F:20, fibre:5, salt:0.8, tags:["garlic_onion_free"],
        ingredients:["Salmon","rice","broccoli","lemon"], method:["Bake salmon","Steam broccoli","Cook rice"]}
    ]},
  balance:{ label:"Balance", daily_target:{kcal:1800,P:130,C:180,F:55}, default_day:["bfast","lunch","dinner"], recipes:[]},
  flex:{ label:"Flex", daily_target:{kcal:1900,P:130,C:200,F:60}, default_day:["bfast","lunch","dinner"], recipes:[]},
  boost:{ label:"Boost", daily_target:{kcal:2100,P:140,C:230,F:65}, default_day:["bfast","lunch","dinner"], recipes:[]}
};
export const MEAL_WEEKS = MEALS_PLAN_JSON.weeks;
