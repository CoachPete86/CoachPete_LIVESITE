// Jolene 12-Week Meal Plan App - JavaScript
class MealPlanApp {
    constructor() {
        this.currentWeek = 1;
        this.currentDay = 1; // 1-7 for Monday-Sunday
        this.searchQuery = '';
        
        // Week rotation pattern
        this.weekRotation = {
            1: 'A', 2: 'B', 3: 'A', 4: 'B',
            5: 'C', 6: 'A', 7: 'B', 8: 'C',
            9: 'A', 10: 'B', 11: 'C', 12: 'B'
        };
        
        // Mini-block schedule within each week
        this.miniBlockSchedule = {
            1: 'A', // Monday
            2: 'B', // Tuesday
            3: 'A', // Wednesday
            4: 'B', // Thursday
            5: 'C', // Friday
            6: 'C', // Saturday
            7: 'Free' // Sunday
        };
        
        this.dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        
        this.data = {
            blocks: {
                A: {
                    name: "Foundation Block",
                    description: "Core nutrition with anti-inflammatory focus",
                    miniBlocks: {
                        A: {
                            theme: "Mediterranean & Fish",
                            meals: {
                                breakfast: {
                                    title: "Greek Yoghurt Bowl",
                                    time: "8:00",
                                    tags: ["High-protein", "Calcium-rich"],
                                    prep_time: "5 min",
                                    ingredients: ["200g plain Greek yoghurt", "1 cup mixed berries", "2 tbsp chopped walnuts", "1 tbsp chia seeds", "1 tsp honey (optional)"],
                                    steps: ["Spoon yoghurt into bowl", "Top with berries and walnuts", "Sprinkle chia seeds and drizzle honey"],
                                    nutrition: {kcal: 320, protein: 22, carbs: 18, fat: 16, fiber: 4, sodium: 150, sat_fat: 5}
                                },
                                lunch: {
                                    title: "Mediterranean Salmon Salad",
                                    time: "13:00",
                                    tags: ["Omega-3", "Anti-inflammatory"],
                                    prep_time: "15 min",
                                    ingredients: ["3-4 cups mixed greens", "100g cooked salmon", "½ avocado", "cherry tomatoes", "cucumber", "1 tbsp EVOO", "2 tsp lemon juice", "fresh herbs"],
                                    steps: ["Arrange greens in bowl", "Top with salmon, avocado, vegetables", "Whisk oil and lemon, dress salad"],
                                    nutrition: {kcal: 410, protein: 34, carbs: 10, fat: 26, fiber: 6, sodium: 220}
                                },
                                dinner: {
                                    title: "Herb-roast Chicken & Vegetables",
                                    time: "18:30",
                                    tags: ["Make-ahead", "Batch-friendly"],
                                    prep_time: "25 min",
                                    ingredients: ["150g chicken breast", "1 cup mixed root vegetables", "½ cup cooked quinoa", "herbs", "olive oil", "seasonings"],
                                    steps: ["Season and roast chicken with vegetables", "Cook quinoa separately", "Serve together with fresh herbs"],
                                    nutrition: {kcal: 540, protein: 40, carbs: 42, fat: 20, fiber: 7, sodium: 180}
                                },
                                snacks: [
                                    {
                                        title: "Apple + Almond Butter",
                                        time: "11:00",
                                        ingredients: ["1 medium apple", "2 tbsp almond butter"],
                                        nutrition: {kcal: 180, protein: 4, carbs: 20, fat: 12, fiber: 4, sodium: 0}
                                    }
                                ]
                            }
                        },
                        B: {
                            theme: "Eggs & Turkey",
                            meals: {
                                breakfast: {
                                    title: "Spinach & Feta Omelette",
                                    time: "8:00",
                                    tags: ["High-protein", "Calcium-rich"],
                                    prep_time: "10 min",
                                    ingredients: ["2 eggs + 1 white", "spinach", "feta cheese", "1 slice whole-grain toast", "¼ avocado"],
                                    steps: ["Whisk eggs, cook omelette with spinach and feta", "Toast bread", "Serve with sliced avocado"],
                                    nutrition: {kcal: 450, protein: 20, carbs: 25, fat: 30, fiber: 5, sodium: 500, sat_fat: 8}
                                },
                                lunch: {
                                    title: "Herbed Turkey & Quinoa Bowl",
                                    time: "13:00",
                                    tags: ["Lean protein", "Whole grain"],
                                    prep_time: "20 min",
                                    ingredients: ["100g cooked turkey", "¾ cup cooked quinoa", "1 cup roasted vegetables", "mixed greens", "lemon", "2 tsp olive oil"],
                                    steps: ["Arrange quinoa in bowl", "Top with turkey and roasted vegetables", "Dress with lemon and oil"],
                                    nutrition: {kcal: 400, protein: 32, carbs: 35, fat: 15, fiber: 6, sodium: 120}
                                },
                                dinner: {
                                    title: "Baked Cod with Lemon-Caper",
                                    time: "18:30",
                                    tags: ["Omega-3", "Low-sodium"],
                                    prep_time: "25 min",
                                    ingredients: ["150g cod fillet", "lemon", "capers (rinsed)", "1 cup broccoli", "¾ cup wild rice"],
                                    steps: ["Bake cod with lemon and rinsed capers", "Steam broccoli", "Serve with cooked wild rice"],
                                    nutrition: {kcal: 420, protein: 36, carbs: 40, fat: 12, fiber: 6, sodium: 450}
                                },
                                snacks: [
                                    {
                                        title: "Kefir Berry Bowl",
                                        time: "11:00",
                                        ingredients: ["1 cup kefir", "½ cup blueberries", "cinnamon"],
                                        nutrition: {kcal: 180, protein: 8, carbs: 22, fat: 5, fiber: 3, sodium: 125}
                                    }
                                ]
                            }
                        },
                        C: {
                            theme: "Plant-Based & Fish",
                            meals: {
                                breakfast: {
                                    title: "Smoothie Bowl",
                                    time: "8:00",
                                    tags: ["Antioxidant-rich", "Fiber-rich"],
                                    prep_time: "10 min",
                                    ingredients: ["frozen banana", "180ml kefir", "30g spinach", "1 tbsp flax", "berries", "pumpkin seeds"],
                                    steps: ["Blend banana, kefir, spinach, flax", "Pour into bowl", "Top with berries and seeds"],
                                    nutrition: {kcal: 400, protein: 20, carbs: 45, fat: 15, fiber: 8, sodium: 100}
                                },
                                lunch: {
                                    title: "Warm Chicken & Vegetable Salad",
                                    time: "13:00",
                                    tags: ["Warming", "Nutrient-dense"],
                                    prep_time: "20 min",
                                    ingredients: ["100g chicken breast", "mixed roasted vegetables", "greens", "tahini-lemon dressing"],
                                    steps: ["Warm cooked chicken and vegetables", "Arrange over greens", "Drizzle with tahini dressing"],
                                    nutrition: {kcal: 380, protein: 30, carbs: 20, fat: 20, fiber: 6, sodium: 80}
                                },
                                dinner: {
                                    title: "Grilled Trout & Sweet Potato",
                                    time: "18:30",
                                    tags: ["Omega-3", "Beta-carotene"],
                                    prep_time: "25 min",
                                    ingredients: ["150g trout fillet", "1 medium sweet potato", "asparagus", "olive oil", "herbs"],
                                    steps: ["Grill trout with herbs", "Roast sweet potato", "Steam asparagus and serve together"],
                                    nutrition: {kcal: 480, protein: 34, carbs: 35, fat: 25, fiber: 7, sodium: 120}
                                },
                                snacks: [
                                    {
                                        title: "Trail Mix",
                                        time: "15:30",
                                        ingredients: ["2 tbsp walnuts", "2 tbsp pumpkin seeds", "2 tbsp coconut flakes"],
                                        nutrition: {kcal: 210, protein: 6, carbs: 8, fat: 18, fiber: 4, sodium: 5}
                                    }
                                ]
                            }
                        }
                    }
                },
                B: {
                    name: "Variety Block",
                    description: "Diverse proteins and cooking methods",
                    miniBlocks: {
                        A: {
                            theme: "Thyroid Support",
                            meals: {
                                breakfast: {
                                    title: "Thyroid-supporting Porridge",
                                    time: "8:00",
                                    tags: ["Thyroid-friendly", "Warming"],
                                    prep_time: "8 min",
                                    ingredients: ["50g oats", "240ml milk", "1 banana", "15g walnuts", "1 tsp honey", "cinnamon"],
                                    steps: ["Cook oats with milk until creamy", "Top with banana and walnuts", "Drizzle honey and sprinkle cinnamon"],
                                    nutrition: {kcal: 445, protein: 18, carbs: 58, fat: 16, fiber: 6, sodium: 120}
                                },
                                lunch: {
                                    title: "Mediterranean Salmon Salad",
                                    time: "13:00",
                                    tags: ["Omega-3", "Mediterranean"],
                                    prep_time: "12 min",
                                    ingredients: ["100g salmon", "mixed greens", "cucumber", "tomatoes", "30g feta", "olives (rinsed)", "olive oil", "lemon"],
                                    steps: ["Arrange greens and vegetables", "Top with salmon and feta", "Dress with oil and lemon"],
                                    nutrition: {kcal: 385, protein: 28, carbs: 8, fat: 25, fiber: 4, sodium: 520}
                                },
                                dinner: {
                                    title: "Chicken & Sweet Potato",
                                    time: "18:30",
                                    tags: ["Roasted", "Colorful"],
                                    prep_time: "30 min",
                                    ingredients: ["120g chicken breast", "150g sweet potato", "broccoli", "bell pepper", "olive oil", "herbs"],
                                    steps: ["Roast sweet potato and vegetables", "Season and cook chicken", "Serve together with herbs"],
                                    nutrition: {kcal: 420, protein: 32, carbs: 35, fat: 16, fiber: 6, sodium: 200}
                                },
                                snacks: [
                                    {
                                        title: "Greek Yogurt & Berries",
                                        time: "15:30",
                                        ingredients: ["150g Greek yogurt", "½ cup mixed berries"],
                                        nutrition: {kcal: 160, protein: 15, carbs: 18, fat: 4, fiber: 3, sodium: 60}
                                    }
                                ]
                            }
                        },
                        B: {
                            theme: "Fish & Grains",
                            meals: {
                                breakfast: {
                                    title: "Berry & Nut Yogurt Bowl",
                                    time: "8:00",
                                    tags: ["Antioxidant", "Quick"],
                                    prep_time: "4 min",
                                    ingredients: ["150g Greek yogurt", "80g mixed berries", "20g mixed nuts", "1 tsp honey"],
                                    steps: ["Spoon yogurt into bowl", "Top with berries and nuts", "Drizzle with honey"],
                                    nutrition: {kcal: 380, protein: 20, carbs: 25, fat: 22, fiber: 4, sodium: 90}
                                },
                                lunch: {
                                    title: "Tuna & Avocado Toast",
                                    time: "13:00",
                                    tags: ["Quick", "Protein-rich"],
                                    prep_time: "8 min",
                                    ingredients: ["1 tin tuna in water", "½ avocado", "1 slice whole-grain toast", "lemon juice", "mixed greens"],
                                    steps: ["Toast bread", "Mash avocado with lemon", "Top with tuna and serve with greens"],
                                    nutrition: {kcal: 410, protein: 30, carbs: 28, fat: 19, fiber: 6, sodium: 320}
                                },
                                dinner: {
                                    title: "Lemon Herb Mackerel",
                                    time: "18:30",
                                    tags: ["Omega-3", "Quick-cook"],
                                    prep_time: "15 min",
                                    ingredients: ["120g mackerel fillet", "100g brown rice", "spinach", "lemon", "olive oil", "herbs"],
                                    steps: ["Cook mackerel with lemon and herbs", "Serve over rice", "Add spinach sautéed with oil"],
                                    nutrition: {kcal: 495, protein: 35, carbs: 38, fat: 22, fiber: 5, sodium: 220}
                                },
                                snacks: [
                                    {
                                        title: "Apple & Walnuts",
                                        time: "11:00",
                                        ingredients: ["1 apple", "8 walnut halves"],
                                        nutrition: {kcal: 180, protein: 4, carbs: 20, fat: 12, fiber: 4, sodium: 0}
                                    }
                                ]
                            }
                        },
                        C: {
                            theme: "Comfort Foods",
                            meals: {
                                breakfast: {
                                    title: "Feta & Spinach Scramble",
                                    time: "8:00",
                                    tags: ["Protein-rich", "Savory"],
                                    prep_time: "8 min",
                                    ingredients: ["2 eggs", "handful spinach", "30g feta", "1 slice toast"],
                                    steps: ["Scramble eggs with spinach", "Add crumbled feta", "Serve with toast"],
                                    nutrition: {kcal: 350, protein: 22, carbs: 18, fat: 21, fiber: 4, sodium: 450}
                                },
                                lunch: {
                                    title: "Turkey & Lentil Soup",
                                    time: "13:00",
                                    tags: ["Warming", "Fiber-rich"],
                                    prep_time: "25 min",
                                    ingredients: ["100g turkey mince", "½ cup red lentils", "vegetables", "low-sodium broth", "herbs"],
                                    steps: ["Brown turkey", "Add lentils and vegetables", "Simmer until tender"],
                                    nutrition: {kcal: 380, protein: 35, carbs: 32, fat: 12, fiber: 8, sodium: 300}
                                },
                                dinner: {
                                    title: "Baked Cod & Asparagus",
                                    time: "18:30",
                                    tags: ["Light", "Spring"],
                                    prep_time: "20 min",
                                    ingredients: ["150g cod", "asparagus spears", "quinoa", "lemon", "olive oil"],
                                    steps: ["Bake cod with asparagus", "Cook quinoa separately", "Serve with lemon and oil"],
                                    nutrition: {kcal: 420, protein: 38, carbs: 30, fat: 16, fiber: 5, sodium: 180}
                                },
                                snacks: [
                                    {
                                        title: "Hummus & Vegetables",
                                        time: "16:00",
                                        ingredients: ["3 tbsp hummus", "cucumber", "bell pepper strips"],
                                        nutrition: {kcal: 120, protein: 4, carbs: 12, fat: 6, fiber: 4, sodium: 180}
                                    }
                                ]
                            }
                        }
                    }
                },
                C: {
                    name: "Comfort Block",
                    description: "Satisfying meals with familiar flavors",
                    miniBlocks: {
                        A: {
                            theme: "Hearty & Warming",
                            meals: {
                                breakfast: {
                                    title: "Coconut Chia Pudding",
                                    time: "8:00",
                                    tags: ["Make-ahead", "Tropical"],
                                    prep_time: "5 min",
                                    ingredients: ["3 tbsp chia seeds", "½ cup light coconut milk", "½ cup almond milk", "½ cup mango", "2 tbsp almonds"],
                                    steps: ["Mix chia with milks", "Refrigerate overnight", "Top with mango and almonds"],
                                    nutrition: {kcal: 450, protein: 10, carbs: 35, fat: 30, fiber: 10, sodium: 50}
                                },
                                lunch: {
                                    title: "Wild Rice & Tuna Salad",
                                    time: "13:00",
                                    tags: ["Protein-rich", "Filling"],
                                    prep_time: "15 min",
                                    ingredients: ["100g tuna", "1 cup cooked wild rice", "cucumber", "red pepper", "herbs", "olive oil", "lemon"],
                                    steps: ["Mix rice with vegetables", "Add tuna and herbs", "Dress with oil and lemon"],
                                    nutrition: {kcal: 380, protein: 30, carbs: 32, fat: 15, fiber: 4, sodium: 300}
                                },
                                dinner: {
                                    title: "Turkey Meatballs & Courgette Noodles",
                                    time: "18:30",
                                    tags: ["Low-carb", "Satisfying"],
                                    prep_time: "20 min",
                                    ingredients: ["125g turkey mince", "courgette noodles", "tomato passata", "herbs", "olive oil"],
                                    steps: ["Form and cook meatballs", "Spiralize courgette", "Serve with warmed passata"],
                                    nutrition: {kcal: 400, protein: 30, carbs: 15, fat: 25, fiber: 4, sodium: 300}
                                },
                                snacks: [
                                    {
                                        title: "Mixed Nuts",
                                        time: "15:30",
                                        ingredients: ["2 tbsp mixed nuts"],
                                        nutrition: {kcal: 160, protein: 5, carbs: 4, fat: 14, fiber: 2, sodium: 0}
                                    }
                                ]
                            }
                        },
                        B: {
                            theme: "International",
                            meals: {
                                breakfast: {
                                    title: "Avocado Toast + Eggs",
                                    time: "8:00",
                                    tags: ["Healthy fats", "Protein"],
                                    prep_time: "8 min",
                                    ingredients: ["2 eggs", "1 slice whole-grain toast", "½ avocado", "lemon", "herbs"],
                                    steps: ["Toast bread and mash avocado", "Cook eggs as preferred", "Assemble with herbs and lemon"],
                                    nutrition: {kcal: 380, protein: 20, carbs: 24, fat: 22, fiber: 6, sodium: 320}
                                },
                                lunch: {
                                    title: "Chicken Shawarma Bowl",
                                    time: "13:00",
                                    tags: ["Mediterranean", "Spiced"],
                                    prep_time: "15 min",
                                    ingredients: ["100g chicken breast", "mixed greens", "cucumber", "tomato", "Greek yogurt sauce"],
                                    steps: ["Cook spiced chicken", "Arrange salad ingredients", "Serve with yogurt sauce"],
                                    nutrition: {kcal: 350, protein: 35, carbs: 12, fat: 18, fiber: 4, sodium: 260}
                                },
                                dinner: {
                                    title: "Salmon & Sweet Potato Mash",
                                    time: "18:30",
                                    tags: ["Omega-3", "Comfort"],
                                    prep_time: "25 min",
                                    ingredients: ["150g salmon", "sweet potato", "greens", "olive oil"],
                                    steps: ["Bake salmon", "Mash sweet potato", "Serve with sautéed greens"],
                                    nutrition: {kcal: 480, protein: 35, carbs: 38, fat: 20, fiber: 6, sodium: 220}
                                },
                                snacks: [
                                    {
                                        title: "Kefir Smoothie",
                                        time: "11:00",
                                        ingredients: ["½ cup kefir", "½ banana", "handful spinach"],
                                        nutrition: {kcal: 140, protein: 8, carbs: 18, fat: 4, fiber: 3, sodium: 80}
                                    }
                                ]
                            }
                        },
                        C: {
                            theme: "Weekend Comfort",
                            meals: {
                                breakfast: {
                                    title: "Tropical Overnight Oats",
                                    time: "8:00",
                                    tags: ["Make-ahead", "Tropical"],
                                    prep_time: "5 min prep",
                                    ingredients: ["50g oats", "almond milk", "chia seeds", "mango pieces", "coconut flakes"],
                                    steps: ["Mix oats, chia, and almond milk", "Refrigerate overnight", "Top with mango and coconut"],
                                    nutrition: {kcal: 400, protein: 12, carbs: 55, fat: 15, fiber: 8, sodium: 100}
                                },
                                lunch: {
                                    title: "Tuna Salad Peppers",
                                    time: "13:00",
                                    tags: ["Low-carb", "Colorful"],
                                    prep_time: "10 min",
                                    ingredients: ["1 tin tuna", "Greek yogurt", "bell pepper halves", "herbs"],
                                    steps: ["Mix tuna with yogurt and herbs", "Stuff into pepper halves", "Serve chilled"],
                                    nutrition: {kcal: 330, protein: 30, carbs: 15, fat: 15, fiber: 4, sodium: 260}
                                },
                                dinner: {
                                    title: "Herb-Crusted Chicken & Vegetables",
                                    time: "18:30",
                                    tags: ["Sunday special", "Batch-friendly"],
                                    prep_time: "30 min",
                                    ingredients: ["150g chicken breast", "mixed vegetables", "herbs", "olive oil", "quinoa"],
                                    steps: ["Coat chicken with herbs", "Roast with vegetables", "Serve over quinoa"],
                                    nutrition: {kcal: 460, protein: 38, carbs: 35, fat: 18, fiber: 6, sodium: 200}
                                },
                                snacks: [
                                    {
                                        title: "Berry Bowl",
                                        time: "16:00",
                                        ingredients: ["1 cup mixed berries", "2 tbsp Greek yogurt"],
                                        nutrition: {kcal: 100, protein: 4, carbs: 18, fat: 2, fiber: 4, sodium: 20}
                                    }
                                ]
                            }
                        }
                    }
                }
            },
            freeDaySuggestions: [
                {
                    option: "Leftover Remix",
                    description: "Use components from the week's mini-blocks in new combinations"
                },
                {
                    option: "Simple Comfort",
                    description: "Easy one-pot meal like soup, stew, or stir-fry"
                },
                {
                    option: "Social Meal",
                    description: "Plan for dining out or cooking with family/friends"
                },
                {
                    option: "Prep Day",
                    description: "Batch cook components for next week while enjoying simple meals"
                }
            ],
            groceryList: {
                produce: ["mixed greens", "spinach", "broccoli", "asparagus", "sweet potatoes", "carrots", "bell peppers", "tomatoes", "cucumber", "avocados", "fresh herbs", "lemons", "bananas", "mixed berries", "apples", "mango"],
                proteins: ["chicken breast", "turkey mince", "salmon", "cod", "mackerel", "trout", "tuna in water", "eggs", "Greek yogurt", "feta cheese", "kefir"],
                pantry: ["quinoa", "brown rice", "wild rice", "oats", "whole-grain bread", "olive oil", "nuts", "seeds", "chia seeds", "herbs and spices", "coconut milk", "almond milk"]
            },
            timeSavingTips: [
                "Mini Block A uses same meals Monday & Wednesday - prep once, eat twice",
                "Mini Block B repeats Tuesday & Thursday - batch cook proteins",
                "Mini Block C covers Friday & Saturday - perfect for weekend meal prep",
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
    
    setupEventListeners() {
        // Search
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value.toLowerCase();
                this.updateView();
            });
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
    
    generateWeekButtons() {
        const container = document.getElementById('week-buttons');
        if (!container) return;
        
        container.innerHTML = '';
        
        for (let i = 1; i <= 12; i++) {
            const button = document.createElement('button');
            button.className = `week-btn ${i === this.currentWeek ? 'active' : ''}`;
            button.textContent = `Week ${i}`;
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchWeek(i);
            });
            container.appendChild(button);
        }
    }
    
