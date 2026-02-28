/**
 * Night Raja - UI Manager
 * Manages all 7 layers and screen transitions
 */

class UIManager {
    constructor() {
        this.currentScreen = 'main-menu';
        this.previousScreen = null;
        this.layers = {
            background: document.getElementById('background-layer'),
            scene3d: document.getElementById('scene3d-container'),
            story: document.getElementById('story-layer'),
            mainMenu: document.getElementById('main-menu-layer'),
            charCreation: document.getElementById('char-creation-layer'),
            saveLoad: document.getElementById('save-load-layer'),
            settings: document.getElementById('settings-layer'),
            minigame: document.getElementById('minigame-layer'),
            overlay: document.getElementById('overlay-layer'),
        };
    }

    /**
     * Show a specific screen layer
     */
    showScreen(screenId) {
        console.log(`UIManager: Transitioning to ${screenId}`);
        
        // Hide all modal layers
        this.hideAllModals();

        // Store previous screen
        if (this.currentScreen !== screenId) {
            this.previousScreen = this.currentScreen;
        }

        this.currentScreen = screenId;

        switch (screenId) {
            case 'main-menu':
                this.showMainMenu();
                break;
            case 'game':
                this.showGame();
                break;
            case 'character-creation':
                this.showCharacterCreation();
                break;
            case 'save-load':
                this.showSaveLoad();
                break;
            case 'settings':
                this.showSettings();
                break;
            case 'minigame':
                this.showMinigame();
                break;
            default:
                console.warn(`Unknown screen: ${screenId}`);
        }
    }

    /**
     * Show main menu
     */
    showMainMenu() {
        this.hideAllScreenLayers();
        this.layers.mainMenu.classList.add('active');
        this.playBackgroundMusic('assets/music/menu.mp3');
    }

    /**
     * Show game screen
     */
    showGame() {
        this.hideAllScreenLayers();
        this.layers.story.classList.add('active');
        this.layers.background.style.display = 'block';
    }

    /**
     * Show character creation
     */
    showCharacterCreation() {
        this.hideAllScreenLayers();
        this.layers.charCreation.classList.add('active');
    }

    /**
     * Show save/load modal
     */
    showSaveLoad() {
        this.layers.saveLoad.classList.add('active');
    }

    /**
     * Show settings modal
     */
    showSettings() {
        this.layers.settings.classList.add('active');
    }

    /**
     * Show minigame
     */
    showMinigame() {
        this.layers.minigame.classList.add('active');
    }

    /**
     * Hide all screen layers
     */
    hideAllScreenLayers() {
        Object.values(this.layers).forEach(layer => {
            if (layer) layer.classList.remove('active');
        });
    }

    /**
     * Hide all modal layers
     */
    hideAllModals() {
        this.layers.saveLoad.classList.remove('active');
        this.layers.settings.classList.remove('active');
    }

    /**
     * Show notification toast
     */
    showNotification(message, type = 'info', duration = 3000) {
        const container = document.getElementById('notification-container');
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.color = type === 'success' ? '#00cc44' : 
                                   type === 'error' ? '#ff4444' : '#d4af37';
        
        container.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, duration);
    }

    /**
     * Fade transition
     */
    fadeTransition(duration = 500) {
        return new Promise(resolve => {
            const overlay = document.getElementById('fade-overlay');
            overlay.classList.add('active');
            overlay.style.transition = `background-color ${duration}ms ease`;
            
            setTimeout(() => {
                overlay.classList.remove('active');
                resolve();
            }, duration);
        });
    }

    /**
     * Set background image
     */
    setBackground(imagePath) {
        const bgElement = document.getElementById('background-image');
        if (imagePath) {
            bgElement.style.backgroundImage = `url('${imagePath}')`;
        } else {
            bgElement.style.backgroundImage = 'linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 100%)';
        }
    }

    /**
     * Set background video
     */
    setBackgroundVideo(videoPath) {
        const video = document.getElementById('background-video');
        if (videoPath) {
            video.src = videoPath;
            video.style.display = 'block';
        } else {
            video.style.display = 'none';
        }
    }

    /**
     * Play background music
     */
    playBackgroundMusic(musicPath) {
        const audio = document.getElementById('background-music');
        if (window.NightRaja.settings.get('backgroundMusic')) {
            audio.src = musicPath;
            audio.play().catch(e => console.log('Audio play failed:', e));
        }
    }

    /**
     * Update character portrait
     */
    setCharacterPortrait(imagePath) {
        const portrait = document.getElementById('character-portrait');
        if (imagePath) {
            portrait.src = imagePath;
            portrait.style.display = 'block';
        } else {
            portrait.style.display = 'none';
        }
    }

    /**
     * Update stats display
     */
    updateStats(karma, power, sunGod, northStar) {
        // Karma bar
        const karmaFill = document.getElementById('karma-fill');
        const karmaValue = document.getElementById('karma-value');
        const karmaPercent = (karma + 100) / 2;
        karmaFill.style.width = `${karmaPercent}%`;
        
        let karmaLabel = 'Neutral';
        if (karma > 30) karmaLabel = 'Good';
        else if (karma < -30) karmaLabel = 'Dark';
        karmaValue.textContent = karmaLabel;

        // Power bar
        const powerFill = document.getElementById('power-fill');
        const powerValue = document.getElementById('power-value');
        const powerPercent = (power / 5) * 100;
        powerFill.style.width = `${powerPercent}%`;
        powerValue.textContent = `Stage ${power}`;

        // Sun God bar
        const sunGodFill = document.getElementById('sungod-fill');
        const sunGodValue = document.getElementById('sungod-value');
        const sunGodPercent = Math.min(100, (sunGod / 100) * 100);
        sunGodFill.style.width = `${sunGodPercent}%`;
        sunGodValue.textContent = sunGod;

        // North Star bar
        const northStarFill = document.getElementById('northstar-fill');
        const northStarValue = document.
