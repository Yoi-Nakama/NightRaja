/**
 * Night Raja - Visual Novel Engine
 * Core game engine for managing scenes, choices, and game flow
 */

class NightRajaEngine {
    constructor() {
        this.currentSceneId = null;
        this.gameState = {
            playerName: '',
            playerGender: '',
            currentScene: 'intro',
            karma: 0, // -100 (Dark) to +100 (Good)
            sunGodMeter: 0,
            northStarMeter: 0,
            powerStage: 1,
            unlockedAbilities: [],
            visitedScenes: new Set(),
            choices: {},
        };
        this.settings = new SettingsManager();
        this.saveSystem = new SaveSystem();
        this.dialogueIndex = 0;
        this.isAnimating = false;
    }

    /**
     * Initialize the game
     */
    init() {
        this.loadSettings();
        this.setupEventListeners();
        this.showScreen('main-menu');
    }

    /**
     * Start a new game with character creation
     */
    startNewGame() {
        this.showScreen('character-creation');
        document.getElementById('character-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('character-name').value;
            const gender = document.querySelector('input[name="character-gender"]:checked').value;
            
            this.gameState.playerName = name;
            this.gameState.playerGender = gender;
            this.gameState.currentScene = 'intro_start';
            
            this.playGame();
        });
    }

    /**
     * Begin the game after character creation
     */
    playGame() {
        this.showScreen('game-screen');
        this.playScene(this.gameState.currentScene);
    }

    /**
     * Play a specific scene
     */
    playScene(sceneId) {
        const scene = storyData.scenes[sceneId];
        
        if (!scene) {
            console.error(`Scene not found: ${sceneId}`);
            return;
        }

        this.currentSceneId = sceneId;
        this.gameState.visitedScenes.add(sceneId);
        this.gameState.currentScene = sceneId;
        
        // Set background
        if (scene.background) {
            this.setBackground(scene.background);
        }

        // Display character portrait
        if (scene.character) {
            this.setCharacterPortrait(scene.character);
        } else {
            this.clearCharacterPortrait();
        }

        // Display dialogue
        this.displayDialogue(scene);

        // Display choices
        if (scene.choices) {
            this.displayChoices(scene.choices);
        } else {
            // Auto-advance if no choices
            setTimeout(() => {
                if (scene.next) {
                    this.playScene(scene.next);
                }
            }, 3000);
        }

        // Update stats display
        this.updateStatsDisplay();

        // Play music if provided
        if (scene.music) {
            this.playMusic(scene.music);
        }
    }

    /**
     * Display dialogue with animation
     */
    displayDialogue(scene) {
        const speakerName = document.getElementById('speaker-name');
        const dialogueText = document.getElementById('dialogue-text');
        
        const speaker = scene.speaker || 'Narrator';
        speakerName.textContent = speaker;
        
        const text = scene.text || '';
        
        if (this.settings.get('dialogueAnimation') === 'typewriter') {
            this.typewriterEffect(dialogueText, text);
        } else {
            dialogueText.textContent = text;
        }
    }

    /**
     * Typewriter animation effect
     */
    typewriterEffect(element, text) {
        element.textContent = '';
        let index = 0;
        const speed = 100 - this.settings.get('textSpeed');
        
        const type = () => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            }
        };
        
        type();
    }

    /**
     * Display choice buttons
     */
    displayChoices(choices) {
        const container = document.getElementById('choices-container');
        container.innerHTML = '';

        choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.className = 'choice-btn';
            button.textContent = choice.text;
            
            button.addEventListener('click', () => {
                this.makeChoice(choice, index);
            });

            container.appendChild(button);
        });
    }

    /**
     * Handle player choice
     */
    makeChoice(choice, choiceIndex) {
        // Update karma if applicable
        if (choice.karma) {
            this.gameState.karma += choice.karma;
            this.gameState.karma = Math.max(-100, Math.min(100, this.gameState.karma));
        }

        // Update divine meters
        if (choice.sunGod) {
            this.gameState.sunGodMeter += choice.sunGod;
        }
        if (choice.northStar) {
            this.gameState.northStarMeter += choice.northStar;
        }

        // Store the choice made
        this.gameState.choices[this.currentSceneId] = choiceIndex;

        // Unlock abilities if applicable
        if (choice.unlocksAbility) {
            this.unlockAbility(choice.unlocksAbility);
        }

        // Update power stage based on conditions
        this.updatePowerStage();

        // Navigate to next scene
        if (choice.nextScene) {
            this.playScene(choice.nextScene);
        }
    }

    /**
     * Update power stage based on game progress
     */
    updatePowerStage() {
        const visitorCount = this.gameState.visitedScenes.size;
        
        if (visitorCount >= 25) {
            this.gameState.powerStage = Math.min(5, this.gameState.powerStage);
        } else if (visitorCount >= 20) {
            this.gameState.powerStage = Math.min(4, this.gameState.powerStage);
        } else if (visitorCount >= 15) {
            this.gameState.powerStage = Math.min(3, this.gameState.powerStage);
        } else if (visitorCount >= 10) {
            this.gameState.powerStage = Math.min(2, this.gameState.powerStage);
        }
    }

    /**
     * Unlock a new ability
     */
    unlockAbility(abilityName) {
        if (!this.gameState.unlockedAbilities.includes(abilityName)) {
            this.gameState.unlockedAbilities.push(abilityName);
            console.log(`Ability unlocked: ${abilityName}`);
        }
    }

    /**
     * Update stats display
     */
    updateStatsDisplay() {
        const karmaDisplay = document.getElementById('karma-display');
        const powerDisplay = document.getElementById('power-stage');
        
        let karmaLabel = 'Neutral';
        if (this.gameState.karma > 30) karmaLabel = 'Good';
        else if (this.gameState.karma < -30) karmaLabel = 'Dark';
        
        karmaDisplay.textContent = `Karma: ${karmaLabel} (${this.gameState.karma})`;
        powerDisplay.textContent = `Power: Stage ${this.gameState.powerStage}`;
    }

    /**
     * Set background image
     */
    setBackground(imagePath) {
        const background = document.getElementById('game-background');
        background.style.backgroundImage = `url('${imagePath}')`;
    }

    /**
     * Set character portrait
     */
    setCharacterPortrait(imagePath) {
        const portrait = document.getElementById('character-portrait');
        portrait.src = imagePath;
        portrait.style.display = 'block';
    }

    /**
     * Clear character portrait
     */
    clearCharacterPortrait() {
        const portrait = document.getElementById('character-portrait');
        portrait.style.display = 'none';
    }

    /**
     * Play background music
     */
    playMusic(musicPath) {
        const audio = document.getElementById('background-music');
        if (this.settings.get('backgroundMusic')) {
            audio.src = musicPath;
            audio.loop = true;
            audio.play().catch(e => console.log('Audio playback failed:', e));
        }
    }

    /**
     * Show a specific screen
     */
    showScreen(screenId) {
        const screens = document.querySelectorAll('.screen');
        screens.forEach(screen => screen.classList.remove('active'));
        
        const screen = document.getElementById(screenId);
        if (screen) {
            screen.classList.add('active');
        }
    }

    /**
     * Load settings from storage
     */
    loadSettings() {
        this.settings.load();
        this.applySettings();
    }

    /**
     * Apply settings to UI
     */
    applySettings() {
        const fontSize = this.settings.get('textSize');
        document.documentElement.style.setProperty('--text-size', `${fontSize}px`);
        
        const textColor = this.settings.get('textColor');
        document.documentElement.style.setProperty('--text-color', textColor);
        
        const dialogueText = document.getElementById('dialogue-text');
        if (dialogueText) {
            dialogueText.style.fontSize = `${fontSize}px`;
            dialogueText.style.color = textColor;
        }
    }

    /**
     * Setup global event listeners
     */
    setupEventListeners() {
        // Menu buttons
        window.startNewGame = () => this.startNewGame();
        window.openSettings = () => this.showScreen('settings-menu');
        window.closeSettings = () => this.showScreen('main-menu');
        window.openLoadGameMenu = () => this.openLoadGame();
        window.openSaveMenu = () => this.saveSystem.openSaveMenu(this.gameState);
        window.returnToMenu = () => {
            if (confirm('Return to main menu? Progress will be saved.')) {
                this.saveSystem.quickSave(this.gameState);
                this.showScreen('main-menu');
            }
        };
    }

    /**
     * Open load game menu
     */
    openLoadGame() {
        const saves = this.saveSystem.getAllSaves();
        this.saveSystem.displayLoadMenu(saves, (save) => {
            this.gameState = save;
            this.playGame();
        });
    }
}

// Initialize engine when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.engine = new NightRajaEngine();
    window.engine.init();
});
