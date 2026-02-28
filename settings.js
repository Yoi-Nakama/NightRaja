/**
 * Night Raja - Settings Manager
 * Manages game settings and persistence
 */

class SettingsManager {
    constructor() {
        this.storageKey = 'nightRaja_settings';
        this.defaults = {
            textSize: 16,
            textSpeed: 50,
            textColor: '#ffffff',
            dialogueAnimation: 'typewriter',
            backgroundMusic: true,
        };
        this.settings = { ...this.defaults };
    }

    /**
     * Load settings from storage
     */
    load() {
        const data = localStorage.getItem(this.storageKey);
        if (data) {
            this.settings = { ...this.defaults, ...JSON.parse(data) };
        }
    }

    /**
     * Save settings to storage
     */
    save() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.settings));
    }

    /**
     * Get a setting value
     */
    get(key) {
        return this.settings[key] !== undefined ? this.settings[key] : this.defaults[key];
    }

    /**
     * Set a setting value
     */
    set(key, value) {
        this.settings[key] = value;
        this.save();
    }

    /**
     * Reset to defaults
     */
    reset() {
        this.settings = { ...this.defaults };
        this.save();
    }
}

// Setup settings UI handlers
document.addEventListener('DOMContentLoaded', () => {
    const textSizeInput = document.getElementById('text-size');
    const textSizeDisplay = document.getElementById('text-size-display');
    const textSpeedInput = document.getElementById('text-speed');
    const textSpeedDisplay = document.getElementById('text-speed-display');
    const textColorInput = document.getElementById('text-color');
    const dialogueAnimationSelect = document.getElementById('dialogue-animation');
    const musicToggle = document.getElementById('background-music-toggle');

    if (textSizeInput) {
        textSizeInput.addEventListener('change', (e) => {
            const size = e.target.value;
            textSizeDisplay.textContent = size + 'px';
            if (window.engine) {
                window.engine.settings.set('textSize', parseInt(size));
            }
        });
    }

    if (textSpeedInput) {
        textSpeedInput.addEventListener('change', (e) => {
            const speed = e.target.value;
            let label = 'Normal';
            if (speed < 33) label = 'Slow';
            else if (speed > 66) label = 'Fast';
            textSpeedDisplay.textContent = label;
            if (window.engine) {
                window.engine.settings.set('textSpeed', parseInt(speed));
            }
        });
    }

    if (textColorInput) {
        textColorInput.addEventListener('change', (e) => {
            if (window.engine) {
                window.engine.settings.set('textColor', e.target.value);
            }
        });
    }

    if (dialogueAnimationSelect) {
        dialogueAnimationSelect.addEventListener('change', (e) => {
            if (window.engine) {
                window.engine.settings.set('dialogueAnimation', e.target.value);
            }
        });
    }

    if (musicToggle) {
        musicToggle.addEventListener('change', (e) => {
            if (window.engine) {
                window.engine.settings.set('backgroundMusic', e.target.checked);
            }
        });
    }
});
