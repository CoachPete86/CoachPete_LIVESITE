// Enhanced Application State for Jolene Reset v2
let appState = {
    currentSection: 'home',
    currentPhase: 1, // 1 = Foundation (Weeks 1-4), 2 = Optimisation (Weeks 5-8)
    currentWeek: 1,
    currentDay: 'monday',
    settings: {
        garlicOnionAlerts: true,
        supermarket: 'ms' // 'ms' or 'sainsburys'
    },
    dailyProgress: {
        meals: [false, false, false, false, false],
        steps: 0,
        challenges: [false, false, false, false],
        learning: false,
        emergencyUsed: false
    },
    weeklyStats: {
        mealsCompleted: 0,
        averageSteps: 0,
        challengesSolved: 0,
        learningDays: 0
    },
    prepTimer: {
        active: false,
        timeLeft: 1800, // 30 minutes in seconds
        currentStep: 0
    }
};

// Enhanced meal plan data with Phase 1 & 2 templates
const mealTemplates = {
    phase1: {
        A: {
            name: "Protein Power Day",
            meals: {
                breakfast: {
                    name: "Greek yoghurt power bowl",
                    ingredients: ["Greek yogurt", "Mixed nuts", "Berries", "Hemp hearts"],
                    method: ["Mix yogurt in bowl", "Top with nuts and berries", "Sprinkle hemp hearts"],
                    hasGarlicOnion: false
                },
                lunch: {
                    name: "No-cook protein salad",
                    ingredients: ["Smoked salmon", "Mixed greens", "Avocado", "Olive oil", "Lemon"],
                    method: ["Arrange greens on plate", "Add salmon and avocado", "Drizzle with oil and lemon"],
                    hasGarlicOnion: false
                },
                dinner: {
                    name: "Simple baked salmon",
                    ingredients: ["Salmon fillet", "Sweet potato", "Broccoli", "Olive oil"],
                    method: ["Bake salmon 15 mins at 200°C", "Roast sweet potato", "Steam broccoli"],
                    hasGarlicOnion: false
                },
                snacks: [
                    { name: "Apple + almond butter", hasGarlicOnion: false },
                    { name: "Mixed nuts + olives", hasGarlicOnion: false }
                ]
            }
        },
        B: {
            name: "Warming Comfort Day",
            meals: {
                breakfast: {
                    name: "Warming porridge bowl",
                    ingredients: ["Oats", "Coconut milk", "Cinnamon", "Walnuts"],
                    method: ["Cook oats with coconut milk", "Add cinnamon", "Top with walnuts"],
                    hasGarlicOnion: false
                },
                lunch: {
                    name: "Warm chicken & quinoa bowl",
                    ingredients: ["Chicken breast", "Quinoa", "Roasted vegetables", "Herbs"],
                    method: ["Cook quinoa", "Grill chicken", "Roast vegetables", "Combine and season"],
                    hasGarlicOnion: true // May contain herbs with garlic
                },
                dinner: {
                    name: "Easy fish & sweet potato",
                    ingredients: ["White fish", "Sweet potato", "Green beans", "Lemon"],
                    method: ["Bake fish with lemon", "Roast sweet potato", "Steam green beans"],
                    hasGarlicOnion: false
                },
                snacks: [
                    { name: "Kefir smoothie", hasGarlicOnion: false },
                    { name: "Oatcakes + hummus", hasGarlicOnion: true } // Hummus may contain garlic
                ]
            }
        },
        C: {
            name: "Super Quick Day",
            meals: {
                breakfast: {
                    name: "Protein smoothie",
                    ingredients: ["Protein powder", "Banana", "Spinach", "Almond milk"],
                    method: ["Add all to blender", "Blend until smooth", "Serve immediately"],
                    hasGarlicOnion: false
                },
                lunch: {
                    name: "Smoked salmon plate",
                    ingredients: ["Smoked salmon", "Cucumber", "Cream cheese", "Capers"],
                    method: ["Arrange salmon on plate", "Slice cucumber", "Add dollops of cream cheese"],
                    hasGarlicOnion: false
                },
                dinner: {
                    name: "Ready-to-eat protein bowl",
                    ingredients: ["Pre-cooked chicken", "Bagged salad", "Avocado", "Seeds"],
                    method: ["Combine ingredients", "Add dressing", "Sprinkle seeds"],
                    hasGarlicOnion: false
                },
                snacks: [
                    { name: "Greek yoghurt + berries", hasGarlicOnion: false },
                    { name: "Hard-boiled eggs + cucumber", hasGarlicOnion: false }
                ]
            }
        }
    },
    phase2: {
        A: {
            name: "Gut-Healing Day",
            meals: {
                breakfast: {
                    name: "Gut-healing yoghurt bowl",
                    ingredients: ["Probiotic yogurt", "Kefir", "Prebiotic fiber", "Berries"],
                    method: ["Mix yogurt and kefir", "Add fiber supplement", "Top with berries"],
                    hasGarlicOnion: false
                },
                lunch: {
                    name: "Warming veg soup with chicken",
                    ingredients: ["Bone broth", "Chicken", "Root vegetables", "Herbs"],
                    method: ["Heat broth", "Add vegetables", "Simmer with chicken and herbs"],
                    hasGarlicOnion: true // May contain garlic in herbs
                },
                dinner: {
                    name: "Asian-style fish & veg",
                    ingredients: ["Fish fillet", "Bok choy", "Ginger", "Coconut aminos"],
                    method: ["Steam fish with ginger", "Stir-fry bok choy", "Season with aminos"],
                    hasGarlicOnion: false
                },
                snacks: [
                    { name: "Bone broth", hasGarlicOnion: false },
                    { name: "Mixed nuts", hasGarlicOnion: false }
                ]
            }
        },
        B: {
            name: "Anti-Inflammatory Day",
            meals: {
                breakfast: {
                    name: "Turmeric ginger porridge",
                    ingredients: ["Oats", "Turmeric", "Ginger", "Coconut milk", "Honey"],
                    method: ["Cook oats with spices", "Add coconut milk", "Sweeten with honey"],
                    hasGarlicOnion: false
                },
                lunch: {
                    name: "Probiotic-rich salad bowl",
                    ingredients: ["Fermented vegetables", "Mixed greens", "Chicken", "Olive oil"],
                    method: ["Combine greens and fermented veg", "Add protein", "Dress with oil"],
                    hasGarlicOnion: true // Fermented vegetables may contain garlic
                },
                dinner: {
                    name: "One-pot healing stew",
                    ingredients: ["Beef", "Root vegetables", "Herbs", "Bone broth"],
                    method: ["Brown beef", "Add vegetables and broth", "Simmer with herbs"],
                    hasGarlicOnion: true // May contain garlic in herbs
                },
                snacks: [
                    { name: "Kefir smoothie", hasGarlicOnion: false },
                    { name: "Veg sticks + tahini", hasGarlicOnion: false }
                ]
            }
        },
        C: {
            name: "Flexible Quick Day",
            meals: {
                breakfast: {
                    name: "Protein smoothie",
                    ingredients: ["Protein powder", "Banana", "Spinach", "Almond milk"],
                    method: ["Add all to blender", "Blend until smooth", "Serve immediately"],
                    hasGarlicOnion: false
                },
                lunch: {
                    name: "Smoked salmon plate",
                    ingredients: ["Smoked salmon", "Cucumber", "Cream cheese", "Capers"],
                    method: ["Arrange salmon on plate", "Slice cucumber", "Add dollops of cream cheese"],
                    hasGarlicOnion: false
                },
                dinner: {
                    name: "Ready-to-eat protein bowl",
                    ingredients: ["Pre-cooked chicken", "Bagged salad", "Avocado", "Seeds"],
                    method: ["Combine ingredients", "Add dressing", "Sprinkle seeds"],
                    hasGarlicOnion: false
                },
                snacks: [
                    { name: "Greek yoghurt + berries", hasGarlicOnion: false },
                    { name: "Hard-boiled eggs + cucumber", hasGarlicOnion: false }
                ]
            }
        }
    }
};

