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
            karma: 0,
            sunGodMeter: 0,
            northStarMeter: 0,
            powerStage: 1,
            unlockedAbilities: [],
            visitedScenes: new Set(),
            choices: {},
        };
        this.settings = new SettingsManager();
        this.saveSystem = new SaveSystem();
        this.isAnimating = false;
    }

    init() {
        this.loadSettings();
        this.setupEventListeners();
        this.applySettings();
        this.showScreen('main-menu');
    }

    startNewGame() {
        this.showScreen('character-creation');
        
        const form = document.getElementById('character-form');
        form.onsubmit = (e) => {
            e.preventDefault();
            const name = document.getElementById('character-name').value;
            const gender = document.querySelector('input[name="character-gender"]:checked').value;
            
            this.gameState.playerName = name;
            this.gameState.playerGender = gender;
            this.gameState.currentScene = 'intro_start';
            
            this.playGame();
        };
    }

    playGame() {
        this.showScreen('game-screen');
        this.playScene(this.gameState.currentScene);
    }

    playScene(sceneId) {
        const scene = storyData.scenes[sceneId];
        
        if (!scene) {
            console.error(`Scene not found: ${sceneId}`);
            return;
        }

        this.currentSceneId = sceneId;
        this.gameState.visitedScenes.add(sceneId);
        this.gameState.currentScene = sceneId;
        
        if (scene.background) {
            this.setBackground(scene.background);
        }

        if (scene.character) {
            this.setCharacterPortrait(scene.character);
        } else {
            this.clearCharacterPortrait();
        }

        this.displayDialogue(scene);

        if (scene.choices) {
            this.displayChoices(scene.choices);
        } else {
            setTimeout(() => {
                if (scene.next) {
                    this.playScene(scene.next);
                }
            }, 3000);
        }

        this.updateStatsDisplay();

        if (scene.music) {
            this.playMusic(scene.music);
        }
    }

    displayDialogue(scene) {
        const speakerName = document.getElementById('speaker-name');
        const dialogueText = document.getElementById('dialogue-text');
        
        speakerName.textContent = scene.speaker || 'Narrator';
        const text = scene.text || '';
        
        if (this.settings.get('dialogueAnimation') === 'typewriter') {
            this.typewriterEffect(dialogueText, text);
        } else {
            dialogueText.textContent = text;
        }
    }

    typewriterEffect(element, text) {
        element.textContent = '';
        let index = 0;
        const speed = 50 + (100 - this.settings.get('textSpeed'));
        
        const type = () => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            }
        };
        
        type();
    }

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

    makeChoice(choice, choiceIndex) {
        if (choice.karma) {
            this.gameState.karma += choice.karma;
            this.gameState.karma = Math.max(-100, Math.min(100, this.gameState.karma));
        }

        if (choice.sunGod) {
            this.gameState.sunGodMeter += choice.sunGod;
        }
        if (choice.northStar) {
            this.gameState.northStarMeter += choice.northStar;
        }

        this.gameState.choices[this.currentSceneId] = choiceIndex;

        if (choice.unlocksAbility) {
            this.unlockAbility(choice.unlocksAbility);
        }

        this.updatePowerStage();

        if (choice.nextScene) {
            this.playScene(choice.nextScene);
        }
    }

    updatePowerStage() {
        const sceneCount = this.gameState.visitedScenes.size;
        
        if (sceneCount >= 25) this.gameState.powerStage = Math.min(5, this.gameState.powerStage + 1);
        else if (sceneCount >= 20) this.gameState.powerStage = Math.min(4, this.gameState.powerStage + 1);
        else if (sceneCount >= 15) this.gameState.powerStage = Math.min(3, this.gameState.powerStage + 1);
        else if (sceneCount >= 10) this.gameState.powerStage = Math.min(2, this.gameState.powerStage + 1);
    }

    unlockAbility(abilityName) {
        if (!this.gameState.unlockedAbilities.includes(abilityName)) {
            this.gameState.unlockedAbilities.push(abilityName);
        }
    }

    updateStatsDisplay() {
        const karmaDisplay = document.getElementById('karma-display');
        const powerDisplay = document.getElementById('power-stage');
        
        let karmaLabel = 'Neutral';
        if (this.gameState.karma > 30) karmaLabel = 'Good';
        else if (this.gameState.karma < -30) karmaLabel = 'Dark';
        
        karmaDisplay.textContent = `Karma: ${karmaLabel}`;
        powerDisplay.textContent = `Power: Stage ${this.gameState.powerStage}`;
    }

    setBackground(imagePath) {
        const background = document.getElementById('game-background');
        background.style.backgroundImage = `url('${imagePath}')`;
    }

    setCharacterPortrait(imagePath) {
        const portrait = document.getElementById('character-portrait');
        portrait.src = imagePath;
        portrait.style.display = 'block';
    }

    clearCharacterPortrait() {
        const portrait = document.getElementById('character-portrait');
        portrait.style.display = 'none';
    }

    playMusic(musicPath) {
        const audio = document.getElementById('background-music');
        if (this.settings.get('backgroundMusic')) {
            audio.src = musicPath;
            audio.loop = true;
            audio.play().catch(e => console.log('Audio playback failed'));
        }
    }

    showScreen(screenId) {
        const allScreens = document.querySelectorAll('.screen');
        allScreens.forEach(screen => screen.classList.remove('active'));
        
        const screen = document.getElementById(screenId);
        if (screen) {
            screen.classList.add('active');
        }
    }

    loadSettings() {
        this.settings.load();
    }

    applySettings() {
        const fontSize = this.settings.get('textSize');
        const textColor = this.settings.get('textColor');
        const dialogueText = document.getElementById('dialogue-text');
        
        if (dialogueText) {
            dialogueText.style.fontSize = `${fontSize}px`;
            dialogueText.style.color = textColor;
        }
    }

    setupEventListeners() {
        document.getElementById('start-btn')?.addEventListener('click', () => this.startNewGame());
        document.getElementById('settings-btn')?.addEventListener('click', () => this.showScreen('settings-menu'));
        document.getElementById('close-settings-btn')?.addEventListener('click', () => this.showScreen('main-menu'));
        document.getElementById('load-btn')?.addEventListener('click', () => this.openLoadGame());
        document.getElementById('save-btn')?.addEventListener('click', () => this.saveSystem.openSaveMenu(this.gameState));
        document.getElementById('load-game-btn')?.addEventListener('click', () => this.openLoadGame());
        document.getElementById('menu-btn')?.addEventListener('click', () => {
            if (confirm('Return to main menu?')) {
                this.saveSystem.quickSave(this.gameState);
                this.showScreen('main-menu');
            }
        });
        document.getElementById('close-save-load-btn')?.addEventListener('click', () => this.showScreen('main-menu'));
    }

    openLoadGame() {
        const saves = this.saveSystem.getAllSaves();
        this.saveSystem.displayLoadMenu(saves, (save) => {
            this.gameState = save;
            this.applySettings();
            this.playGame();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.engine = new NightRajaEngine();
    window.engine.init();
});
