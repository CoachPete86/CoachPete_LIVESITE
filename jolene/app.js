// Jolene Reset Dashboard Application - Fixed Navigation
const appData = {
    templates: {
        phase1: {
            A: {
                breakfast: {"name":"Greek yoghurt power bowl","kcal":320,"protein":22,"carbs":18,"fat":16,"fiber":4,"sugar":8,"salt":1.2},
                lunch: {"name":"No-cook protein salad","kcal":410,"protein":34,"carbs":10,"fat":26,"fiber":6,"sugar":5,"salt":1.8},
                dinner: {"name":"Simple baked salmon","kcal":520,"protein":38,"carbs":42,"fat":22,"fiber":7,"sugar":12,"salt":2.1},
                snacks: [{"name":"Apple + almond butter","kcal":180},{"name":"Mixed nuts + olives","kcal":210}]
            }
        }
    },
    routes: {
        week1: {"name":"Royal Foundation","distance":2.5}
    }
};

const shoppingData = {
    sainsburys: {
        produce: ["Sainsbury's Organic Spinach", "Sainbury's Avocados", "Sainsbury's Sweet Potatoes", "Sainsbury's Broccoli"],
        dairy: ["Sainsbury's Greek Yogurt", "Sainsbury's Free Range Eggs", "Sainsbury's Coconut Milk"],
        deli: ["Sainsbury's Smoked Salmon", "Sainsbury's Chicken Breast"],
        pantry: ["Sainsbury's Porridge Oats", "Sainsbury's Olive Oil", "Sainsbury's Mixed Nuts"],
        frozen: ["Sainsbury's Frozen Berries", "Sainsbury's Frozen Fish Fillets"]
    },
    ms: {
        produce: ["M&S Organic Spinach", "M&S Avocados", "M&S Sweet Potatoes", "M&S Broccoli"],
        dairy: ["M&S Greek Yogurt", "M&S Free Range Eggs", "M&S Coconut Milk"],
        deli: ["M&S Smoked Salmon", "M&S Chicken Breast"],
        pantry: ["M&S Porridge Oats", "M&S Olive Oil", "M&S Mixed Nuts"],
        frozen: ["M&S Frozen Berries", "M&S Frozen Fish Fillets"]
    }
};

const mealMethods = {
    "Greek yoghurt power bowl": [
        "Add 200g Greek yogurt to bowl",
        "Top with mixed berries and nuts", 
        "Sprinkle hemp hearts on top"
    ],
    "No-cook protein salad": [
        "Arrange mixed leaves on plate",
        "Add smoked salmon and avocado",
        "Drizzle with olive oil and lemon"
    ],
    "Simple baked salmon": [
        "Bake salmon 15 mins at 200°C",
        "Roast sweet potato wedges", 
        "Steam broccoli until tender"
    ]
};

// Application State
let appState = {
    currentPage: 'dashboard',
    currentTemplate: 'A',
    supermarket: 'sainsburys',
    garlicAlertsEnabled: true,
    todaySteps: 0,
    stepTarget: 6000,
    mealsCompleted: [false, false, false, false],
    learningComplete: false
};

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app...');
    initializeApp();
});

function initializeApp() {
    console.log('Starting app initialization...');
    setupEventListeners();
    updateDashboard();
    console.log('App initialization complete');
}

function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Dashboard tiles - using more robust event handling
    const mealsTile = document.querySelector('[data-page="meals"]');
    const shoppingTile = document.querySelector('[data-page="shopping"]');
    const stepsTile = document.querySelector('[data-page="steps"]');
    const learningTile = document.querySelector('[data-page="learning"]');
    
    if (mealsTile) {
        mealsTile.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Meals tile clicked');
            showPage('meals');
        });
        console.log('Meals tile listener added');
    }
    
    if (shoppingTile) {
        shoppingTile.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Shopping tile clicked');
            showPage('shopping');
        });
        console.log('Shopping tile listener added');
    }
    
    if (stepsTile) {
        stepsTile.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Steps tile clicked');
            showPage('steps');
        });
        console.log('Steps tile listener added');
    }
    
    if (learningTile) {
        learningTile.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Learning tile clicked');
            showPage('learning');
        });
        console.log('Learning tile listener added');
    }

    // Back buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('back-btn')) {
            e.preventDefault();
            console.log('Back button clicked');
            showPage('dashboard');
        }
    });

    // Emergency button
    const emergencyBtn = document.getElementById('emergencyBtn');
    if (emergencyBtn) {
        emergencyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Emergency button clicked');
            showModal('emergencyModal');
        });
        console.log('Emergency button listener added');
    }

    // Modal close handlers
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-close') || e.target.classList.contains('modal-overlay')) {
            e.preventDefault();
            const modal = e.target.closest('.modal');
            if (modal) {
                hideModal(modal.id);
            }
        }
        
        // Backup choice handlers
        if (e.target.classList.contains('backup-choice')) {
            e.preventDefault();
            const choice = e.target.getAttribute('data-choice');
            selectEmergencyMeal(choice);
        }
        
        // Store button handlers
        if (e.target.classList.contains('store-btn')) {
            e.preventDefault();
            const store = e.target.getAttribute('data-store');
            switchStore(store);
        }
    });
    
    console.log('Event listeners setup complete');
}