// Shopping list data by supermarket
const shoppingLists = {
    ms: {
        produce: ["M&S Organic Spinach", "M&S Baby Salad Leaves", "M&S Avocados", "M&S Sweet Potatoes", "M&S Broccoli"],
        dairy: ["M&S Greek Yogurt", "M&S Kefir", "M&S Coconut Milk", "M&S Free-Range Eggs"],
        pantry: ["M&S Rolled Oats", "M&S Extra Virgin Olive Oil", "M&S Mixed Nuts", "M&S Hemp Hearts"],
        frozen: ["M&S Frozen Berries", "M&S Frozen Salmon Fillets"],
        deli: ["M&S Smoked Salmon", "M&S Organic Chicken Breast", "M&S Almond Butter"]
    },
    sainsburys: {
        produce: ["Sainsbury's Organic Spinach", "Sainsbury's Mixed Leaves", "Sainsbury's Avocados", "Sainsbury's Sweet Potatoes", "Sainsbury's Broccoli"],
        dairy: ["Sainsbury's Greek Yogurt", "Sainsbury's Kefir", "Sainsbury's Coconut Milk", "Sainsbury's Free-Range Eggs"],
        pantry: ["Sainsbury's Porridge Oats", "Sainsbury's Olive Oil", "Sainsbury's Mixed Nuts", "Sainsbury's Seeds"],
        frozen: ["Sainsbury's Frozen Berries", "Sainsbury's Frozen Fish"],
        deli: ["Sainsbury's Smoked Salmon", "Sainsbury's Chicken Breast", "Sainsbury's Nut Butter"]
    }
};

