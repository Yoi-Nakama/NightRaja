/**
 * Night Raja - Save System
 * Manages game saves using browser local storage
 */

class SaveSystem {
    constructor() {
        this.maxSaves = 9;
        this.storageKey = 'nightRaja_saves';
    }

    /**
     * Save game to a specific slot
     */
    save(gameState, slotNumber) {
        if (slotNumber < 1 || slotNumber > this.maxSaves) {
            console.error('Invalid save slot');
            return false;
        }

        const saves = this.getAllSaves();
        const save = {
            slot: slotNumber,
            playerName: gameState.playerName,
            playerGender: gameState.playerGender,
            currentScene: gameState.currentScene,
            karma: gameState.karma,
            sunGodMeter: gameState.sunGodMeter,
            northStarMeter: gameState.northStarMeter,
            powerStage: gameState.powerStage,
            unlockedAbilities: gameState.unlockedAbilities,
            visitedScenes: Array.from(gameState.visitedScenes),
            choices: gameState.choices,
            timestamp: new Date().toISOString(),
        };

        saves[slotNumber - 1] = save;
        localStorage.setItem(this.storageKey, JSON.stringify(saves));
        return true;
    }

    /**
     * Quick save to auto slot
     */
    quickSave(gameState) {
        this.save(gameState, this.maxSaves);
    }

    /**
     * Load game from a specific slot
     */
    load(slotNumber) {
        const saves = this.getAllSaves();
        const save = saves[slotNumber - 1];

        if (!save) {
            console.error('No save in slot', slotNumber);
            return null;
        }

        return {
            playerName: save.playerName,
            playerGender: save.playerGender,
            currentScene: save.currentScene,
            karma: save.karma,
            sunGodMeter: save.sunGodMeter,
            northStarMeter: save.northStarMeter,
            powerStage: save.powerStage,
            unlockedAbilities: save.unlockedAbilities,
            visitedScenes: new Set(save.visitedScenes),
            choices: save.choices,
        };
    }

    /**
     * Delete save from specific slot
     */
    delete(slotNumber) {
        const saves = this.getAllSaves();
        saves[slotNumber - 1] = null;
        localStorage.setItem(this.storageKey, JSON.stringify(saves));
    }

    /**
     * Get all saves
     */
    getAllSaves() {
        const data = localStorage.getItem(this.storageKey);
        if (!data) {
            return Array(this.maxSaves).fill(null);
        }
        return JSON.parse(data);
    }

    /**
     * Display save menu
     */
    openSaveMenu(gameState) {
        document.getElementById('modal-title').textContent = 'Save Game';
        const container = document.getElementById('save-slots');
        container.innerHTML = '';

        const saves = this.getAllSaves();

        for (let i = 1; i <= this.maxSaves; i++) {
            const slot = document.createElement('div');
            slot.className = 'save-slot';
            const save = saves[i - 1];

            if (save) {
                slot.classList.add('filled');
                slot.innerHTML = `
                    <div class="save-slot-number">Slot ${i}</div>
                    <div class="save-slot-info">
                        <div>${save.playerName}</div>
                        <div>${save.currentScene}</div>
                        <div>${new Date(save.timestamp).toLocaleDateString()}</div>
                    </div>
                `;
                slot.addEventListener('click', () => {
                    this.save(gameState, i);
                    alert(`Game saved to slot ${i}`);
                    window.engine.closeSaveLoadMenu();
                });
            } else {
                slot.classList.add('empty');
                slot.innerHTML = `
                    <div class="save-slot-number">Slot ${i}</div>
                    <div class="save-slot-info">Empty</div>
                `;
                slot.addEventListener('click', () => {
                    this.save(gameState, i);
                    alert(`Game saved to slot ${i}`);
                    window.engine.closeSaveLoadMenu();
                });
            }

            container.appendChild(slot);
        }

        window.engine.showScreen('save-load-menu');
    }

    /**
     * Display load menu
     */
    displayLoadMenu(saves, callback) {
        document.getElementById('modal-title').textContent = 'Load Game';
        const container = document.getElementById('save-slots');
        container.innerHTML = '';

        for (let i = 1; i <= this.maxSaves; i++) {
            const slot = document.createElement('div');
            slot.className = 'save-slot';
            const save = saves[i - 1];

            if (save) {
                slot.classList.add('filled');
                slot.innerHTML = `
                    <div class="save-slot-number">Slot ${i}</div>
                    <div class="save-slot-info">
                        <div>${save.playerName}</div>
                        <div>${save.currentScene}</div>
                        <div>${new Date(save.timestamp).toLocaleDateString()}</div>
                    </div>
                `;
                slot.addEventListener('click', () => {
                    const loadedState = this.load(i);
                    callback(loadedState);
                    window.engine.showScreen('game-screen');
                });
            } else {
                slot.classList.add('empty');
                slot.innerHTML = `
                    <div class="save-slot-number">Slot ${i}</div>
                    <div class="save-slot-info">Empty</div>
                `;
            }

            container.appendChild(slot);
        }

        window.engine.showScreen('save-load-menu');
    }
            }
