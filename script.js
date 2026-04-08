let health = 100;
let safetyLevel = 0;
let timer;
let timeLeft = 15;
let currentStep = 0;
let selectedDisasterIdx = 0;

const storyData = [
    {
        name: "Typhoon",
        steps: [
            // WIND/RAIN (1-10)
            { text: "PAGASA issues Signal No. 3. What do you do with outdoor hanging plants?", choices: [{t: "Bring them inside", correct: true}, {t: "Tie them with thin string", correct: false}, {t: "Leave them to water naturally", correct: false}, {t: "Move them to the roof", correct: false}] },
            { text: "The wind is howling and a window cracks. Where is the safest place?", choices: [{t: "Interior room without windows", correct: true}, {t: "By the window", correct: false}, {t: "On the balcony", correct: false}, {t: "In the kitchen", correct: false}] },
            { text: "The power goes out. What is the safest light source?", choices: [{t: "Flashlight", correct: true}, {t: "Candles", correct: false}, {t: "Gasoline lamp", correct: false}, {t: "Lighter", correct: false}] },
            { text: "What does a 'Red Rainfall Advisory' mean?", choices: [{t: "Serious flooding; Evacuate", correct: true}, {t: "Wait for more rain", correct: false}, {t: "It is safe outside", correct: false}, {t: "Storm has left", correct: false}] },
            { text: "A tree branch falls on your roof. Should you remove it during the storm?", choices: [{t: "No, stay inside", correct: true}, {t: "Yes, do it now", correct: false}, {t: "Yes, use a ladder", correct: false}, {t: "Ask neighbor now", correct: false}] },
            { text: "The 'Eye' of the typhoon passes and it's calm. What do you do?", choices: [{t: "Stay inside; the back is coming", correct: true}, {t: "Go out and clean", correct: false}, {t: "Drive to the store", correct: false}, {t: "Check neighbors outside", correct: false}] },
            { text: "No phone signal. How do you stay updated?", choices: [{t: "Battery-powered radio", correct: true}, {t: "Wait for mail", correct: false}, {t: "Climb roof for signal", correct: false}, {t: "Shout to neighbors", correct: false}] },
            { text: "Wind is blowing shingles off. Where do you stay?", choices: [{t: "Away from ceiling/roof", correct: true}, {t: "In the attic", correct: false}, {t: "Under a tree", correct: false}, {t: "Near the window", correct: false}] },
            { text: "Which agency issues 'Signal Numbers' in the PH?", choices: [{t: "PAGASA", correct: true}, {t: "PHIVOLCS", correct: false}, {t: "DENR", correct: false}, {t: "DepEd", correct: false}] },
            { text: "You see a downed power line. Do you move it with a stick?", choices: [{t: "No, stay away", correct: true}, {t: "Yes, if stick is dry", correct: false}, {t: "Yes, with gloves", correct: false}, {t: "Push it into gutter", correct: false}] },
            // FLASH FLOOD (11-20)
            { text: "EVENT: A flash flood is entering your street!", choices: [{t: "Move to highest floor", correct: true}, {t: "Check the garage", correct: false}, {t: "Stay in basement", correct: false}, {t: "Go see water level", correct: false}], floodEvent: true },
            { text: "Flood enters living room near outlets. Priority?", choices: [{t: "Turn off Main Breaker", correct: true}, {t: "Mop water quickly", correct: false}, {t: "Tape the outlets", correct: false}, {t: "Unplug TV only", correct: false}] },
            { text: "You must wade through water. You have a foot cut.", choices: [{t: "Wear boots and wrap cut", correct: true}, {t: "Walk fast", correct: false}, {t: "Walk barefoot", correct: false}, {t: "Ignore it", correct: false}] },
            { text: "Risk of wading in floodwater with a wound?", choices: [{t: "Leptospirosis", correct: true}, {t: "Malaria", correct: false}, {t: "Rabies", correct: false}, {t: "Dengue", correct: false}] },
            { text: "Water is rising fast. Trapped! Where is the exit?", choices: [{t: "The roof", correct: true}, {t: "Under the bed", correct: false}, {t: "Locked closet", correct: false}, {t: "Basement", correct: false}] },
            { text: "A snake is swimming in the water. Action?", choices: [{t: "Stay back and let it pass", correct: true}, {t: "Catch it", correct: false}, {t: "Splash it", correct: false}, {t: "Kill it", correct: false}] },
            { text: "Can 6 inches of water knock over an adult?", choices: [{t: "Yes", correct: true}, {t: "No", correct: false}, {t: "Only at night", correct: false}, {t: "Only in sea", correct: false}] },
            { text: "Tap water is yellowish. Do you drink it?", choices: [{t: "No, contaminated", correct: true}, {t: "Yes, if thirsty", correct: false}, {t: "Filter with straw", correct: false}, {t: "Boil for 5 seconds", correct: false}] },
            { text: "Should you clean flood mud barehanded?", choices: [{t: "No, use gloves", correct: true}, {t: "Yes, it's harmless", correct: false}, {t: "Yes, use plain water", correct: false}, {t: "Wait for it to dry", correct: false}] },
            { text: "Who is the primary local emergency contact?", choices: [{t: "Barangay / 911", correct: true}, {t: "Social Media", correct: false}, {t: "Principal", correct: false}, {t: "No one", correct: false}] }
        ]
    },
    {
        name: "Earthquake",
        steps: [
            { text: "Which agency monitors PH earthquakes?", choices: [{t: "PHIVOLCS", correct: true}, {t: "PAGASA", correct: false}, {t: "DENR", correct: false}, {t: "DPWH", correct: false}] },
            { text: "Ground shakes while you're at your desk. First move?", choices: [{t: "Duck, Cover, Hold", correct: true}, {t: "Run for exit", correct: false}, {t: "Stand on desk", correct: false}, {t: "Hide in closet", correct: false}] },
            { text: "No tables in the hallway. How to protect yourself?", choices: [{t: "Sit against interior wall", correct: true}, {t: "Stand in doorway", correct: false}, {t: "Run to windows", correct: false}, {t: "Lie in middle", correct: false}] },
            { text: "Shaking stops. You're on 3rd floor. How to exit?", choices: [{t: "Use stairs", correct: true}, {t: "Use elevator", correct: false}, {t: "Jump", correct: false}, {t: "Stay under bed", correct: false}] },
            { text: "Driving when quake hits. Where to stop?", choices: [{t: "Open area away from poles", correct: true}, {t: "Under overpass", correct: false}, {t: "Near tall building", correct: false}, {t: "On a bridge", correct: false}] },
            { text: "What is 'Magnitude'?", choices: [{t: "Energy released", correct: true}, {t: "How it was felt", correct: false}, {t: "Sound of quake", correct: false}, {t: "Duration", correct: false}] },
            { text: "Fire starts from a candle. Action?", choices: [{t: "Fire extinguisher", correct: true}, {t: "Water on oil fire", correct: false}, {t: "Blow on it", correct: false}, {t: "Leave door open", correct: false}] },
            { text: "Water recedes suddenly at the beach.", choices: [{t: "Run to high ground", correct: true}, {t: "Pick up fish", correct: false}, {t: "Record a video", correct: false}, {t: "Swim", correct: false}] },
            { text: "Smell gas after a quake. Rule?", choices: [{t: "Open windows; leave", correct: true}, {t: "Turn on lights", correct: false}, {t: "Light candle", correct: false}, {t: "Use phone", correct: false}] },
            { text: "What are 'Aftershocks'?", choices: [{t: "Smaller quakes after main", correct: true}, {t: "First signs", correct: false}, {t: "Sound waves", correct: false}, {t: "Falling debris", correct: false}] },
            { text: "Aftershock hits on stairs. Action?", choices: [{t: "Grab rail and sit", correct: true}, {t: "Run fast", correct: false}, {t: "Jump", correct: false}, {t: "Go back up", correct: false}] },
            { text: "Trapped under debris. How to alert rescuers?", choices: [{t: "Tap pipe or whistle", correct: true}, {t: "Shout till exhausted", correct: false}, {t: "Silent", correct: false}, {t: "Move concrete", correct: false}] },
            { text: "No phone service. How to get news?", choices: [{t: "Battery radio", correct: true}, {t: "Wait for internet", correct: false}, {t: "Believe rumors", correct: false}, {t: "Walk to city", correct: false}] },
            { text: "Is the PH in the Pacific Ring of Fire?", choices: [{t: "Yes", correct: true}, {t: "No", correct: false}, {t: "Only Luzon", correct: false}, {t: "Only Mindanao", correct: false}] },
            { text: "Person has deep bleeding cut. Action?", choices: [{t: "Apply direct pressure", correct: true}, {t: "Wash with dirty water", correct: false}, {t: "Leave open", correct: false}, {t: "Use coffee grounds", correct: false}] },
            { text: "Pipes are broken. Hygiene rule?", choices: [{t: "Use stored water sparingly", correct: true}, {t: "Keep flushing", correct: false}, {t: "Drink pool water", correct: false}, {t: "Don't wash hands", correct: false}] },
            { text: "Crowded mall panic. Action?", choices: [{t: "Stay calm; find clear exit", correct: true}, {t: "Join rush", correct: false}, {t: "Sit in middle", correct: false}, {t: "Record it", correct: false}] },
            { text: "Hide under bridge during quake?", choices: [{t: "No, collapse risk", correct: true}, {t: "Yes, strong", correct: false}, {t: "Yes, from rain", correct: false}, {t: "Only in car", correct: false}] },
            { text: "Sparking line on ground. Distance?", choices: [{t: "At least 10 meters", correct: true}, {t: "1 meter", correct: false}, {t: "Touch it", correct: false}, {t: "Step over", correct: false}] },
            { text: "Most important item in Go-Bag?", choices: [{t: "Water, Food, First Aid", correct: true}, {t: "Laptop", correct: false}, {t: "Fancy clothes", correct: false}, {t: "Toys", correct: false}] }
        ]
    },
    {
        name: "Volcanic Eruption",
        steps: [
            { text: "Volcano closest to ACLC Sta. Maria?", choices: [{t: "Pinatubo / Taal", correct: true}, {t: "Mayon", correct: false}, {t: "Kanlaon", correct: false}, {t: "Apo", correct: false}] },
            { text: "Alert Level 3 raised. Action?", choices: [{t: "Prepare Go-Bag/masks", correct: true}, {t: "Go for photo", correct: false}, {t: "Ignore", correct: false}, {t: "Move closer", correct: false}] },
            { text: "Ashfall begins. Protect eyes?", choices: [{t: "Wear goggles", correct: true}, {t: "Contact lenses", correct: false}, {t: "Rub them", correct: false}, {t: "Eyes wide open", correct: false}] },
            { text: "Best lung protection from ash?", choices: [{t: "N95 Mask", correct: true}, {t: "Surgical Mask", correct: false}, {t: "T-shirt", correct: false}, {t: "Nothing", correct: false}] },
            { text: "What is 'Lahar'?", choices: [{t: "Volcanic mudflow", correct: true}, {t: "Smoke", correct: false}, {t: "Liquid lava", correct: false}, {t: "Volcano name", correct: false}] },
            { text: "Thick ash on roof. Why bad?", choices: [{t: "Collapse risk", correct: true}, {t: "Looks grey", correct: false}, {t: "Smells nice", correct: false}, {t: "Makes it cold", correct: false}] },
            { text: "Asthmatic during ashfall. Priority?", choices: [{t: "Stay in sealed room", correct: true}, {t: "Sweep ash", correct: false}, {t: "Run", correct: false}, {t: "Open windows", correct: false}] },
            { text: "Zero visibility while driving. Action?", choices: [{t: "Pull over safely", correct: true}, {t: "Drive faster", correct: false}, {t: "High beams", correct: false}, {t: "Lights off", correct: false}] },
            { text: "What is 'Pyroclastic Flow'?", choices: [{t: "Hot gas/rock moving fast", correct: true}, {t: "Slow lava", correct: false}, {t: "Type of rain", correct: false}, {t: "Sea ash", correct: false}] },
            { text: "7km danger zone evacuation ordered. Stay?", choices: [{t: "No, evacuate", correct: true}, {t: "Wait for lava", correct: false}, {t: "Stay 1 hour", correct: false}, {t: "Stay if no car", correct: false}] },
            { text: "Lahar in your valley. Go where?", choices: [{t: "High ground away from rivers", correct: true}, {t: "To the bridge", correct: false}, {t: "Basement", correct: false}, {t: "Riverbank", correct: false}] },
            { text: "Itchy eyes from ash. How to clean?", choices: [{t: "Clean running water", correct: true}, {t: "Rub hard", correct: false}, {t: "Vinegar", correct: false}, {t: "Blink fast", correct: false}] },
            { text: "Ash causes power outages?", choices: [{t: "Yes, conductive/heavy", correct: true}, {t: "No", correct: false}, {t: "Only in summer", correct: false}, {t: "Only if red", correct: false}] },
            { text: "At evacuation center. Prevent illness?", choices: [{t: "Handwashing/Sanitation", correct: true}, {t: "Share utensils", correct: false}, {t: "Close ventilation", correct: false}, {t: "Don't wash", correct: false}] },
            { text: "Eruption stops but Alert 4 remains. Go home?", choices: [{t: "No, wait for 'All Clear'", correct: true}, {t: "Yes", correct: false}, {t: "Check house", correct: false}, {t: "Only 5 mins", correct: false}] },
            { text: "Cleaning ash. How to stop dust?", choices: [{t: "Mist with water", correct: true}, {t: "Leaf blower", correct: false}, {t: "Sweep dry", correct: false}, {t: "Vacuum", correct: false}] },
            { text: "What is volcanic ash made of?", choices: [{t: "Jagged rock/glass", correct: true}, {t: "Burnt wood", correct: false}, {t: "Soft dust", correct: false}, {t: "Beach sand", correct: false}] },
            { text: "Pet covered in ash. Clean how?", choices: [{t: "Damp cloth", correct: true}, {t: "Let them lick it", correct: false}, {t: "Dry brush", correct: false}, {t: "Nothing", correct: false}] },
            { text: "Open-air water source. Safe?", choices: [{t: "No, ash contamination", correct: true}, {t: "Yes, minerals", correct: false}, {t: "Yes, if clear", correct: false}, {t: "Yes, with filter", correct: false}] },
            { text: "Who gives most accurate volcano updates?", choices: [{t: "PHIVOLCS", correct: true}, {t: "TikTok", correct: false}, {t: "Viral FB post", correct: false}, {t: "Neighbor", correct: false}] }
        ]
    }
];