// Emergency backup meals
const emergencyMeals = {
    1: {
        name: "Quick Protein Plate",
        description: "Hard-boiled eggs + avocado + cucumber + olive oil",
        items: ["Hard-boiled eggs", "Sliced avocado", "Cucumber slices", "Drizzle olive oil"]
    },
    2: {
        name: "Simple Salmon Salad",
        description: "Smoked salmon + mixed greens + tomatoes + lemon",
        items: ["Smoked salmon", "Mixed salad leaves", "Cherry tomatoes", "Lemon wedges"]
    },
    3: {
        name: "Greek Yogurt Bowl",
        description: "Greek yogurt + nuts + berries + honey",
        items: ["Greek yogurt", "Mixed nuts", "Fresh berries", "Drizzle honey"]
    }
};

// Adventure challenges by week
const adventureChallenges = {
    1: [
        "Count the ornate lamp posts along Buckingham Palace front facade",
        "What colour are the pelican beaks in St. James's Park?",
        "Which direction does Nelson's Column face?",
        "How many windows face The Mall from the palace?"
    ]
};

// Step targets by week
const stepTargets = {
    1: 6000, 2: 7000, 3: 8000, 4: 9000,
    5: 10000, 6: 10500, 7: 11000, 8: 11500
};

// Hero carousel messages
const heroMessages = [
    "Remember those trees we climbed? This is how we keep climbing them",
    "Winter adventures build inner strength",
    "Peace comes from within - find yours",
    "Stay playful, stay strong, stay you"
];

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    loadSettings();
    initializeApp();
    setupEventListeners();
    updateAllDisplays();
    startHeroCarousel();
});

function initializeApp() {
    // Set current day based on actual day
    const today = new Date();
    const dayName = today.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    appState.currentDay = dayName;
    
    // Update day selector
    const daySelector = document.getElementById('daySelector');
    if (daySelector) {
        daySelector.value = appState.currentDay;
    }

    // Show Sunday prep flow if it's Sunday
    updateSundayPrepVisibility();
    
    // Initialize challenge list
    updateChallengeList();
}

function setupEventListeners() {
    // Navigation buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            showSection(section);
        });
    });

    // Start Today button
    const startTodayBtn = document.getElementById('startTodayBtn');
    if (startTodayBtn) {
        startTodayBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showSection('meals');
        });
    }

    // Day selector
    const daySelector = document.getElementById('daySelector');
    if (daySelector) {
        daySelector.addEventListener('change', function() {
            appState.currentDay = this.value;
            updateMealPlan();
            updateSundayPrepVisibility();
        });
    }

    // Emergency backup meal button
    const emergencyBtn = document.getElementById('emergencyBtn');
    if (emergencyBtn) {
        emergencyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showEmergencyModal();
        });
    }

    // Emergency modal handlers
    const closeEmergencyModal = document.getElementById('closeEmergencyModal');
    if (closeEmergencyModal) {
        closeEmergencyModal.addEventListener('click', function(e) {
            e.preventDefault();
            hideEmergencyModal();
        });
    }

    document.querySelectorAll('.backup-option').forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const backupId = this.getAttribute('data-backup');
            selectEmergencyMeal(backupId);
        });
    });

    // Modal overlay click to close
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-overlay')) {
            hideEmergencyModal();
        }
    });

    // Supermarket toggle
    const supermarketToggle = document.getElementById('supermarketToggle');
    if (supermarketToggle) {
        supermarketToggle.addEventListener('change', function() {
            appState.settings.supermarket = this.checked ? 'sainsburys' : 'ms';
            saveSettings();
            updateShoppingList();
        });
    }

    // Add All Week button
    const addAllWeekBtn = document.getElementById('addAllWeekBtn');
    if (addAllWeekBtn) {
        addAllWeekBtn.addEventListener('click', function(e) {
            e.preventDefault();
            addAllWeekToShoppingList();
        });
    }

    // Print shopping list button
    const printShoppingBtn = document.getElementById('printShoppingBtn');
    if (printShoppingBtn) {
        printShoppingBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.print();
        });
    }

    // Clear shopping list button
    const clearListBtn = document.getElementById('clearListBtn');
    if (clearListBtn) {
        clearListBtn.addEventListener('click', function(e) {
            e.preventDefault();
            clearShoppingList();
        });
    }

    // Sunday prep timer
    const startPrepBtn = document.getElementById('startPrepBtn');
    if (startPrepBtn) {
        startPrepBtn.addEventListener('click', function(e) {
            e.preventDefault();
            startPrepTimer();
        });
    }

    // Settings - Garlic/Onion toggle
    const garlicOnionToggle = document.getElementById('garlicOnionToggle');
    if (garlicOnionToggle) {
        garlicOnionToggle.checked = appState.settings.garlicOnionAlerts;
        garlicOnionToggle.addEventListener('change', function() {
            appState.settings.garlicOnionAlerts = this.checked;
            saveSettings();
            updateMealPlan(); // Refresh to show/hide alerts
        });
    }

    // Reset progress button
    const resetProgressBtn = document.getElementById('resetProgressBtn');
    if (resetProgressBtn) {
        resetProgressBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
                resetAllProgress();
            }
        });
    }

    // Steps update button
    const updateStepsBtn = document.getElementById('updateStepsBtn');
    if (updateStepsBtn) {
        updateStepsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            updateSteps();
        });
    }

    // Photo upload button
    const photoUploadBtn = document.getElementById('photoUploadBtn');
    const photoUpload = document.getElementById('photoUpload');
    if (photoUploadBtn && photoUpload) {
        photoUploadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            photoUpload.click();
        });
        
        photoUpload.addEventListener('change', function(e) {
            if (e.target.files && e.target.files[0]) {
                showMessage('Photo uploaded successfully! Great job documenting your adventure!', 'success');
            }
        });
    }

    // Dynamic event listeners for checkboxes
    document.addEventListener('change', handleCheckboxChange);
}

