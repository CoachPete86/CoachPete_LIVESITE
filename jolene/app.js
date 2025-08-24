// Enhanced Jolene 12-Week Meal Plan App with Learning & Walking Integration
class EnhancedMealPlanApp {
constructor() {
this.currentWeek = 1;
this.currentDay = 1; // 1-7 for Monday-Sunday
this.searchQuery = '';
// Week rotation pattern
this.weekRotation = {
1: 'A', 2: 'B', 3: 'A', 4: 'B', 5: 'C', 6: 'A',
7: 'B', 8: 'C', 9: 'A', 10: 'B', 11: 'C', 12: 'B'
};
// Mini-block schedule within each week
this.miniBlockSchedule = {
1: 'A', 2: 'B', 3: 'A', 4: 'B', 5: 'C', 6: 'C', 7: 'Free'
};
this.dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
'Saturday', 'Sunday'];
// Learning curriculum - 14 modules rotating
this.learningModules = {
"M1": {
title: "Eatwell Basics & Portions",
focus: "Build balanced plates (Â½ veg, Â¼ protein, Â¼
wholegrains)",
content: "The Eatwell Guide shows how to build balanced plates
for optimal nutrition. Aim for half your plate to be vegetables and fruits, one
quarter lean protein, and one quarter wholegrains or starchy carbs.",
activity: "Practice plate building with today's meals - take a
photo of your lunch plate showing the ideal proportions",
quiz: [
{q: "What proportion of your plate should be vegetables and
fruits?", options: ["Â¼", "â…“", "Â½", "Â¾"], correct: 2},
{q: "Which food group should make up Â¼ of your plate?",
options: ["Vegetables", "Fruits", "Protein", "Dairy"], correct: 2},
{q: "Wholegrains should occupy what portion of your plate?",
options: ["â…›", "Â¼", "â…“", "Â½"], correct: 1},
{q: "The Eatwell Guide helps with:", options: ["Calorie
counting", "Balanced nutrition", "Weight loss only", "Food shopping"], correct:
1},
{q: "A balanced plate provides:", options: ["Quick energy
only", "Complete nutrition", "Protein only", "Vitamins only"], correct: 1}
]
},
"M2": {
title: "Protein After 70",
focus: "Target 1.0-1.2g/kg body weight; 25-35g per meal",
content: "Protein needs increase with age to maintain muscle mass
and strength. Adults over 70 should aim for 1.0-1.2g protein per kg body weight
daily, with 25-35g per main meal for optimal muscle protein synthesis.",
activity: "Calculate your personal daily protein target (your
weight in kg Ã— 1.1) and track protein intake for today's three main meals",
quiz: [
{q: "Protein needs after 70 compared to younger adults are:",
options: ["Much lower", "The same", "Higher", "Not important"], correct: 2},
{q: "Target protein per kg body weight after 70:", options:
["0.6-0.8g", "0.8-1.0g", "1.0-1.2g", "1.4-1.6g"], correct: 2},
{q: "Protein per main meal should be:", options: ["15-20g",
"20-25g", "25-35g", "40-45g"], correct: 2},
{q: "High-quality protein sources include:", options: ["Bread
and pasta", "Fish and eggs", "Fruits and vegetables", "Oils and nuts"], correct:
1},
{q: "Adequate protein helps maintain:", options: ["Blood
sugar only", "Muscle mass and strength", "Bone density only", "Heart rate"],
correct: 1}
]
},
"M3": {
title: "Fibre & Gut Health",
focus: "30g daily from mixed sources with adequate fluids",
content: "Aim for 30g fibre daily from varied sources including
both soluble (oats, beans, apples) and insoluble (wholegrains, vegetables)
fibres. Increase fluid intake when boosting fibre to support healthy digestion
and gut microbiome.",
activity: "Identify all fibre sources in today's meals and
estimate your total fibre intake using food labels or apps",
quiz: [
{q: "Daily fibre target for adults:", options: ["15g", "20g",
"25g", "30g"], correct: 3},
{q: "Soluble fibre is particularly found in:", options:
["Wheat bran", "Oats and beans", "Nuts only", "Meat and fish"], correct: 1},
{q: "When increasing fibre intake, you should also:",
options: ["Reduce protein", "Increase fluid intake", "Avoid exercise", "Skip
breakfast"], correct: 1},
{q: "Fibre supports:", options: ["Muscle building only",
"Digestive and heart health", "Vitamin absorption only", "Bone strength only"],
correct: 1},
{q: "Good fibre sources include:", options: ["White bread",
"Processed meats", "Fruits and vegetables", "Sugary drinks"], correct: 2}
]
},
"M4": {
title: "Healthy Fats",
focus: "EVOO, nuts/seeds, oily fish for heart and brain health",
content: "Focus on healthy fats from extra virgin olive oil,
nuts, seeds, avocados and oily fish. These provide essential fatty acids and fat-
soluble vitamins while supporting heart health and cognitive function.",
activity: "Identify all fat sources in today's meals and classify
them as saturated, monounsaturated, or polyunsaturated",
quiz: [
{q: "The healthiest cooking oil for everyday use is:",
options: ["Coconut oil", "Extra virgin olive oil", "Vegetable oil", "Butter"],
correct: 1},
{q: "Omega-3 fatty acids are found in:", options: ["Chicken",
"Oily fish", "White bread", "Pasta"], correct: 1},
{q: "Nuts and seeds provide:", options: ["Protein only",
"Healthy fats and protein", "Carbs only", "No nutrients"], correct: 1},
{q: "Saturated fats should be:", options: ["Avoided
completely", "Limited", "Increased", "The main fat source"], correct: 1},
{q: "Avocados are rich in:", options: ["Saturated fat",
"Trans fat", "Monounsaturated fat", "No fat"], correct: 2}
]
},
"M5": {
title: "Hydration",
focus: "6-8 mugs daily; more if hot or active",
content: "Aim for 6-8 mugs (1.5-2L) of fluid daily from water,
herbal teas, and other drinks. Increase intake during hot weather, illness, or
physical activity. Proper hydration supports kidney function, temperature
regulation, and nutrient transport.",
activity: "Track your fluid intake today using mugs/glasses as
measures - aim for your target based on activity level",
quiz: [
{q: "Daily fluid target for most adults is:", options: ["4-5
mugs", "6-8 mugs", "10-12 mugs", "2-3 mugs"], correct: 1},
{q: "You need extra fluids when:", options: ["Sitting all
day", "Hot weather or exercise", "Feeling cold", "Sleeping"], correct: 1},
{q: "Good hydration sources include:", options: ["Alcohol
only", "Water and herbal teas", "Sugary drinks only", "Coffee only"], correct:
1},
{q: "Signs of good hydration include:", options: ["Dark
yellow urine", "Pale yellow urine", "No urination", "Constant thirst"], correct:
1},
{q: "Dehydration can affect:", options: ["Energy levels",
"Kidney function", "Temperature regulation", "All of the above"], correct: 3}
]
},
"M6": {
title: "Key Micronutrients (70+)",
focus: "Vitamin D, calcium, B12 - critical for bone and brain
health",
content: "Adults over 70 need extra attention to vitamin D (10-
15Î¼g daily), calcium (1200mg), and B12 (2.4Î¼g). These support bone health,
immune function, and cognitive health. Consider supplements if dietary intake is
insufficient.",
activity: "Review today's meals for vitamin D, calcium, and B12
sources - identify any gaps that might need supplementation",
quiz: [
{q: "Adults over 70 particularly need:", options: ["More
calories", "Vitamin D, calcium, B12", "Less protein", "More sugar"], correct: 1},
{q: "Vitamin D is important for:", options: ["Energy only",
"Bone and immune health", "Digestion only", "Hair growth"], correct: 1},
{q: "Good calcium sources include:", options: ["Meat only",
"Dairy and leafy greens", "Fruit only", "Oils"], correct: 1},
{q: "B12 deficiency can cause:", options: ["Weight gain",
"Fatigue and cognitive issues", "Hair loss only", "Increased appetite"], correct:
1},
{q: "Vitamin D can be obtained from:", options: ["Sun
exposure and foods", "Exercise only", "Sleep", "Stress"], correct: 0}
]
},
"M7": {
title: "Meal Timing & Glucose",
focus: "Protein at breakfast; short post-meal walks",
content: "Start with protein at breakfast to stabilise blood
sugar and reduce cravings. Take 10-15 minute walks after meals to improve glucose
uptake and digestion. This supports energy levels and metabolic health throughout
the day.",
activity: "Include protein in breakfast and take a 10-minute walk
after lunch - note how you feel compared to usual",
quiz: [
{q: "Protein at breakfast helps:", options: ["Weight loss
only", "Blood sugar stability", "Sleep quality only", "Digestion only"], correct:
1},
{q: "Post-meal walks should be:", options: ["30-45 minutes",
"10-15 minutes", "5 minutes only", "1 hour"], correct: 1},
{q: "Walking after meals helps:", options: ["Muscle
building", "Glucose uptake", "Sleep", "Memory"], correct: 1},
{q: "Best time for the longest walk is:", options:
["Immediately before meals", "2-3 hours after meals", "10-15 minutes after
meals", "During meals"], correct: 2},
{q: "Stable blood sugar prevents:", options: ["Exercise",
"Energy crashes and cravings", "Hydration", "Digestion"], correct: 1}
]
},
"M8": {
title: "Labels & Free Sugars",
focus: "â‰¤30g free sugars daily; read ingredient lists",
content: "Limit free sugars (added sugars, honey, syrups, fruit
juices) to â‰¤30g daily. Check ingredient lists - sugars appear under many names.
Focus on whole fruits instead of juices, and choose unsweetened products where
possible.",
activity: "Check labels on 3 packaged foods today - identify free
sugar content and alternative lower-sugar options",
quiz: [
{q: "Daily limit for free sugars is:", options: ["15g",
"25g", "30g", "50g"], correct: 2},
{q: "Free sugars include:", options: ["Natural fruit sugars",
"Added sugars and honey", "Milk sugars", "Vegetable sugars"], correct: 1},
{q: "On ingredient lists, sugars are listed:", options:
["Last", "By weight (highest first)", "Alphabetically", "Not required"], correct:
1},
{q: "Better choice for fruit intake:", options: ["Fruit
juice", "Fruit smoothies", "Whole fruits", "Dried fruits only"], correct: 2},
{q: "Hidden sugar sources include:", options: ["Plain
yoghurt", "Savoury sauces", "Plain nuts", "Fresh vegetables"], correct: 1}
]
},
"M9": {
title: "Fermented Foods",
focus: "Live yoghurt/kefir several times weekly for gut health",
content: "Include fermented foods like live yoghurt, kefir,
sauerkraut, or kimchi several times weekly. These provide beneficial probiotics
that support gut health, immune function, and may improve nutrient absorption and
mood.",
activity: "Try one new fermented food today or increase your
usual portion of live yoghurt - observe any digestive changes over the week",
quiz: [
{q: "Fermented foods provide:", options: ["Extra calories",
"Beneficial probiotics", "More protein only", "Less nutrients"], correct: 1},
{q: "How often should you include fermented foods:", options:
["Daily", "Several times weekly", "Once weekly", "Never"], correct: 1},
{q: "Examples of fermented foods include:", options: ["White
bread", "Live yoghurt and kefir", "Processed cheese", "Fruit juice"], correct:
1},
{q: "Probiotics support:", options: ["Muscle building only",
"Gut and immune health", "Bone strength only", "Hair growth"], correct: 1},
{q: "When buying yoghurt, look for:", options: ["High sugar
content", "Live/active cultures", "Artificial sweeteners", "Long shelf life"],
correct: 1}
]
},
"M10": {
title: "Legumes & Tolerance",
focus: "Rinse, small portions, cook well to improve
digestibility",
content: "Legumes (beans, lentils, chickpeas) are nutrient-dense
but can cause digestive issues. Improve tolerance by rinsing canned varieties,
starting with small portions, cooking thoroughly, and gradually increasing intake
over time.",
activity: "Include one serving of well-cooked legumes today
(start small if new to you) - note any digestive effects",
quiz: [
{q: "To improve legume tolerance:", options: ["Eat large
portions immediately", "Rinse and start small", "Avoid cooking", "Only eat raw"],
correct: 1},
{q: "Legumes provide:", options: ["Protein only", "Protein
and fibre", "Fat only", "No nutrients"], correct: 1},
{q: "Canned legumes should be:", options: ["Used directly",
"Rinsed before use", "Avoided", "Mixed with sugar"], correct: 1},
{q: "If new to legumes, you should:", options: ["Start with
large portions", "Begin gradually", "Avoid completely", "Only eat at dinner"],
correct: 1},
{q: "Legumes are good sources of:", options: ["Saturated
fat", "Plant protein and minerals", "Simple sugars", "Artificial additives"],
correct: 1}
]
},
"M11": {
title: "Batch Cooking & Food Safety",
focus: "Cool quickly, store 0-5Â°C, reheat until steaming",
content: "Batch cooking saves time and ensures healthy meals are
available. Cool food quickly (within 2 hours), store at 0-5Â°C, use within 2-3
days, and reheat until steaming hot throughout. Label containers with dates for
safety.",
activity: "Plan and prepare one batch-cooked component for this
week - practice proper cooling and storage techniques",
quiz: [
{q: "Cooked food should be cooled within:", options: ["30
minutes", "1 hour", "2 hours", "4 hours"], correct: 2},
{q: "Fridge temperature should be:", options: ["0-5Â°C", "5-
10Â°C", "10-15Â°C", "Room temperature"], correct: 0},
{q: "Batch-cooked food should be used within:", options: ["1
week", "2-3 days", "5-7 days", "1 month"], correct: 1},
{q: "When reheating food, ensure it's:", options: ["Warm",
"Hot", "Steaming throughout", "Room temperature"], correct: 2},
{q: "Food safety helps prevent:", options: ["Nutrient loss
only", "Food poisoning", "Waste only", "Overcooking"], correct: 1}
]
},
"M12": {
title: "Eating Out & Travel",
focus: "Protein + vegetables first; sauces on the side",
content: "When eating out, prioritise protein and vegetables,
request sauces on the side, and don't feel obligated to finish large portions.
Plan ahead by checking menus online and choosing restaurants with healthy options
available.",
activity: "Next time eating out or ordering food, practice
ordering protein + vegetables first and requesting modifications",
quiz: [
{q: "When eating out, prioritise:", options: ["Desserts
first", "Protein and vegetables", "Bread and appetizers", "Drinks only"],
correct: 1},
{q: "Sauces and dressings should be:", options: ["Extra
portions", "On the side", "Avoided completely", "Mixed in by chef"], correct: 1},
{q: "Large restaurant portions should be:", options: ["Always
finished", "Shared or taken home", "Eaten quickly", "Ignored"], correct: 1},
{q: "Before going to restaurants, it's helpful to:", options:
["Skip meals all day", "Check the menu online", "Avoid planning", "Order
immediately"], correct: 1},
{q: "Healthy restaurant choices include:", options: ["Deep-
fried everything", "Grilled proteins with vegetables", "Only salads", "Processed
foods"], correct: 1}
]
},
"M13": {
title: "Cravings & Habit Loop",
focus: "Identify trigger â†’ replace routine â†’ same reward",
content: "Understand the habit loop: trigger (stress, time,
emotion) â†’ routine (unhealthy snack) â†’ reward (comfort, energy). Keep the
trigger and reward, but replace the routine with a healthier alternative that
provides the same benefit.",
activity: "Identify one recurring craving today - note the
trigger, your usual response, and plan a healthier routine for next time",
quiz: [
{q: "The habit loop consists of:", options: ["Trigger,
routine, reward", "Hunger, eating, satisfaction", "Morning, noon, night", "Work,
rest, play"], correct: 0},
{q: "To change a habit, you should:", options: ["Remove all
triggers", "Replace the routine", "Ignore the reward", "Change everything at
once"], correct: 1},
{q: "Common craving triggers include:", options: ["Good
weather", "Stress and emotions", "Exercise", "Sleep"], correct: 1},
{q: "A healthier routine for stress-eating might be:",
options: ["Skip meals", "Herbal tea and deep breathing", "More coffee", "Avoiding
stress"], correct: 1},
{q: "The reward should be:", options: ["Eliminated", "Similar
to the original", "Completely different", "Delayed indefinitely"], correct: 1}
]
},
"M14": {
title: "Sleep & Appetite",
focus: "Consistent bedtime; caffeine cut-off time",
content: "Poor sleep disrupts appetite hormones, increasing
cravings for high-calorie foods. Maintain consistent sleep/wake times, cut off
caffeine by 2pm, and create a relaxing evening routine to support both sleep
quality and healthy eating patterns.",
activity: "Set a consistent bedtime and caffeine cut-off time for
this week - track how sleep quality affects your appetite and food choices",
quiz: [
{q: "Poor sleep affects:", options: ["Exercise only",
"Appetite hormones", "Vision only", "Hearing"], correct: 1},
{q: "Caffeine should be cut off by:", options: ["Bedtime",
"6pm", "2pm", "Never"], correct: 2},
{q: "Consistent sleep times help:", options: ["Weight loss
only", "Regulate appetite", "Build muscle only", "Save time"], correct: 1},
{q: "Sleep deprivation increases cravings for:", options:
["Vegetables", "High-calorie foods", "Water", "Supplements"], correct: 1},
{q: "A good evening routine includes:", options: ["Heavy
meals", "Relaxing activities", "Intense exercise", "Bright screens"], correct: 1}
]
}
};
// Walking routes data
this.walkingRoutes = {
"R1": {
name: "Regent's Park Loop",
description: "Classic loop around Regent's Park with beautiful
gardens and lake views",
highlights: "Rose Garden, Boating Lake, Open Air Theatre",
waypoints: ["Baker Street Station", "York Gate", "Queen Mary's
Gardens", "Boating Lake", "London Zoo entrance", "Prince Albert Road"],
facilities: ["Multiple benches around lake", "Toilets near Rose
Garden", "CafÃ© at boating lake"],
surface: "Mostly paved paths",
apple_maps: "Regent's Park Loop London",
google_maps: "Regent's Park, London NW1 4RY"
},
"R2": {
name: "Canal East â†’ Granary Square",
description: "Peaceful canal walk from King's Cross to vibrant
Granary Square",
highlights: "Regent's Canal, Camley Street Nature Park, Coal
Drops Yard",
waypoints: ["King's Cross Station", "Regent's Canal towpath",
"Camley Street Natural Park", "Granary Square", "Coal Drops Yard"],
facilities: ["Benches along canal", "Toilets at Granary Square",
"Multiple cafÃ©s at Coal Drops Yard"],
surface: "Canal towpath, some cobbles",
apple_maps: "Regent's Canal King's Cross to Granary Square",
google_maps: "Regent's Canal, King's Cross, London"
},
"R3": {
name: "Hampstead Heath: Parliament Hill",
description: "Challenging hill walk with spectacular London
skyline views",
highlights: "Parliament Hill viewpoint, Heath woodlands, City
skyline",
waypoints: ["Hampstead Heath Station", "Fleet Road", "Parliament
Hill viewpoint", "Mixed Bathing Pond", "Kenwood direction"],
facilities: ["Benches with views", "Toilets at Parliament Hill",
"Kenwood CafÃ© (seasonal)"],
surface: "Natural paths, steep sections",
apple_maps: "Parliament Hill Hampstead Heath London",
google_maps: "Parliament Hill, Hampstead Heath, London NW5"
},
"R4": {
name: "Bloomsbury Squares",
description: "Historic garden squares tour through literary
Bloomsbury",
highlights: "Russell Square, Bedford Square, British Museum
area",
waypoints: ["Russell Square Station", "Russell Square Gardens",
"Bedford Square", "Fitzroy Square", "Charlotte Street", "Goodge Street"],
facilities: ["Garden benches", "Russell Square toilets",
"Multiple cafÃ©s on Charlotte Street"],
surface: "City pavements, garden paths",
apple_maps: "Bloomsbury Squares walking tour London",
google_maps: "Russell Square, London WC1B"
},
"R5": {
name: "Primrose Hill & Outer Circle",
description: "Gentle climb to panoramic views plus Regent's Park
circuit",
highlights: "Primrose Hill summit, Regent's Park Outer Circle,
Camden views",
waypoints: ["Camden Town Station", "Regent's Park Road",
"Primrose Hill summit", "Prince Albert Road", "Outer Circle", "Camden Lock"],
facilities: ["Benches on Primrose Hill", "Regent's Park
facilities", "Camden Market area"],
surface: "Mixed paths and pavements",
apple_maps: "Primrose Hill to Regent's Park Outer Circle",
google_maps: "Primrose Hill, London NW1"
},
"R6": {
name: "Heath Ponds & Woodland",
description: "Natural trail through Hampstead Heath's wild
areas",
highlights: "Swimming ponds, ancient woodland, wildlife
spotting",
waypoints: ["Hampstead Station", "Holly Hill", "Mixed Bathing
Pond", "Viaduct Bridge", "Kenwood House", "Highgate Ponds"],
facilities: ["Pond-side benches", "Kenwood facilities", "Natural
seating areas"],
surface: "Natural woodland paths, undulating",
apple_maps: "Hampstead Heath Ponds walking trail",
google_maps: "Hampstead Heath, London NW3"
},
"R7": {
name: "Camdenâ†’St Pancrasâ†’British Library",
description: "Cultural walk linking markets, architecture and
knowledge",
highlights: "Camden Market, St Pancras Station, British Library",
waypoints: ["Camden Market", "Regent's Canal", "King's Cross
Station", "St Pancras International", "British Library", "Euston Road"],
facilities: ["Multiple facilities at stations", "British Library
cafÃ©", "Camden market amenities"],
surface: "Urban pavements, station concourses",
apple_maps: "Camden to British Library walking route",
google_maps: "Camden Market to British Library London"
},
"R8": {
name: "Canal West â†’ Little Venice",
description: "Scenic canal walk to charming Little Venice
waterways",
highlights: "Little Venice canal junction, Regent's Canal, canal
boats",
waypoints: ["Warwick Avenue Station", "Little Venice", "Regent's
Canal towpath", "Maida Vale", "Paddington Basin", "Paddington Station"],
facilities: ["Waterside benches", "Little Venice cafÃ©s",
"Paddington facilities"],
surface: "Canal towpath, urban walkways",
apple_maps: "Little Venice to Paddington Basin canal walk",
google_maps: "Little Venice, London W9"
},
"R9": {
name: "Waterlow Park & Highgate",
description: "Hilly park walk with historic Highgate Village
exploration",
highlights: "Waterlow Park views, Highgate Village, historic
architecture",
waypoints: ["Archway Station", "Waterlow Park", "Highgate High
Street", "The Grove", "Highgate Cemetery area", "Swain's Lane"],
facilities: ["Park benches and facilities", "Highgate Village
shops", "Various cafÃ©s"],
surface: "Park paths, village streets, hills",
apple_maps: "Waterlow Park Highgate Village walk",
google_maps: "Waterlow Park, London N6"
},
"R10": {
name: "Marylebone & Baker Street",
description: "Urban village walk through elegant Marylebone
streets",
highlights: "Marylebone High Street, Wallace Collection, Baker
Street",
waypoints: ["Baker Street Station", "Marylebone High Street",
"Wallace Collection", "Manchester Square", "Oxford Street", "Bond Street"],
facilities: ["Street benches", "Museum facilities", "Abundant
cafÃ©s and shops"],
surface: "City pavements, pedestrian areas",
apple_maps: "Marylebone Village walking tour London",
google_maps: "Marylebone High Street, London W1"
},
"R11": {
name: "Regent's Park Inner Circle",
description: "Focused circuit of Regent's Park's inner gardens
and attractions",
highlights: "Queen Mary's Gardens, Open Air Theatre, Inner Circle
gardens",
waypoints: ["Great Portland Street", "Park Crescent", "Inner
Circle entrance", "Queen Mary's Gardens", "Open Air Theatre", "Regent's
College"],
facilities: ["Garden benches throughout", "Park toilets",
"Theatre cafÃ© (seasonal)"],
surface: "Well-maintained park paths",
apple_maps: "Regent's Park Inner Circle London",
google_maps: "Inner Circle, Regent's Park, London NW1"
},
"R12": {
name: "West Endâ†’Southbank (bus/tube back)",
description: "Cross-city cultural walk via bridges (transport
return)",
highlights: "Oxford Street, Westminster Bridge, South Bank,
London Eye",
waypoints: ["Oxford Circus", "Westminster", "Westminster Bridge",
"South Bank", "National Theatre", "Waterloo", "London Eye"],
facilities: ["Multiple facilities throughout", "South Bank
cafÃ©s", "Tourist amenities"],
surface: "City pavements, bridge walkways",
apple_maps: "West End to South Bank London walking",
google_maps: "Oxford Circus to South Bank London",
return_transport: "Tube: Waterloo to Oxford Circus (Bakerloo
line) or Bus: RV1, 76, or 341"
},
"R13": {
name: "Hampstead Village & Heath Extension",
description: "Extended Heath exploration plus charming village
streets",
highlights: "Hampstead Village, Heath extension, Fenton House
area",
waypoints: ["Hampstead Station", "High Street", "Church Row",
"Fenton House", "Heath extension", "Whitestone Pond", "Jack Straw's Castle"],
facilities: ["Village shops and cafÃ©s", "Heath benches", "Public
toilets in village"],
surface: "Village pavements, heath paths",
apple_maps: "Hampstead Village and Heath extended walk",
google_maps: "Hampstead Village, London NW3"
},
"R14": {
name: "Canal East â†’ Victoria Park (bus back)",
description: "Extended canal walk to East London's great park",
highlights: "Regent's Canal full length, Victoria Park, canal
boats",
waypoints: ["King's Cross", "Regent's Canal towpath", "Camden
Lock", "Regent's Park", "London Zoo", "Victoria Park", "Mile End"],
facilities: ["Canal-side benches", "Victoria Park facilities",
"Various locks and cafÃ©s"],
surface: "Canal towpath throughout",
apple_maps: "Regent's Canal King's Cross to Victoria Park",
google_maps: "Regent's Canal to Victoria Park London",
return_transport: "Bus: 277, 425 from Victoria Park to central
London or Tube: Mile End (Central line)"
}
};
// Base 14-day distance pattern (miles)
this.baseDistances = [4.0, 4.5, 5.0, 4.0, 5.5, 6.0, 4.5, 6.5, 5.5, 4.5,
5.0, 6.5, 7.0, 4.5];
// Walking pace and wet weather alternatives
this.walkingPace = 3.0; // mph
this.wetWeatherSteps = {
4.0: 7500, 4.5: 8400, 5.0: 9400, 5.5: 10300, 6.0: 11300,
6.5: 12200, 7.0: 13100, 7.5: 14100, 8.0: 15000
};
// Quiz scores tracking
this.quizScores = {};
// Original meal plan data (unchanged)
this.data = {
// ... existing meal plan data structure remains the same
blocks: {
A: { /* ... existing A block data ... */ },
B: { /* ... existing B block data ... */ },
C: { /* ... existing C block data ... */ }
},
freeDaySuggestions: [
{ option: "Leftover Remix", description: "Use components from the
week's mini-blocks in new combinations" },
{ option: "Simple Comfort", description: "Easy one-pot meal like
soup, stew, or stir-fry" },
{ option: "Social Meal", description: "Plan for dining out or
cooking with family/friends" },
{ option: "Prep Day", description: "Batch cook components for
next week while enjoying simple meals" }
],
groceryList: {
produce: ["mixed greens", "spinach", "broccoli", "asparagus",
"sweet potatoes", "carrots", "bell peppers", "tomatoes", "cucumber", "avocados",
"fresh herbs", "lemons", "bananas", "mixed berries", "apples", "mango"],
proteins: ["chicken breast", "turkey mince", "salmon", "cod",
"mackerel", "trout", "tuna in water", "eggs", "Greek yogurt", "feta cheese",
"kefir"],
pantry: ["quinoa", "brown rice", "wild rice", "oats", "whole-
grain bread", "olive oil", "nuts", "seeds", "chia seeds", "herbs and spices",
"coconut milk", "almond milk"]
},
timeSavingTips: [
"Mini Block A uses same meals Monday & Wednesday - prep once, eat
twice",
"Mini Block B repeats Tuesday & Thursday - batch cook proteins",
"Mini Block C covers Friday & Saturday - perfect for weekend meal
prep",
"Use Sunday to prep components for next week's mini-blocks",
"Cook grains in batches - they keep well and reheat quickly",
"Pre-wash and prep vegetables for the week on Sunday"
]
};
this.nutritionTargets = {
calories: {min: 1600, max: 1800},
protein: {min: 75, max: 85},
fiber: {min: 25},
sodium: {max: 2000},
sat_fat: {max: 20}
};
this.init();
}
init() {
this.setupEventListeners();
this.generateWeekButtons();
this.generateDayButtons();
this.updateView();
}
// Calculate which learning module for current day
getLearningModuleForDay() {
const totalDay = (this.currentWeek - 1) * 7 + this.currentDay;
const moduleIndex = ((totalDay - 1) % 14) + 1;
return `M${moduleIndex}`;
}
// Calculate walking distance for current day with progression
getWalkingDistanceForDay() {
const totalDay = (this.currentWeek - 1) * 7 + this.currentDay;
const baseIndex = (totalDay - 1) % 14;
const baseDistance = this.baseDistances[baseIndex];
// Progressive increase every 2 weeks on "up-days" (distances >= 5.0)
const progressionWeeks = Math.floor((this.currentWeek - 1) / 2);
const isUpDay = baseDistance >= 5.0;
const progressionIncrease = isUpDay ? progressionWeeks * 0.25 : 0;
// Cap at 8.0 miles maximum
return Math.min(baseDistance + progressionIncrease, 8.0);
}
// Get walking route for current day
getWalkingRouteForDay() {
const totalDay = (this.currentWeek - 1) * 7 + this.currentDay;
const routeIndex = ((totalDay - 1) % 14) + 1;
return this.walkingRoutes[`R${routeIndex}`];
}
// Calculate estimated walking time
getWalkingTimeEstimate(distance) {
const timeHours = distance / this.walkingPace;
const timeMinutes = Math.round(timeHours * 60);
const hours = Math.floor(timeMinutes / 60);
const minutes = timeMinutes % 60;
if (hours > 0) {
return `${hours}h ${minutes}m`;
}
return `${minutes} minutes`;
}
// Handle quiz submission
submitQuiz(moduleId, answers) {
const module = this.learningModules[moduleId];
if (!module) return;
let correct = 0;
answers.forEach((answer, index) => {
if (answer === module.quiz[index].correct) {
correct++;
}
});
const score = {
week: this.currentWeek,
day: this.currentDay,
module: moduleId,
score: correct,
total: module.quiz.length,
percentage: Math.round((correct / module.quiz.length) * 100),
date: new Date().toISOString().split('T')[0]
};
// Store quiz score
if (!this.quizScores[this.currentWeek]) {
this.quizScores[this.currentWeek] = {};
}
this.quizScores[this.currentWeek][this.currentDay] = score;
this.displayQuizResults(score);
}
displayQuizResults(score) {
const resultsContainer = document.getElementById('quiz-results');
if (!resultsContainer) return;
const resultClass = score.percentage >= 80 ? 'excellent' :
score.percentage >= 60 ? 'good' : 'needs-review';
const emoji = score.percentage >= 80 ? 'ðŸŽ‰' : score.percentage >= 60 ?
'ðŸ‘ ' : 'ðŸ“š';
resultsContainer.innerHTML = `
<div class="quiz-result ${resultClass}">
<h4>${emoji} Quiz Complete!</h4>
<div class="score-display">
<span class="score">${score.score}/${score.total}</span>
<span class="percentage">${score.percentage}%</span>
</div>
<p class="score-message">
${score.percentage >= 80 ? 'Excellent understanding!' :
score.percentage >= 60 ? 'Good progress - review any missed
concepts.' :
'Consider reviewing the lesson content and trying again
tomorrow.'}
</p>
<button class="btn btn--secondary"
onclick="app.showLearningOverview()">
View Learning Progress
</button>
</div>
`;
}
// Enhanced updateView to include learning and walking
updateView() {
this.updateWeekButtons();
this.updateDayButtons();
this.renderBlockInfo();
this.renderWeekGrid();
this.renderDayContent();
this.renderLearningModule();
this.renderWalkingPlan();
this.updateBreadcrumb();
}
renderLearningModule() {
const container = document.getElementById('learning-container');
if (!container) return;
const moduleId = this.getLearningModuleForDay();
const module = this.learningModules[moduleId];
const isRevisionWeek = this.currentWeek > 2;
container.innerHTML = `
<div class="learning-card">
<div class="learning-header">
<div class="module-badge">
<span class="module-id">${moduleId}</span>
${isRevisionWeek ? '<span class="revision-
badge">REVISION</span>' : ''}
</div>
<h3 class="module-title">${module.title}</h3>
<p class="module-focus">${module.focus}</p>
</div>
<div class="learning-content">
<section class="lesson-section">
<h4>ðŸ“– Today's Lesson</h4>
<p>${module.content}</p>
${isRevisionWeek ? `
<div class="revision-prompt">
<strong>Revision Focus:</strong> How have you
been applying this concept since Week ${Math.ceil((this.currentWeek - 2) / 2)}?
What challenges have you encountered, and what
adjustments might help?
</div>
` : ''}
</section>
<section class="activity-section">
<h4>ðŸŽ¯ Today's Activity</h4>
<p>${module.activity}</p>
<div class="activity-tracker">
<label>
<input type="checkbox" class="activity-checkbox">
Mark as completed
</label>
</div>
</section>
<section class="quiz-section">
<h4>â “ Knowledge Check (5 questions)</h4>
<div id="quiz-questions">
${this.renderQuizQuestions(moduleId)}
</div>
<div id="quiz-results"></div>
</section>
</div>
</div>
`;
}
renderQuizQuestions(moduleId) {
const module = this.learningModules[moduleId];
return module.quiz.map((q, index) => `
<div class="quiz-question">
<p class="question-text"><strong>Q${index + 1}:</strong> ${q.q}
</p>
<div class="quiz-options">
${q.options.map((option, optIndex) => `
<label class="quiz-option">
<input type="radio" name="q${index}"
value="${optIndex}">
<span>${option}</span>
</label>
`).join('')}
</div>
</div>
`).join('') + `
<button class="btn btn--primary quiz-submit"
onclick="app.handleQuizSubmit('${moduleId}')">
Submit Quiz
</button>
`;
}
handleQuizSubmit(moduleId) {
const answers = [];
const module = this.learningModules[moduleId];
for (let i = 0; i < module.quiz.length; i++) {
const selected =
document.querySelector(`input[name="q${i}"]:checked`);
if (selected) {
answers.push(parseInt(selected.value));
} else {
alert(`Please answer question ${i + 1}`);
return;
}
}
this.submitQuiz(moduleId, answers);
}
renderWalkingPlan() {
const container = document.getElementById('walking-container');
if (!container) return;
const distance = this.getWalkingDistanceForDay();
const route = this.getWalkingRouteForDay();
const timeEstimate = this.getWalkingTimeEstimate(distance);
const wetWeatherSteps = this.wetWeatherSteps[distance] ||
Math.round(distance * 1875);
container.innerHTML = `
<div class="walking-card">
<div class="walking-header">
<div class="distance-badge">
<span class="distance">${distance}</span>
<span class="unit">miles</span>
</div>
<div class="walking-meta">
<h3 class="route-name">${route.name}</h3>
<p class="time-estimate">â ±ï¸  ${timeEstimate} â€¢
ðŸš¶â€ â™€ï¸  ~3mph</p>
</div>
</div>
<div class="walking-content">
<section class="route-section">
<h4>ðŸ—ºï¸  Today's Route</h4>
<p class="route-description">${route.description}</p>
<div class="route-highlights">
<strong>Highlights:</strong> ${route.highlights}
</div>
`<li>${waypoint}</li>`).join('')}
<div class="waypoints">
<h5>Key Waypoints:</h5>
<ul class="waypoints-list">
${route.waypoints.map(waypoint =>
</ul>
</div>
<div class="facilities">
<h5>Facilities & Rest Points:</h5>
<ul class="facilities-list">
${route.facilities.map(facility =>
`<li>${facility}</li>`).join('')}
</ul>
<p class="surface-info"><strong>Surface:</strong>
${route.surface}</p>
</div>
</section>
<section class="navigation-section">
<h4>ðŸ§ Navigation Links</h4>
<div class="map-links">
<a href="https://maps.apple.com/?
q=${encodeURIComponent(route.apple_maps)}"
target="_blank" class="btn btn--outline">
ðŸ Ž Apple Maps
</a>
<a
href="https://www.google.com/maps/search/${encodeURIComponent(route.google_maps)}
"
target="_blank" class="btn btn--outline">
ðŸ—ºï¸  Google Maps
</a>
</div>
${route.return_transport ? `
<div class="return-transport">
<h5>Return Transport:</h5>
<p>${route.return_transport}</p>
</div>
` : ''}
</section>
<section class="weather-section">
<h4>ðŸŒ§ï¸  Wet Weather Alternative</h4>
<div class="indoor-option">
<div class="steps-target">
<span class="steps-
count">${wetWeatherSteps.toLocaleString()}</span>
<span class="steps-label">steps indoors</span>
</div>
<p class="indoor-description">
Equivalent indoor walking/stepping. Use stairs,
treadmill, shopping centres,
or home circuits to reach your step target.
</p>
<div class="step-tracker">
<label>
<input type="checkbox" class="walking-
checkbox">
Completed today's activity
</label>
</div>
</div>
</section>
</div>
</div>
`;
}
// Additional methods for learning progress tracking
showLearningOverview() {
// Implementation for showing overall learning progress
console.log('Learning overview requested');
}
// Original methods remain unchanged...
setupEventListeners() {
// ... existing event listeners ...
// Search
const searchInput = document.getElementById('search-input');
if (searchInput) {
searchInput.addEventListener('input', (e) => {
this.searchQuery = e.target.value.toLowerCase();
this.updateView();
});
''}`;
}
// Print
const printBtn = document.getElementById('print-btn');
if (printBtn) {
printBtn.addEventListener('click', () => window.print());
}
// Day navigation arrows
const prevBtn = document.getElementById('prev-day');
const nextBtn = document.getElementById('next-day');
if (prevBtn) {
prevBtn.addEventListener('click', () => this.changeDay(-1));
}
if (nextBtn) {
nextBtn.addEventListener('click', () => this.changeDay(1));
}
}
// ... rest of existing methods remain the same ...
generateWeekButtons() {
const container = document.getElementById('week-buttons');
if (!container) return;
container.innerHTML = '';
for (let i = 1; i <= 12; i++) {
const button = document.createElement('button');
button.className = `week-btn ${i === this.currentWeek ? 'active' :
button.textContent = `Week ${i}`;
button.addEventListener('click', (e) => {
e.preventDefault();
this.switchWeek(i);
});
container.appendChild(button);
''}`;
}
}
generateDayButtons() {
const container = document.getElementById('day-buttons');
if (!container) return;
container.innerHTML = '';
for (let i = 1; i <= 7; i++) {
const button = document.createElement('button');
button.className = `day-btn ${i === this.currentDay ? 'active' :
button.textContent = i;
button.addEventListener('click', (e) => {
e.preventDefault();
this.switchDay(i);
});
container.appendChild(button);
}
}
switchWeek(week) {
this.currentWeek = week;
this.updateView();
switchDay(day) {
this.currentDay = day;
this.updateView();
}
}
changeDay(direction) {
let newDay = this.currentDay + direction;
if (newDay < 1) {
newDay = 7;
if (this.currentWeek > 1) {
this.currentWeek--;
}
} else if (newDay > 7) {
newDay = 1;
if (this.currentWeek < 12) {
this.currentWeek++;
}
}
this.currentDay = newDay;
this.updateView();
}
updateWeekButtons() {
const buttons = document.querySelectorAll('.week-btn');
buttons.forEach((btn, index) => {
btn.classList.toggle('active', index + 1 === this.currentWeek);
});
}
updateDayButtons() {
const buttons = document.querySelectorAll('.day-btn');
buttons.forEach((btn, index) => {
btn.classList.toggle('active', index + 1 === this.currentDay);
});
}
renderBlockInfo() {
const container = document.getElementById('block-info');
if (!container) return;
const blockType = this.weekRotation[this.currentWeek];
const block = this.data.blocks[blockType];
container.innerHTML = `
<div class="card">
<div class="card__body">
<div class="block-header">
<h2 class="block-title">${block.name}</h2>
<span class="block-badge">Block ${blockType}</span>
</div>
<p class="block-description">${block.description}</p>
<div class="mini-block-legend">
<h4>This Week's Mini-Blocks</h4>
<div class="legend-grid">
<div class="legend-item">
<div class="legend-dot mini-a"></div>
<span>A: ${block.miniBlocks.A.theme}</span>
</div>
<div class="legend-item">
<div class="legend-dot mini-b"></div>
<span>B: ${block.miniBlocks.B.theme}</span>
</div>
<div class="legend-item">
<div class="legend-dot mini-c"></div>
<span>C: ${block.miniBlocks.C.theme}</span>
</div>
<div class="legend-item">
<div class="legend-dot free-day"></div>
<span>Free: Flexible day</span>
</div>
</div>
</div>
</div>
</div>
`;
}
renderWeekGrid() {
const container = document.getElementById('week-grid');
if (!container) return;
container.innerHTML = '';
for (let day = 1; day <= 7; day++) {
const tile = document.createElement('div');
const miniBlock = this.miniBlockSchedule[day];
tile.className = `day-tile ${day === this.currentDay ? 'active' : ''}
${miniBlock === 'Free' ? 'free-day' : 'mini-' + miniBlock.toLowerCase()}`;
tile.addEventListener('click', (e) => {
e.preventDefault();
this.switchDay(day);
});
tile.innerHTML = `
<div class="day-name">${this.dayNames[day - 1].slice(0, 3)}</div>
<div class="day-number">${day}</div>
<div class="mini-block-label">${miniBlock === 'Free' ? 'Free' :
'Mini ' + miniBlock}</div>
`;
container.appendChild(tile);
}
}
renderDayContent() {
const container = document.getElementById('day-content');
if (!container) return;
const dayName = this.dayNames[this.currentDay - 1];
const miniBlock = this.miniBlockSchedule[this.currentDay];
container.innerHTML = `
<div class="day-header">
<h2 class="day-title">${dayName}, Day ${this.currentDay}</h2>
<p class="day-meta">Week ${this.currentWeek} â€¢ ${miniBlock ===
'Free' ? 'Free Day' : 'Mini Block ' + miniBlock}</p>
</div>
`;
if (miniBlock === 'Free') {
this.renderFreeDayContent();
} else {
this.renderMealContent(miniBlock);
}
}
},
renderMealContent(miniBlock) {
const container = document.getElementById('meals-container');
if (!container) return;
const blockType = this.weekRotation[this.currentWeek];
const meals = this.data.blocks[blockType].miniBlocks[miniBlock].meals;
// Render meals as before...
this.renderMeals([
{ type: 'Breakfast', time: meals.breakfast.time, ...meals.breakfast
{ type: 'Lunch', time: meals.lunch.time, ...meals.lunch },
{ type: 'Dinner', time: meals.dinner.time, ...meals.dinner },
...meals.snacks.map(snack => ({ type: 'Snack', ...snack }))
]);
}
</p>
renderFreeDayContent() {
const container = document.getElementById('meals-container');
if (!container) return;
container.innerHTML = `
<div class="free-day-content">
<h3>ðŸŒŸ Free Day Options</h3>
<p>Choose your own adventure today! Here are some suggestions:
<div class="free-day-options">
${this.data.freeDaySuggestions.map(suggestion => `
<div class="free-day-option">
<h5>${suggestion.option}</h5>
<p>${suggestion.description}</p>
</div>
`).join('')}
</div>
</div>
`;
}
renderMeals(meals) {
const container = document.getElementById('meals-container');
if (!container || !meals) return;
container.innerHTML = '';
// Filter meals based on search query
let filteredMeals = meals;
if (this.searchQuery) {
filteredMeals = meals.filter(meal => {
const searchableText = [
meal.title || '',
...(meal.ingredients || []),
...(meal.tags || [])
].join(' ').toLowerCase();
return searchableText.includes(this.searchQuery);
});
if (filteredMeals.length === 0) {
container.innerHTML = `
<div class="no-results">
<p>No meals found matching "${this.searchQuery}". Try a
different search term.</p>
</div>
`;
return;
}
}
filteredMeals.forEach(meal => {
const mealCard = document.createElement('div');
mealCard.className = 'meal-card';
mealCard.innerHTML = `
<div class="meal-card__header">
<div class="meal-meta">
<span class="meal-type-time">${meal.type} â€¢ ${meal.time
|| 'Flexible timing'}</span>
<span class="meal-portion-time">Prep: ${meal.prep_time ||
'Not specified'}</span>
</div>
<h3 class="meal-title">${meal.title}</h3>
${meal.tags ? `
<div class="meal-tags">
${meal.tags.map(tag => `<span class="meal-tag">${tag}
</span>`).join('')}
</div>
` : ''}
</div>
<div class="meal-card__body">
${meal.ingredients ? `
<div class="ingredients-section">
<h4 class="section-title">Ingredients</h4>
<ul class="ingredients-list">
${meal.ingredients.map(ingredient =>
`<li>${ingredient}</li>`).join('')}
</ul>
</div>
` : ''}
${meal.steps ? `
<div class="steps-section">
<h4 class="section-title">Method</h4>
<ol class="steps-list">
${meal.steps.map(step => `<li>${step}
</li>`).join('')}
</ol>
</div>
` : ''}
${meal.nutrition ? `
<div class="nutrition-section">
<h4 class="section-title">Nutrition per serving</h4>
<div class="nutrition-grid">
<div class="nutrition-item">
<span class="nutrition-
value">${meal.nutrition.kcal}</span>
<span class="nutrition-label">kcal</span>
value">${meal.nutrition.protein}g</span>
value">${meal.nutrition.carbs}g</span>
</div>
<div class="nutrition-item">
<span class="nutrition-
<span class="nutrition-label">protein</span>
</div>
<div class="nutrition-item">
<span class="nutrition-
<span class="nutrition-label">carbs</span>
</div>
<div class="nutrition-item">
<span class="nutrition-
value">${meal.nutrition.fat}g</span>
<span class="nutrition-label">fat</span>
</div>
<div class="nutrition-item">
<span class="nutrition-
value">${meal.nutrition.fiber}g</span>
<span class="nutrition-label">fibre</span>
</div>
<div class="nutrition-item">
<span class="nutrition-
value">${meal.nutrition.sodium}mg</span>
<span class="nutrition-label">sodium</span>
</div>
</div>
</div>
` : ''}
</div>
`;
container.appendChild(mealCard);
});
}
updateBreadcrumb() {
const container = document.getElementById('breadcrumb');
if (!container) return;
const blockType = this.weekRotation[this.currentWeek];
const miniBlock = this.miniBlockSchedule[this.currentDay];
const dayName = this.dayNames[this.currentDay - 1];
container.innerHTML = `
Week ${this.currentWeek} â†’ Block ${blockType} â†’ ${dayName}
(${miniBlock === 'Free' ? 'Free Day' : 'Mini ' + miniBlock})
`;
}
}
// Initialize the enhanced app
let app;
document.addEventListener('DOMContentLoaded', () => {
app = new EnhancedMealPlanApp();
});