function shuffle(array) { return array.sort(() => Math.random() - 0.5); }

function showSelection() {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('selection-screen').classList.remove('hidden');
}

function exitGame() { if(confirm("Exit the research simulation?")) { window.close(); alert("Close tab to exit."); } }

function startGame(idx) {
    selectedDisasterIdx = idx; health = 100; safetyLevel = 0; currentStep = 0;
    document.getElementById('selection-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    updateHUD(); loadStep();
}

function loadStep() {
    if (health <= 0) return endGame("Game Over: Your safety choices were too risky.");
    clearInterval(timer); timeLeft = 15;
    document.getElementById('timer').innerText = timeLeft;
    startTimer();
    let step = storyData[selectedDisasterIdx].steps[currentStep];
    document.getElementById('disaster-title').innerText = (selectedDisasterIdx === 0 && step.floodEvent) ? "Typhoon & Flood" : storyData[selectedDisasterIdx].name;
    document.getElementById('text-display').innerText = step.text;
    const btnContainer = document.getElementById('choice-buttons');
    btnContainer.innerHTML = '';
    shuffle([...step.choices]).forEach(choice => {
        const btn = document.createElement('button');
        btn.innerText = choice.t;
        btn.onclick = () => handleChoice(choice.correct);
        btnContainer.appendChild(btn);
    });
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = timeLeft;
        if (timeLeft <= 0) handleChoice(false);
    }, 1000);
}

function handleChoice(isCorrect) {
    if (!isCorrect) { health -= 10; safetyLevel += 5; updateHUD(); }
    currentStep++;
    if (currentStep >= storyData[selectedDisasterIdx].steps.length) endGame("Simulation Complete! Your awareness has been tested."); else loadStep();
}

function updateHUD() {
    document.getElementById('health').innerText = health;
    document.getElementById('safety').innerText = safetyLevel;
}

function toggleSettings() { document.getElementById('settings-menu').classList.toggle('hidden'); }
function resumeGame() { toggleSettings(); }
function goToMenu() { clearInterval(timer); location.reload(); }
function endGame(msg) { clearInterval(timer); alert(msg); location.reload(); }