function handleCheckboxChange(e) {
    if (e.target.classList.contains('meal-checkbox')) {
        const mealIndex = parseInt(e.target.getAttribute('data-meal')) - 1;
        appState.dailyProgress.meals[mealIndex] = e.target.checked;
        updateAchievements();
    }
    
    if (e.target.classList.contains('challenge-checkbox')) {
        const challengeIndex = parseInt(e.target.getAttribute('data-challenge')) - 1;
        appState.dailyProgress.challenges[challengeIndex] = e.target.checked;
        updateAchievements();
    }
    
    if (e.target.classList.contains('learning-checkbox')) {
        appState.dailyProgress.learning = e.target.checked;
        updateAchievements();
    }

    if (e.target.classList.contains('item-checkbox')) {
        const item = e.target.closest('.shopping-item');
        if (item) {
            item.classList.toggle('checked', e.target.checked);
        }
    }
}

function showSection(sectionId) {
    console.log('Showing section:', sectionId);
    
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });

    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        console.log('Section shown:', sectionId);
    } else {
        console.error('Section not found:', sectionId);
    }

    // Update navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeBtn = document.querySelector(`[data-section="${sectionId}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }

    appState.currentSection = sectionId;
    
    // Load section-specific content
    if (sectionId === 'shopping') {
        updateShoppingList();
    }
    if (sectionId === 'adventure') {
        updateChallengeList();
    }
}

function startHeroCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const heroQuote = document.getElementById('heroQuote');
    let currentSlide = 0;

    if (slides.length === 0) return;

    setInterval(() => {
        // Hide current slide
        slides[currentSlide].classList.remove('active');
        
        // Move to next slide
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Show next slide
        slides[currentSlide].classList.add('active');
        
        // Update quote
        if (heroQuote) {
            heroQuote.textContent = heroMessages[currentSlide];
        }
    }, 4000);
}

function updateMealPlan() {
    const selectedDay = appState.currentDay;
    const currentPhase = appState.currentPhase === 1 ? 'phase1' : 'phase2';
    
    // Determine template based on day and phase
    let templateKey;
    switch (selectedDay) {
        case 'monday':
        case 'thursday':
            templateKey = 'A';
            break;
        case 'tuesday':
        case 'friday':
            templateKey = 'B';
            break;
        case 'wednesday':
        case 'saturday':
            templateKey = 'C';
            break;
        case 'sunday':
            // Sunday is flexible - user can choose any template
            templateKey = 'A'; // Default to A, but show choice options
            break;
        default:
            templateKey = 'A';
    }

    const template = mealTemplates[currentPhase][templateKey];
    const mealPlanContainer = document.getElementById('mealPlan');
    
    if (!template || !mealPlanContainer) return;

    // Build meal plan HTML
    let mealHtml = `
        <div class="meal-plan-header">
            <h3>Template ${templateKey} - ${template.name}</h3>
            ${selectedDay === 'sunday' ? '<p class="sunday-note">Your Choice Day - Pick your favorite template!</p>' : ''}
        </div>
    `;

    const meals = ['breakfast', 'lunch', 'dinner'];
    meals.forEach((mealType, index) => {
        const meal = template.meals[mealType];
        const alertsHtml = appState.settings.garlicOnionAlerts ? 
            `<div class="garlic-onion-alert">
                <span class="alert-icon ${meal.hasGarlicOnion ? 'alert-check' : 'alert-safe'}" title="${meal.hasGarlicOnion ? 'Check ingredients for garlic/onion' : 'Safe - no garlic/onion'}">
                    ${meal.hasGarlicOnion ? '⚠' : '✓'}
                </span>
            </div>` : '';

        mealHtml += `
            <div class="meal-item">
                <div class="meal-time">${capitalize(mealType)}</div>
                <div class="meal-content">
                    <div class="meal-description">
                        ${meal.name}
                        ${alertsHtml}
                    </div>
                    <div class="meal-details">
                        <p><strong>Ingredients:</strong> ${meal.ingredients.join(', ')}</p>
                        <p><strong>Method:</strong></p>
                        <ol>
                            ${meal.method.map(step => `<li>${step}</li>`).join('')}
                        </ol>
                    </div>
                    <label class="checkbox-label">
                        <input type="checkbox" class="meal-checkbox" data-meal="${index + 1}" ${appState.dailyProgress.meals[index] ? 'checked' : ''}>
                        Completed
                    </label>
                </div>
            </div>
        `;
    });

    // Add snacks
    mealHtml += `
        <div class="meal-item">
            <div class="meal-time">Snacks</div>
            <div class="meal-content">
                <div class="meal-description">
                    Daily snack options
                    ${appState.settings.garlicOnionAlerts ? 
                        `<div class="garlic-onion-alert">
                            ${template.meals.snacks.map(snack => 
                                `<span class="alert-icon ${snack.hasGarlicOnion ? 'alert-check' : 'alert-safe'}" title="${snack.name}: ${snack.hasGarlicOnion ? 'Check ingredients' : 'Safe'}">
                                    ${snack.hasGarlicOnion ? '⚠' : '✓'}
                                </span>`
                            ).join('')}
                        </div>` : ''}
                </div>
                <div class="meal-details">
                    <ul>
                        ${template.meals.snacks.map(snack => `<li>${snack.name}</li>`).join('')}
                    </ul>
                </div>
                <label class="checkbox-label">
                    <input type="checkbox" class="meal-checkbox" data-meal="4" ${appState.dailyProgress.meals[3] ? 'checked' : ''}>
                    Completed
                </label>
            </div>
        </div>
    `;

    mealPlanContainer.innerHTML = mealHtml;
    updateTemplatesGrid();
}

