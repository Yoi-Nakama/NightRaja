# Night Raja - A Choice-Based Web Visual Novel

A browser-based visual novel game where your choices determine the fate of humanity.

## Overview

Night Raja is a choice-driven narrative experience where you play as a vampire sent to Earth by divine forces. Your decisions shape your character's moral alignment, unlock supernatural abilities, and determine multiple branching story paths and endings.

## Features

- **Choice-Based Narrative**: Multiple branching paths with 5 main acts and numerous endings
- **Karma System**: Good, Neutral, and Dark paths influence character development
- **Divine Observation**: Sun God and North Star meters affect secret story routes
- **Power Progression**: Unlock abilities and advance through 5 power stages
- **Save System**: 9 save slots with persistent storage using browser local storage
- **Customizable Interface**: Adjust text size, speed, color, and animation style
- **Mobile Responsive**: Optimized for mobile browsers and touch interaction
- **Lightweight**: Modular structure for easy expansion with new content

## Project Structure

```
night-raja/
├── index.html           # Main HTML structure
├── style.css            # All styling and animations
├── engine.js            # Core visual novel engine
├── story.js             # Story content and scenes
├── save-system.js       # Save/load functionality
├── settings.js          # Settings management
├── README.md            # This file
└── assets/
    ├── backgrounds/     # Background images for scenes
    ├── characters/      # Character portraits
    ├── music/          # Background music files
    └── video/          # Menu background video
```

## Getting Started

1. Create a GitHub repository called `night-raja`
2. Copy all files to the repository
3. Add background images, character portraits, and music to the `assets/` folder
4. Open `index.html` in a web browser
5. Start creating your story!

## Story Structure

The game is organized into 5 acts:

- **Act 1**: Arrival on Earth and initial encounters
- **Act 2**: Discovering humanity's nature
- **Act 3**: Rise of chaos and choice
- **Act 4**: Divine conflict and revelation
- **Act 5**: Final fate and ending determination

## Adding New Content

### Adding a Scene

Edit `story.js` and add to the `storyData.scenes` object:

```javascript
'your_scene_id': {
    background: 'assets/backgrounds/image.jpg',
    character: 'assets/characters/portrait.png',
    speaker: 'Character Name',
    text: 'Dialogue text here...',
    choices: [
        {
            text: 'Choice text',
            karma: 10,           // -100 to +100
            sunGod: 5,          // Affects Sun God meter
            northStar: 5,       // Affects North Star meter
            unlocksAbility: 'Ability Name',
            nextScene: 'next_scene_id',
        },
    ],
    music: 'assets/music/theme.mp3',
},
```

### Adding Abilities

Abilities unlock through story choices and can be referenced in scenes:

```javascript
unlocksAbility: 'Blood Drain',
```

## Game Mechanics

### Karma System
- **-100 to -30**: Dark alignment (exploiting humanity)
- **-29 to +29**: Neutral alignment (survival focused)
- **+30 to +100**: Good alignment (protecting humanity)

### Power Stages
1. **Enhanced Human**: Superhuman strength, speed, reflexes
2. **Awakening**: Super speed, enhanced senses, blood detection
3. **True Vampire**: Blood magic, shadow manipulation
4. **Ancient Power**: Shadow teleportation, extreme regeneration
5. **Original Power**: Near godlike abilities (rare ending)

### Divine Meters
- **Sun God Meter**: Increases with dominant, aggressive choices
- **North Star Meter**: Increases with compassionate, protective choices

These meters influence secret story routes and special endings.

## Technical Details

### Browser Storage
- Game saves are stored in browser `localStorage`
- Settings are persisted across sessions
- No external backend required

### Responsive Design
- Works on desktop, tablet, and mobile
- Touch-friendly choice buttons
- Optimized for low-end devices
- Lightweight JavaScript (no frameworks required)

## Customization

### Text Settings
- Adjust font size (12px - 20px)
- Control animation speed (typewriter or instant)
- Change text color
- Enable/disable background music

### Visual Assets
- Replace backgrounds in `assets/backgrounds/`
- Add character portraits to `assets/characters/`
- Include music files in `assets/music/`
- Add background video to `assets/video/`

## Future Expansion

The modular engine design allows for:

- **New Acts**: Add more story content by expanding `story.js`
- **New Abilities**: Reference new abilities in choices
- **Multiple Endings**: Create branching paths that converge at finale
- **Achievements**: Track player milestones
- **Achievements System**: Award badges based on choices
- **Advanced Graphics**: Integrate with animation libraries
- **Voice Acting**: Add audio dialogue
- **Translation**: Support multiple languages

## Performance

- Pure HTML, CSS, and JavaScript (no dependencies)
- Lightweight asset loading
- Efficient scene transitions
- Optimized for 60 FPS on modern devices

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Feel free to use this project as a base for your own visual novel games.

## Contributing

To contribute new story content, scenes, or improvements:

1. Create a new branch
2. Add your content to `story.js`
3. Test thoroughly
4. Submit a pull request

---

**Night Raja** - Where divine forces test humanity through the choices of a vampire.