function showPage(pageId) {
    console.log('Showing page:', pageId);
    
    // Hide all pages
    const dashboard = document.getElementById('dashboard');
    const mealsPage = document.getElementById('meals-page');
    const shoppingPage = document.getElementById('shopping-page');
    const stepsPage = document.getElementById('steps-page');
    const learningPage = document.getElementById('learning-page');
    
    // Hide all first
    if (dashboard) dashboard.classList.add('hidden');
    if (mealsPage) mealsPage.classList.add('hidden');
    if (shoppingPage) shoppingPage.classList.add('hidden');
    if (stepsPage) stepsPage.classList.add('hidden');
    if (learningPage) learningPage.classList.add('hidden');
    
    // Show the target page
    let targetPage = null;
    switch(pageId) {
        case 'dashboard':
            targetPage = dashboard;
            break;
        case 'meals':
            targetPage = mealsPage;
            loadMealsPage();
            break;
        case 'shopping':
            targetPage = shoppingPage;
            loadShoppingPage();
            break;
        case 'steps':
            targetPage = stepsPage;
            loadStepsPage();
            break;
        case 'learning':
            targetPage = learningPage;
            break;
    }
    
    if (targetPage) {
        targetPage.classList.remove('hidden');
        appState.currentPage = pageId;
        console.log('Successfully showing page:', pageId);
    } else {
        console.error('Could not find page element for:', pageId);
    }
    
    if (pageId === 'dashboard') {
        updateDashboard();
    }
}

function updateDashboard() {
    console.log('Updating dashboard...');
    
    // Update statuses
    const mealsComplete = appState.mealsCompleted.filter(Boolean).length;
    const mealsStatus = document.getElementById('mealsStatus');
    if (mealsStatus) {
        mealsStatus.textContent = `${mealsComplete} of 4 complete`;
    }
    
    const stepsStatus = document.getElementById('stepsStatus');
    if (stepsStatus) {
        stepsStatus.textContent = `${appState.todaySteps.toLocaleString()} / ${appState.stepTarget.toLocaleString()} steps`;
    }
    
    const learningStatus = document.getElementById('learningStatus');
    if (learningStatus) {
        learningStatus.textContent = appState.learningComplete ? 'Complete!' : '5-min bite ready';
    }
}

function loadMealsPage() {
    console.log('Loading meals page...');
    const template = appData.templates.phase1[appState.currentTemplate];
    const mealCardsContainer = document.getElementById('mealCards');
    
    if (!mealCardsContainer) {
        console.error('Meal cards container not found');
        return;
    }
    
    const meals = [
        { name: template.breakfast.name, data: template.breakfast, icon: '🥣', index: 0 },
        { name: template.lunch.name, data: template.lunch, icon: '🥗', index: 1 },
        { name: template.dinner.name, data: template.dinner, icon: '🍽️', index: 2 },
        { name: 'Daily Snacks', data: template.snacks, icon: '🥜', index: 3, isSnacks: true }
    ];
    
    let html = '';
    meals.forEach((meal) => {
        const isComplete = appState.mealsCompleted[meal.index];
        const methods = meal.isSnacks ? [] : (mealMethods[meal.name] || []);
        
        html += `
            <div class="meal-card ${isComplete ? 'completed' : ''}">
                <div class="meal-header">
                    <h3 class="meal-name">${meal.icon} ${meal.name}</h3>
                    ${meal.data.kcal ? '<div class="prep-time">15 min</div>' : ''}
                    ${appState.garlicAlertsEnabled ? '<div class="garlic-free-icon">✓</div>' : ''}
                </div>
                
                ${!meal.isSnacks && methods.length > 0 ? `
                    <div class="meal-steps">
                        <h4>3-Step Method:</h4>
                        <ol>
                            ${methods.map(step => `<li>${step}</li>`).join('')}
                        </ol>
                    </div>
                ` : ''}
                
                ${meal.isSnacks ? `
                    <div class="meal-steps">
                        <h4>Choose from:</h4>
                        <ul>
                            ${meal.data.map(snack => `<li>${snack.name}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                ${meal.data.kcal ? `
                    <button class="nutrition-btn" data-meal="${meal.index}">NUTRITION</button>
                ` : ''}
                
                <div class="meal-done-toggle">
                    <input type="checkbox" id="meal-${meal.index}" ${isComplete ? 'checked' : ''}>
                    <label for="meal-${meal.index}">Meal Done</label>
                </div>
            </div>
        `;
    });
    
    mealCardsContainer.innerHTML = html;
    
    // Add nutrition button handlers
    document.querySelectorAll('.nutrition-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const mealIndex = parseInt(this.getAttribute('data-meal'));
            showNutrition(mealIndex);
        });
    });
    
    // Add checkbox handlers
    document.querySelectorAll('input[id^="meal-"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const mealIndex = parseInt(this.id.split('-')[1]);
            appState.mealsCompleted[mealIndex] = this.checked;
            updateDashboard();
            showToast(this.checked ? 'Meal marked complete! 🎉' : 'Meal unmarked');
        });
    });
}