function updateTemplatesGrid() {
    const templatesGrid = document.getElementById('templatesGrid');
    if (!templatesGrid) return;

    const currentPhase = appState.currentPhase === 1 ? 'phase1' : 'phase2';
    const templates = mealTemplates[currentPhase];

    const templatesHtml = Object.keys(templates).map(key => {
        const template = templates[key];
        const days = {
            'A': 'Monday, Thursday',
            'B': 'Tuesday, Friday',
            'C': 'Wednesday, Saturday'
        };

        return `
            <div class="template-card">
                <h4>Template ${key} - ${template.name}</h4>
                <p>${days[key]}</p>
                <p class="template-focus">${getTemplateFocus(currentPhase, key)}</p>
            </div>
        `;
    }).join('');

    templatesGrid.innerHTML = templatesHtml;
}

function getTemplateFocus(phase, template) {
    const focuses = {
        phase1: {
            A: "High protein for muscle support and energy",
            B: "Warming, comforting nutrition for recovery",
            C: "Quick, convenient meals for busy days"
        },
        phase2: {
            A: "Gut healing and digestive support",
            B: "Anti-inflammatory foods for optimal health",
            C: "Flexible options for sustainable habits"
        }
    };
    return focuses[phase][template];
}

function updateSundayPrepVisibility() {
    const prepFlow = document.getElementById('prepFlow');
    if (prepFlow) {
        if (appState.currentDay === 'sunday') {
            prepFlow.classList.remove('hidden');
        } else {
            prepFlow.classList.add('hidden');
        }
    }
}

function updateChallengeList() {
    const challengeList = document.getElementById('challengeList');
    if (!challengeList) return;

    const challenges = adventureChallenges[appState.currentWeek] || adventureChallenges[1];
    
    const challengesHtml = challenges.map((challenge, index) => `
        <label class="checkbox-label">
            <input type="checkbox" class="challenge-checkbox" data-challenge="${index + 1}" ${appState.dailyProgress.challenges[index] ? 'checked' : ''}>
            <span class="checkmark"></span>
            ${challenge}
        </label>
    `).join('');

    challengeList.innerHTML = challengesHtml;
}

function startPrepTimer() {
    const startBtn = document.getElementById('startPrepBtn');
    const timerDisplay = document.getElementById('timerDisplay');
    const prepSteps = document.querySelectorAll('.prep-step');

    if (appState.prepTimer.active) return;

    appState.prepTimer.active = true;
    appState.prepTimer.currentStep = 1;
    
    startBtn.textContent = 'Prep in Progress...';
    startBtn.disabled = true;

    // Activate first step
    if (prepSteps[0]) {
        prepSteps[0].classList.add('active');
    }

    const timer = setInterval(() => {
        appState.prepTimer.timeLeft--;
        
        // Update display
        const minutes = Math.floor(appState.prepTimer.timeLeft / 60);
        const seconds = appState.prepTimer.timeLeft % 60;
        timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        // Step transitions (approximate timings)
        const stepTimes = [1800, 1320, 900, 420, 0]; // 30min, 22min, 15min, 7min, 0min
        const currentStepIndex = stepTimes.findIndex(time => appState.prepTimer.timeLeft > time);
        
        if (currentStepIndex !== -1 && currentStepIndex !== appState.prepTimer.currentStep - 1) {
            // Change active step
            prepSteps.forEach(step => step.classList.remove('active'));
            if (prepSteps[currentStepIndex]) {
                prepSteps[currentStepIndex].classList.add('active');
            }
            appState.prepTimer.currentStep = currentStepIndex + 1;
        }

        // Timer finished
        if (appState.prepTimer.timeLeft <= 0) {
            clearInterval(timer);
            prepTimerComplete();
        }
    }, 1000);
}