    generateDayButtons() {
        const container = document.getElementById('day-buttons');
        if (!container) return;
        
        container.innerHTML = '';
        
        for (let i = 1; i <= 7; i++) {
            const button = document.createElement('button');
            button.className = `day-btn ${i === this.currentDay ? 'active' : ''}`;
            button.textContent = i;
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchDay(i);
            });
            container.appendChild(button);
        }
    }
    
    generateWeekGrid() {
        const container = document.getElementById('week-grid');
        if (!container) return;
        
        container.innerHTML = '';
        
        for (let day = 1; day <= 7; day++) {
            const tile = document.createElement('div');
            const miniBlock = this.miniBlockSchedule[day];
            
            tile.className = `day-tile ${day === this.currentDay ? 'active' : ''} ${miniBlock === 'Free' ? 'free-day' : 'mini-' + miniBlock.toLowerCase()}`;
            tile.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchDay(day);
            });
            
            tile.innerHTML = `
                <div class="day-name">${this.dayNames[day - 1]}</div>
                <div class="day-number">${day}</div>
                <div class="mini-block-label">${miniBlock === 'Free' ? 'Free Day' : 'Mini ' + miniBlock}</div>
            `;
            
            container.appendChild(tile);
        }
    }
    
    switchWeek(week) {
        this.currentWeek = week;
        // Keep current day when switching weeks
        
        // Update week button states
        document.querySelectorAll('.week-btn').forEach((btn, index) => {
            btn.classList.toggle('active', index + 1 === week);
        });
        
        this.updateView();
    }
    
    switchDay(day) {
        this.currentDay = day;
        
        // Update day button states
        document.querySelectorAll('.day-btn').forEach((btn, index) => {
            btn.classList.toggle('active', index + 1 === day);
        });
        
        this.updateView();
    }
    
    changeDay(direction) {
        const newDay = this.currentDay + direction;
        if (newDay >= 1 && newDay <= 7) {
            this.switchDay(newDay);
        }
    }
    
    getCurrentBlock() {
        const majorBlock = this.weekRotation[this.currentWeek];
        return this.data.blocks[majorBlock];
    }
    
    getCurrentMiniBlock() {
        const miniBlockKey = this.miniBlockSchedule[this.currentDay];
        if (miniBlockKey === 'Free') return null;
        
        const block = this.getCurrentBlock();
        return block.miniBlocks[miniBlockKey];
    }
    
    getCurrentDayMeals() {
        const miniBlock = this.getCurrentMiniBlock();
        if (!miniBlock) return null;
        
        const meals = [];
        const mealData = miniBlock.meals;
        
        // Add breakfast
        if (mealData.breakfast) {
            meals.push({
                type: "Breakfast",
                ...mealData.breakfast
            });
        }
        
        // Add snacks
        if (mealData.snacks && mealData.snacks.length > 0) {
            mealData.snacks.forEach(snack => {
                meals.push({
                    type: "Snack",
                    prep_time: "2 min",
                    tags: ["Quick"],
                    steps: ["Prepare as indicated"],
                    ...snack
                });
            });
        }
        
        // Add lunch
        if (mealData.lunch) {
            meals.push({
                type: "Lunch",
                ...mealData.lunch
            });
        }
        
        // Add dinner
        if (mealData.dinner) {
            meals.push({
                type: "Dinner",
                ...mealData.dinner
            });
        }
        
        return meals;
    }
    
    calculateDayTotals(meals) {
        const totals = {kcal: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sodium: 0, sat_fat: 0};
        
        if (!meals) return totals;
        
        meals.forEach(meal => {
            if (meal.nutrition) {
                Object.keys(totals).forEach(key => {
                    totals[key] += meal.nutrition[key] || 0;
                });
            }
        });
        
        return totals;
    }
    
    updateView() {
        const block = this.getCurrentBlock();
        const miniBlock = this.getCurrentMiniBlock();
        const meals = this.getCurrentDayMeals();
        const isFreeDay = this.miniBlockSchedule[this.currentDay] === 'Free';
        
        // Update progress
        const progressText = document.getElementById('progress-text');
        if (progressText) {
            progressText.textContent = `Week ${this.currentWeek} of 12`;
        }
        
        // Update block info
        const blockTitle = document.getElementById('block-title');
        const blockBadge = document.getElementById('block-badge');
        const blockDescription = document.getElementById('block-description');
        
        if (blockTitle) blockTitle.textContent = block.name;
        if (blockBadge) blockBadge.textContent = `Block ${this.weekRotation[this.currentWeek]}`;
        if (blockDescription) blockDescription.textContent = block.description;
        
        // Update day title
        const dayTitle = document.getElementById('day-title');
        const dayMeta = document.getElementById('day-meta');
        
        if (dayTitle) {
            dayTitle.textContent = `${this.dayNames[this.currentDay - 1]} (Day ${this.currentDay})`;
        }
        
        if (dayMeta) {
            if (isFreeDay) {
                dayMeta.textContent = "Free Day - Plan your own meals or try suggestions below";
            } else {
                dayMeta.textContent = `Mini Block ${this.miniBlockSchedule[this.currentDay]} - ${miniBlock.theme}`;
            }
        }
        
        // Generate week grid
        this.generateWeekGrid();
        
        // Show/hide content based on day type
        const mealsContainer = document.getElementById('meals-container');
        const freeDayContent = document.getElementById('free-day-content');
        const dailySummary = document.getElementById('daily-summary');
        
        if (isFreeDay) {
            if (mealsContainer) mealsContainer.style.display = 'none';
            if (dailySummary) dailySummary.style.display = 'none';
            if (freeDayContent) {
                freeDayContent.classList.remove('hidden');
                freeDayContent.style.display = 'block';
                this.renderFreeDayContent();
            }
        } else {
            if (mealsContainer) {
                mealsContainer.style.display = 'block';
                this.renderMeals(meals);
            }
            if (dailySummary) {
                dailySummary.style.display = 'block';
                this.renderDailyTotals(this.calculateDayTotals(meals));
                this.renderWhyWorks(miniBlock);
            }
            if (freeDayContent) {
                freeDayContent.classList.add('hidden');
                freeDayContent.style.display = 'none';
            }
        }
        
        // Update grocery list and tips
        this.renderGroceryList();
        this.renderTips();
        
        // Update navigation states
        const prevBtn = document.getElementById('prev-day');
        const nextBtn = document.getElementById('next-day');
        if (prevBtn) prevBtn.disabled = this.currentDay === 1;
        if (nextBtn) nextBtn.disabled = this.currentDay === 7;
        
        // Update breadcrumb
        const breadcrumb = document.getElementById('breadcrumb');
        if (breadcrumb) {
            const miniBlockText = isFreeDay ? 'Free Day' : `Mini Block ${this.miniBlockSchedule[this.currentDay]}`;
            breadcrumb.textContent = `Week ${this.currentWeek} → Day ${this.currentDay} (${this.dayNames[this.currentDay - 1]}) → ${miniBlockText}`;
        }
    }
    
    renderFreeDayContent() {
        const container = document.getElementById('free-day-options');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.data.freeDaySuggestions.forEach(suggestion => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'free-day-option';
            optionDiv.innerHTML = `
                <h5>${suggestion.option}</h5>
                <p>${suggestion.description}</p>
            `;
            container.appendChild(optionDiv);
        });
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
                container.innerHTML = `<div class="card"><div class="card__body"><p>No meals found matching "${this.searchQuery}". Try a different search term.</p></div></div>`;
                return;
            }
        }
        
        filteredMeals.forEach(meal => {
            const mealCard = document.createElement('div');
            mealCard.className = 'meal-card';
            
            mealCard.innerHTML = `
                <div class="meal-card__header">
                    <div class="meal-meta">
                        <span class="meal-type-time">${meal.type} (${meal.time})</span>
                        <span class="meal-portion-time">Serves 1 • ${meal.prep_time}</span>
                    </div>
                    <h4 class="meal-title">${meal.title}</h4>
                    <div class="meal-tags">
                        ${(meal.tags || []).map(tag => `<span class="meal-tag">${tag}</span>`).join('')}
                    </div>
                </div>
                <div class="meal-card__body">
                    <div class="ingredients-section">
                        <h5 class="section-title">Ingredients</h5>
                        <ul class="ingredients-list">
                            ${(meal.ingredients || []).map(ingredient => `<li>${ingredient}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="steps-section">
                        <h5 class="section-title">Steps</h5>
                        <ol class="steps-list">
                            ${(meal.steps || []).map(step => `<li>${step}</li>`).join('')}
                        </ol>
                    </div>
                    <div class="nutrition-section">
                        <h5 class="section-title">Nutrition per serving</h5>
                        <div class="nutrition-grid">
                            <div class="nutrition-item">
                                <span class="nutrition-value">${meal.nutrition?.kcal || 0}</span>
                                <span class="nutrition-label">kcal</span>
                            </div>
                            <div class="nutrition-item">
                                <span class="nutrition-value">${meal.nutrition?.protein || 0}g</span>
                                <span class="nutrition-label">protein</span>
                            </div>
                            <div class="nutrition-item">
                                <span class="nutrition-value">${meal.nutrition?.carbs || 0}g</span>
                                <span class="nutrition-label">carbs</span>
                            </div>
                            <div class="nutrition-item">
                                <span class="nutrition-value">${meal.nutrition?.fat || 0}g</span>
                                <span class="nutrition-label">fat</span>
                            </div>
                            <div class="nutrition-item">
                                <span class="nutrition-value">${meal.nutrition?.fiber || 0}g</span>
                                <span class="nutrition-label">fiber</span>
                            </div>
                            <div class="nutrition-item">
                                <span class="nutrition-value">${meal.nutrition?.sodium || 0}mg</span>
                                <span class="nutrition-label">sodium</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            container.appendChild(mealCard);
        });
    }
    
    renderDailyTotals(totals) {
        const container = document.getElementById('daily-totals');
        if (!container) return;
        
        container.innerHTML = `
            <div class="nutrition-item">
                <span class="nutrition-value">${Math.round(totals.kcal)}</span>
                <span class="nutrition-label">kcal</span>
            </div>
            <div class="nutrition-item">
                <span class="nutrition-value">${Math.round(totals.protein)}g</span>
                <span class="nutrition-label">protein</span>
            </div>
            <div class="nutrition-item">
                <span class="nutrition-value">${Math.round(totals.carbs)}g</span>
                <span class="nutrition-label">carbs</span>
            </div>
            <div class="nutrition-item">
                <span class="nutrition-value">${Math.round(totals.fat)}g</span>
                <span class="nutrition-label">fat</span>
            </div>
            <div class="nutrition-item">
                <span class="nutrition-value">${Math.round(totals.fiber)}g</span>
                <span class="nutrition-label">fiber</span>
            </div>
            <div class="nutrition-item">
                <span class="nutrition-value">${Math.round(totals.sodium)}mg</span>
                <span class="nutrition-label">sodium</span>
            </div>
        `;
        
        // Add nutrition alerts
        const alertsContainer = document.getElementById('nutrition-alerts');
        if (!alertsContainer) return;
        
        alertsContainer.innerHTML = '';
        
        const alerts = [];
        
        if (totals.kcal >= this.nutritionTargets.calories.min && totals.kcal <= this.nutritionTargets.calories.max) {
            alerts.push({type: 'success', text: `Perfect calorie range (${Math.round(totals.kcal)} kcal)!`});
        } else if (totals.kcal < this.nutritionTargets.calories.min) {
            alerts.push({type: 'warning', text: `Calories below target. Consider adding a healthy snack.`});
        }
        
        if (totals.protein >= this.nutritionTargets.protein.min) {
            alerts.push({type: 'success', text: `Excellent protein intake (${Math.round(totals.protein)}g)!`});
        } else {
            alerts.push({type: 'warning', text: `Protein below target. Add protein-rich snack.`});
        }
        
        if (totals.fiber >= this.nutritionTargets.fiber.min) {
            alerts.push({type: 'success', text: `Outstanding fiber intake (${Math.round(totals.fiber)}g)!`});
        }
        
        if (totals.sodium > this.nutritionTargets.sodium.max) {
            alerts.push({type: 'warning', text: `Sodium above limit. Rinse canned items and use low-sodium alternatives.`});
        }
        
        alerts.forEach(alert => {
            const alertDiv = document.createElement('div');
            alertDiv.className = `alert alert--${alert.type}`;
            alertDiv.textContent = alert.text;
            alertsContainer.appendChild(alertDiv);
        });
    }
    
    renderWhyWorks(miniBlock) {
        const container = document.getElementById('why-works-text');
        if (!container || !miniBlock) return;
        
        const reasons = [
            "Balanced macronutrients support sustained energy throughout the day.",
            "Anti-inflammatory ingredients help manage hip inflammation.",
            "Thyroid-supporting nutrients complement medication.",
            "Statin-safe ingredients avoid problematic interactions.",
            "Moderate sodium levels support cardiovascular health.",
            "High fiber content promotes digestive health and satiety."
        ];
        
        container.textContent = reasons[Math.floor(Math.random() * reasons.length)];
    }
    
    renderGroceryList() {
        const produce = document.getElementById('produce-list');
        const proteins = document.getElementById('proteins-list');
        const pantry = document.getElementById('pantry-list');
        
        if (produce) produce.innerHTML = this.data.groceryList.produce.map(item => `<li>${item}</li>`).join('');
        if (proteins) proteins.innerHTML = this.data.groceryList.proteins.map(item => `<li>${item}</li>`).join('');
        if (pantry) pantry.innerHTML = this.data.groceryList.pantry.map(item => `<li>${item}</li>`).join('');
    }
    
    renderTips() {
        const tipsContainer = document.getElementById('tips-list');
        if (tipsContainer) {
            tipsContainer.innerHTML = this.data.timeSavingTips.map(tip => `<li>${tip}</li>`).join('');
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MealPlanApp();
});