function loadShoppingPage() {
    console.log('Loading shopping page...');
    const storeData = shoppingData[appState.supermarket];
    const shoppingSections = document.getElementById('shoppingSections');
    
    if (!shoppingSections) {
        console.error('Shopping sections container not found');
        return;
    }
    
    // Update store buttons
    document.querySelectorAll('.store-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-store') === appState.supermarket);
    });
    
    const sections = [
        { key: 'produce', title: '🥬 Produce', items: storeData.produce },
        { key: 'dairy', title: '🥛 Dairy', items: storeData.dairy },
        { key: 'deli', title: '🥩 Deli', items: storeData.deli },
        { key: 'pantry', title: '🥫 Pantry', items: storeData.pantry },
        { key: 'frozen', title: '🧊 Frozen', items: storeData.frozen }
    ];
    
    let html = '';
    sections.forEach(section => {
        html += `
            <div class="shopping-section">
                <h3>${section.title}</h3>
                <div class="shopping-items">
                    ${section.items.map((item, index) => `
                        <div class="shopping-item">
                            <input type="checkbox" id="${section.key}-${index}">
                            <label for="${section.key}-${index}">${item}</label>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    });
    
    shoppingSections.innerHTML = html;
    
    // Add checkbox handlers
    document.querySelectorAll('#shoppingSections input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const item = this.closest('.shopping-item');
            item.classList.toggle('checked', this.checked);
        });
    });
}

function loadStepsPage() {
    console.log('Loading steps page...');
    updateStepProgress();
    
    // Add log steps button handler
    const logStepsBtn = document.getElementById('logStepsBtn');
    if (logStepsBtn) {
        logStepsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showModal('logStepsModal');
        });
    }
    
    // Add save steps handler
    const saveStepsBtn = document.getElementById('saveStepsBtn');
    if (saveStepsBtn) {
        saveStepsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const input = document.getElementById('stepsInput');
            if (input) {
                const steps = parseInt(input.value) || 0;
                appState.todaySteps = steps;
                updateStepProgress();
                updateDashboard();
                hideModal('logStepsModal');
                input.value = '';
                showToast('Steps logged successfully! 👟');
            }
        });
    }
}

function showNutrition(mealIndex) {
    console.log('Showing nutrition for meal:', mealIndex);
    const template = appData.templates.phase1[appState.currentTemplate];
    const meals = [template.breakfast, template.lunch, template.dinner];
    const meal = meals[mealIndex];
    
    if (meal) {
        document.getElementById('kcal').textContent = `${meal.kcal} kcal`;
        document.getElementById('protein').textContent = `${meal.protein}g`;
        document.getElementById('carbs').textContent = `${meal.carbs}g`;
        document.getElementById('fat').textContent = `${meal.fat}g`;
        document.getElementById('fiber').textContent = `${meal.fiber}g`;
        document.getElementById('sugar').textContent = `${meal.sugar}g`;
        document.getElementById('salt').textContent = `${meal.salt}g`;
        
        showModal('nutritionModal');
    }
}

function updateStepProgress() {
    const percentage = Math.min((appState.todaySteps / appState.stepTarget) * 100, 100);
    const progressDonut = document.getElementById('progressDonut');
    const progressValue = document.getElementById('progressValue');
    
    if (progressDonut) {
        progressDonut.style.background = `conic-gradient(var(--color-teal-500) ${percentage * 3.6}deg, var(--color-secondary) 0deg)`;
    }
    
    if (progressValue) {
        progressValue.textContent = `${Math.round(percentage)}%`;
    }
}

function switchStore(store) {
    console.log('Switching to store:', store);
    appState.supermarket = store;
    loadShoppingPage();
    showToast(`Switched to ${store === 'ms' ? 'M&S' : 'Sainsbury\'s'}`);
}

function selectEmergencyMeal(choice) {
    console.log('Emergency meal selected:', choice);
    appState.mealsCompleted = [true, true, true, true];
    hideModal('emergencyModal');
    updateDashboard();
    showToast('Emergency meal selected! All meals marked complete! 🚨');
}

function showModal(modalId) {
    console.log('Showing modal:', modalId);
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function hideModal(modalId) {
    console.log('Hiding modal:', modalId);
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
    }
}

function showToast(message, type = 'success') {
    console.log('Showing toast:', message);
    
    // Remove existing toast
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'error' ? 'var(--color-red-400)' : 'var(--color-success)'};
        color: var(--color-btn-primary-text);
        padding: 16px 24px;
        border-radius: var(--radius-base);
        font-size: 18px;
        font-weight: var(--font-weight-medium);
        box-shadow: var(--shadow-lg);
        z-index: 2000;
        max-width: 90%;
        text-align: center;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 3000);
}