function prepTimerComplete() {
    appState.prepTimer.active = false;
    appState.prepTimer.timeLeft = 1800; // Reset
    
    const startBtn = document.getElementById('startPrepBtn');
    const timerDisplay = document.getElementById('timerDisplay');
    const prepSteps = document.querySelectorAll('.prep-step');

    startBtn.textContent = 'Start Prep Session';
    startBtn.disabled = false;
    timerDisplay.textContent = '30:00';
    
    // Remove active states
    prepSteps.forEach(step => step.classList.remove('active'));
    
    // Show confetti and success message
    showConfetti();
    showMessage('🎉 Prep session complete! You\'re all set for the week ahead!', 'success');
}

function showConfetti() {
    const container = document.getElementById('confetti-container');
    if (!container) return;

    const colors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 3 + 's';
        container.appendChild(confetti);

        // Remove after animation
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 6000);
    }
}

function showEmergencyModal() {
    const modal = document.getElementById('emergencyModal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function hideEmergencyModal() {
    const modal = document.getElementById('emergencyModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function selectEmergencyMeal(backupId) {
    const emergency = emergencyMeals[backupId];
    if (!emergency) return;

    // Mark emergency meal as used
    appState.dailyProgress.emergencyUsed = true;
    
    // Mark meals as complete (emergency replaces all meals)
    appState.dailyProgress.meals = [true, true, true, true, true];
    
    // Update meal plan to show emergency meal
    const mealPlanContainer = document.getElementById('mealPlan');
    if (mealPlanContainer) {
        mealPlanContainer.innerHTML = `
            <div class="meal-plan-header">
                <h3>🚨 Emergency Backup Meal Selected</h3>
                <p class="emergency-note">Great job having a backup plan! Tomorrow we'll get back on track.</p>
            </div>
            <div class="meal-item">
                <div class="meal-time">All Day</div>
                <div class="meal-content">
                    <div class="meal-description">${emergency.name}</div>
                    <div class="meal-details">
                        <p><strong>What you need:</strong></p>
                        <ul>
                            ${emergency.items.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                        <p><strong>Instructions:</strong> Simply combine all ingredients and enjoy!</p>
                    </div>
                    <label class="checkbox-label">
                        <input type="checkbox" class="meal-checkbox" data-meal="1" checked disabled>
                        Emergency meal completed
                    </label>
                </div>
            </div>
        `;
    }

    hideEmergencyModal();
    updateAchievements();
    showMessage(`Emergency backup selected: ${emergency.name}. Day marked complete!`, 'success');
}

function updateShoppingList() {
    const currentStore = appState.settings.supermarket;
    const storeData = shoppingLists[currentStore];
    
    // Update supermarket toggle display
    const supermarketToggle = document.getElementById('supermarketToggle');
    if (supermarketToggle) {
        supermarketToggle.checked = currentStore === 'sainsburys';
    }

    // Update each aisle
    Object.keys(storeData).forEach(aisle => {
        const container = document.getElementById(aisle + 'Items');
        if (container) {
            const items = storeData[aisle];
            container.innerHTML = items.map(item => `
                <div class="shopping-item">
                    <span class="item-name">${item}</span>
                    <input type="checkbox" class="item-checkbox">
                </div>
            `).join('');
        }
    });
}

function addAllWeekToShoppingList() {
    // Check all items in shopping list
    const checkboxes = document.querySelectorAll('.item-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = true;
        const item = checkbox.closest('.shopping-item');
        if (item) {
            item.classList.add('checked');
        }
    });
    
    showMessage('All weekly items added to your shopping list!', 'success');
}

function clearShoppingList() {
    const checkboxes = document.querySelectorAll('.item-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
        const item = checkbox.closest('.shopping-item');
        if (item) {
            item.classList.remove('checked');
        }
    });
    
    showMessage('Shopping list cleared!', 'info');
}

function updateSteps() {
    const stepsInput = document.getElementById('stepsInput');
    if (!stepsInput) return;
    
    const steps = parseInt(stepsInput.value) || 0;
    
    if (steps < 0) {
        showMessage('Please enter a valid number of steps.', 'error');
        return;
    }

    appState.dailyProgress.steps = steps;
    const target = stepTargets[appState.currentWeek];
    const percentage = Math.min((steps / target) * 100, 100);
    
    // Update progress bar
    const progressFill = document.getElementById('stepProgress');
    const progressText = document.getElementById('stepProgressText');
    
    if (progressFill) {
        progressFill.style.width = `${percentage}%`;
    }
    
    if (progressText) {
        progressText.textContent = `${steps.toLocaleString()} / ${target.toLocaleString()} steps`;
    }
    
    // Clear input
    stepsInput.value = '';
    
    // Update achievements
    updateAchievements();
    
    // Show encouragement
    if (steps >= target) {
        showMessage('Fantastic! You\'ve hit your step target for today! 🎉', 'success');
    } else if (steps >= target * 0.8) {
        showMessage('You\'re so close to your target! Keep going!', 'info');
    } else if (steps > 0) {
        showMessage('Great start! Every step counts towards your goal.', 'success');
    }
}

