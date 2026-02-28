/**
 * Night Raja - Settings Manager
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

    load() {
        const data = localStorage.getItem(this.storageKey);
        if (data) {
            this.settings = { ...this.defaults, ...JSON.parse(data) };
        }
        this.applyToUI();
    }

    save() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.settings));
    }

    get(key) {
        return this.settings[key] !== undefined ? this.settings[key] : this.defaults[key];
    }

    set(key, value) {
        this.settings[key] = value;
        this.save();
        if (window.engine) {
            window.engine.applySettings();
        }
    }

    applyToUI() {
        const textSizeInput = document.getElementById('text-size');
        const textSpeedInput = document.getElementById('text-speed');
        const textColorInput = document.getElementById('text-color');
        const dialogueSelect = document.getElementById('dialogue-animation');
        const musicToggle = document.getElementById('background-music-toggle');

        if (textSizeInput) textSizeInput.value = this.get('textSize');
        if (textSpeedInput) textSpeedInput.value = this.get('textSpeed');
        if (textColorInput) textColorInput.value = this.get('textColor');
        if (dialogueSelect) dialogueSelect.value = this.get('dialogueAnimation');
        if (musicToggle) musicToggle.checked = this.get('backgroundMusic');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const textSizeInput = document.getElementById('text-size');
    const textSizeDisplay = document.getElementById('text-size-display');
    const textSpeedInput = document.getElementById('text-speed');
    const textSpeedDisplay = document.getElementById('text-speed-display');
    const textColorInput = document.getElementById('text-color');
    const dialogueAnimationSelect = document.getElementById('dialogue-animation');
    const musicToggle = document.getElementById('background-music-toggle');

    if (textSizeInput) {
        textSizeInput.addEventListener('input', (e) => {
            const size = e.target.value;
            textSizeDisplay.textContent = size + 'px';
            if (window.engine?.settings) {
                window.engine.settings.set('textSize', parseInt(size));
            }
        });
    }

    if (textSpeedInput) {
        textSpeedInput.addEventListener('input', (e) => {
            const speed = e.target.value;
            let label = 'Normal';
            if (speed < 33) label = 'Slow';
            else if (speed > 66) label = 'Fast';
            textSpeedDisplay.textContent = label;
            if (window.engine?.settings) {
                window.engine.settings.set('textSpeed', parseInt(speed));
            }
        });
    }

    if (textColorInput) {
        textColorInput.addEventListener('change', (e) => {
            if (window.engine?.settings) {
                window.engine.settings.set('textColor', e.target.value);
            }
        });
    }

    if (dialogueAnimationSelect) {
        dialogueAnimationSelect.addEventListener('change', (e) => {
            if (window.engine?.settings) {
                window.engine.settings.set('dialogueAnimation', e.target.value);
            }
        });
    }

    if (musicToggle) {
        musicToggle.addEventListener('change', (e) => {
            if (window.engine?.settings) {
                window.engine.settings.set('backgroundMusic', e.target.checked);
            }
        });
    }
});