function updateAchievements() {
    // Update meal completion circles
    const completedMeals = appState.dailyProgress.meals.filter(meal => meal).length;
    const mealCircles = document.querySelectorAll('#mealsAchievement .circle');
    mealCircles.forEach((circle, index) => {
        circle.classList.toggle('completed', index < completedMeals);
    });

    // Update steps achievement
    const target = stepTargets[appState.currentWeek];
    const stepsStatus = document.getElementById('stepsStatus');
    const stepsAchievement = document.getElementById('stepsAchievement');
    
    if (stepsStatus) {
        if (appState.dailyProgress.steps >= target) {
            stepsStatus.textContent = 'Target Achieved!';
            stepsStatus.style.color = 'var(--color-success)';
            if (stepsAchievement) {
                stepsAchievement.classList.add('completed');
            }
        } else if (appState.dailyProgress.steps > 0) {
            stepsStatus.textContent = `${appState.dailyProgress.steps.toLocaleString()} / ${target.toLocaleString()}`;
            stepsStatus.style.color = 'var(--color-text-secondary)';
        } else {
            stepsStatus.textContent = 'Not Started';
            stepsStatus.style.color = 'var(--color-text-secondary)';
        }
    }

    // Update challenges achievement
    const completedChallenges = appState.dailyProgress.challenges.filter(challenge => challenge).length;
    const challengesStatus = document.getElementById('challengesStatus');
    const challengesAchievement = document.getElementById('challengesAchievement');
    
    if (challengesStatus) {
        challengesStatus.textContent = `${completedChallenges} / 4`;
        if (completedChallenges === 4 && challengesAchievement) {
            challengesStatus.style.color = 'var(--color-success)';
            challengesAchievement.classList.add('completed');
        }
    }

    // Update learning achievement
    const learningStatus = document.getElementById('learningStatus');
    const learningAchievement = document.getElementById('learningAchievement');
    
    if (learningStatus) {
        if (appState.dailyProgress.learning) {
            learningStatus.textContent = 'Complete';
            learningStatus.style.color = 'var(--color-success)';
            if (learningAchievement) {
                learningAchievement.classList.add('completed');
            }
        } else {
            learningStatus.textContent = 'Not Started';
            learningStatus.style.color = 'var(--color-text-secondary)';
        }
    }

    updateWeeklyStats();
    checkWeekCompletion();
}

function updateWeeklyStats() {
    // Calculate weekly stats (simplified for demo)
    const totalMeals = appState.dailyProgress.meals.filter(meal => meal).length;
    const totalChallenges = appState.dailyProgress.challenges.filter(challenge => challenge).length;
    
    const weekMealsEl = document.getElementById('weekMeals');
    const weekStepsEl = document.getElementById('weekSteps');
    const weekChallengesEl = document.getElementById('weekChallenges');
    const weekLearningEl = document.getElementById('weekLearning');
    
    if (weekMealsEl) weekMealsEl.textContent = totalMeals;
    if (weekStepsEl) weekStepsEl.textContent = appState.dailyProgress.steps.toLocaleString();
    if (weekChallengesEl) weekChallengesEl.textContent = totalChallenges;
    if (weekLearningEl) weekLearningEl.textContent = appState.dailyProgress.learning ? '1' : '0';
}

function checkWeekCompletion() {
    // Simple completion check (all meals done, steps target met, learning done)
    const mealsComplete = appState.dailyProgress.meals.every(meal => meal);
    const stepsComplete = appState.dailyProgress.steps >= stepTargets[appState.currentWeek];
    const learningComplete = appState.dailyProgress.learning;
    
    const weekComplete = mealsComplete && stepsComplete && learningComplete;
    
    if (weekComplete) {
        const nextWeekBtn = document.getElementById('nextWeekBtn');
        if (nextWeekBtn) {
            nextWeekBtn.classList.remove('hidden');
            nextWeekBtn.addEventListener('click', advanceWeek);
        }
    }
}

function advanceWeek() {
    appState.currentWeek++;
    
    // Check if moving to Phase 2 (after week 4)
    if (appState.currentWeek === 5) {
        appState.currentPhase = 2;
        updatePhaseDisplay();
        showMessage('🎉 Congratulations! Moving to Phase 2: Optimisation!', 'success');
    }
    
    // Reset daily progress for new week
    appState.dailyProgress = {
        meals: [false, false, false, false, false],
        steps: 0,
        challenges: [false, false, false, false],
        learning: false,
        emergencyUsed: false
    };
    
    updateAllDisplays();
    showMessage(`Week ${appState.currentWeek} started! Keep up the great work!`, 'success');
}

function updatePhaseDisplay() {
    const phaseName = document.getElementById('phaseName');
    const phaseWeeks = document.getElementById('phaseWeeks');
    
    if (phaseName && phaseWeeks) {
        if (appState.currentPhase === 1) {
            phaseName.textContent = 'FOUNDATION';
            phaseWeeks.textContent = 'Weeks 1-4';
        } else {
            phaseName.textContent = 'OPTIMISATION';
            phaseWeeks.textContent = 'Weeks 5-8';
        }
    }
    
    // Update settings display
    const settingsCurrentPhase = document.getElementById('settingsCurrentPhase');
    const settingsPhaseProgress = document.getElementById('settingsPhaseProgress');
    
    if (settingsCurrentPhase && settingsPhaseProgress) {
        settingsCurrentPhase.textContent = appState.currentPhase === 1 ? 'Foundation Phase' : 'Optimisation Phase';
        settingsPhaseProgress.textContent = `Week ${appState.currentWeek} of ${appState.currentPhase === 1 ? '4' : '8'}`;
    }
}

function updateAllDisplays() {
    updateMealPlan();
    updatePhaseDisplay();
    updateAchievements();
    
    // Update step target display
    const target = stepTargets[appState.currentWeek];
    const stepTargetDisplay = document.getElementById('stepTargetDisplay');
    const stepProgressText = document.getElementById('stepProgressText');
    
    if (stepTargetDisplay) {
        stepTargetDisplay.textContent = `${target.toLocaleString()} steps`;
    }
    if (stepProgressText) {
        stepProgressText.textContent = `0 / ${target.toLocaleString()} steps`;
    }
}

function loadSettings() {
    try {
        const saved = localStorage.getItem('jolene-reset-settings');
        if (saved) {
            const settings = JSON.parse(saved);
            appState.settings = { ...appState.settings, ...settings };
        }
        
        const savedProgress = localStorage.getItem('jolene-reset-progress');
        if (savedProgress) {
            const progress = JSON.parse(savedProgress);
            appState.currentWeek = progress.currentWeek || 1;
            appState.currentPhase = progress.currentPhase || 1;
        }
    } catch (e) {
        console.log('No saved settings found or invalid format');
    }
}

function saveSettings() {
    try {
        localStorage.setItem('jolene-reset-settings', JSON.stringify(appState.settings));
        localStorage.setItem('jolene-reset-progress', JSON.stringify({
            currentWeek: appState.currentWeek,
            currentPhase: appState.currentPhase
        }));
    } catch (e) {
        console.log('Unable to save settings');
    }
}

function resetAllProgress() {
    appState.currentWeek = 1;
    appState.currentPhase = 1;
    appState.dailyProgress = {
        meals: [false, false, false, false, false],
        steps: 0,
        challenges: [false, false, false, false],
        learning: false,
        emergencyUsed: false
    };
    
    localStorage.removeItem('jolene-reset-progress');
    updateAllDisplays();
    showMessage('All progress has been reset. Starting fresh!', 'info');
}

function showMessage(message, type = 'info') {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `message message--${type}`;
    messageEl.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1000;
        padding: 16px 24px;
        border-radius: 8px;
        font-size: 18px;
        font-weight: 500;
        max-width: 90%;
        text-align: center;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
    `;

    // Set colors based on type
    switch (type) {
        case 'success':
            messageEl.style.backgroundColor = 'rgba(33, 128, 141, 0.15)';
            messageEl.style.color = 'var(--color-success)';
            messageEl.style.border = '1px solid rgba(33, 128, 141, 0.25)';
            break;
        case 'error':
            messageEl.style.backgroundColor = 'rgba(192, 21, 47, 0.15)';
            messageEl.style.color = 'var(--color-error)';
            messageEl.style.border = '1px solid rgba(192, 21, 47, 0.25)';
            break;
        case 'warning':
            messageEl.style.backgroundColor = 'rgba(168, 75, 47, 0.15)';
            messageEl.style.color = 'var(--color-warning)';
            messageEl.style.border = '1px solid rgba(168, 75, 47, 0.25)';
            break;
        default:
            messageEl.style.backgroundColor = 'rgba(98, 108, 113, 0.15)';
            messageEl.style.color = 'var(--color-info)';
            messageEl.style.border = '1px solid rgba(98, 108, 113, 0.25)';
    }

    messageEl.textContent = message;
    document.body.appendChild(messageEl);

    // Remove after delay
    setTimeout(() => {
        messageEl.style.opacity = '0';
        messageEl.style.transform = 'translateX(-50%) translateY(-20px)';
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.parentNode.removeChild(messageEl);
            }
        }, 300);
    }, 4000);
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Save settings when page unloads
window.addEventListener('beforeunload', saveSettings);