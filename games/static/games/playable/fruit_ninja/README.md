# 🍎 Fruit Ninja - Web Game

A modern, browser-based implementation of the classic Fruit Ninja game built with vanilla JavaScript and HTML5 Canvas. Slice fruits, avoid bombs, and aim for high scores in this fast-paced action game!

## 🌐 Live Demo

**[Play the Game Here!](https://aa-ayushadhikari.github.io/fruitninja/)** 🎮

Experience the game directly in your browser - no downloads required!

## 🎮 Features

- **Classic Fruit Ninja Gameplay**: Slice flying fruits with mouse/touch gestures
- **Physics-Based Movement**: Realistic gravity and motion physics
- **Combo System**: Chain slices for higher scores and special effects
- **Dynamic Difficulty**: Game speed increases over time for progressive challenge
- **Rich Audio Experience**: Multiple sound effects and background music
- **Particle Effects**: Juice splashes, explosions, and visual feedback
- **Responsive Design**: Works on desktop and mobile devices
- **Fullscreen Support**: Immersive gaming experience
- **High Score Tracking**: Keep track of your best performances

## 🚀 Quick Start

1. Clone or download this repository
2. Open `index.html` in a modern web browser
3. Click "Enter Fullscreen" to begin
4. Click "Start Game" and enjoy!

**Note**: For the best experience, use a modern browser with HTML5 Canvas and Web Audio API support.

## 🎯 How to Play

1. **Start the Game**: Click the "Start Game" button from the main menu
2. **Slice Fruits**: Move your mouse (or finger on mobile) across fruits to slice them
3. **Avoid Bombs**: Don't slice the bombs (💣) - they'll end your game!
4. **Build Combos**: Slice multiple fruits quickly to build combos for bonus points
5. **Survive**: Keep slicing as the game gets faster and more challenging

### Controls
- **Mouse**: Move cursor to slice fruits
- **Touch**: Swipe across the screen (mobile devices)
- **F11 or F**: Toggle fullscreen
- **M**: Mute/unmute audio
- **Esc (hold)**: Exit fullscreen
- **Ctrl+D**: Toggle debug mode (development)

## 🛠️ Project Structure

```
fruitsninja/
├── index.html              # Main HTML file
├── styles/
│   └── main.css            # Game styling
├── scripts/
│   ├── main.js             # Entry point and initialization
│   ├── core/               # Core game systems
│   │   ├── Constants.js    # Game configuration
│   │   ├── GameState.js    # Game state management
│   │   └── GameEngine.js   # Main game loop
│   ├── entities/           # Game objects
│   │   ├── GameObject.js   # Base game object class
│   │   ├── Fruit.js        # Fruit entities
│   │   ├── FruitSlice.js   # Sliced fruit pieces
│   │   ├── Particle.js     # Particle effects
│   │   └── ComboSplash.js  # Combo text effects
│   ├── input/              # Input handling
│   │   └── InputManager.js # Mouse/touch input
│   ├── rendering/          # Graphics and rendering
│   │   ├── Renderer.js     # Main renderer
│   │   └── EmojiCache.js   # Emoji rendering optimization
│   ├── audio/              # Audio system
│   │   └── AudioManager.js # Sound and music management
│   ├── effects/            # Visual effects
│   │   └── EffectsManager.js # Particle and effect systems
│   ├── spawning/           # Object spawning
│   │   └── SpawnManager.js # Fruit and bomb spawning
│   ├── collision/          # Physics and collision
│   │   └── CollisionDetector.js # Collision detection
│   ├── ui/                 # User interface
│   │   └── UIManager.js    # Menu and UI management
│   └── utils/              # Utility functions
│       └── GeometryUtils.js # Math and geometry helpers
└── Sound/                  # Audio assets
    ├── blade-*.wav         # Slice sound effects
    ├── combo-*.wav         # Combo sound effects
    ├── Bomb-*.wav          # Bomb sound effects
    └── ...                 # Additional audio files
```

## 🔧 Technical Details

### Technologies Used
- **HTML5 Canvas**: For rendering graphics and animations
- **Vanilla JavaScript**: No external frameworks or libraries
- **Web Audio API**: For sound effects and music
- **CSS3**: For UI styling and responsive design
- **Emoji**: For fruit and bomb graphics (performance optimized)

### Architecture
The game follows a modular architecture with clear separation of concerns:

- **Game Engine**: Manages the main game loop, timing, and state
- **Entity System**: Object-oriented approach for game entities
- **Component Systems**: Specialized managers for different aspects (audio, input, rendering)
- **Event-Driven**: Loose coupling between systems through events

### Performance Optimizations
- **Emoji Caching**: Pre-rendered emoji sprites for better performance
- **Particle Pooling**: Reuse particle objects to reduce garbage collection
- **Efficient Collision Detection**: Optimized algorithms for real-time performance
- **Canvas Optimization**: Minimal redraws and efficient rendering techniques

## 🎵 Audio Assets

The game includes a comprehensive audio system with:
- **Blade Sounds**: Multiple slice sound variations
- **Combo Effects**: Audio feedback for combo achievements  
- **Environmental Sounds**: Background ambiance and effects
- **UI Sounds**: Menu navigation and interaction feedback

## 🎨 Customization

### Game Balance
Edit `scripts/core/Constants.js` to adjust:
- Spawn rates and difficulty progression
- Physics properties (gravity, velocities)
- Particle effects and visual properties
- Scoring and combo systems

### Visual Styling
Modify `styles/main.css` to change:
- Color schemes and themes
- UI layout and positioning
- Animation and transition effects
- Responsive design breakpoints

### Audio
Replace files in the `Sound/` directory to customize:
- Sound effects for different actions
- Background music tracks
- Audio volume and timing

## 🌐 Browser Compatibility

**Supported Browsers:**
- Chrome/Chromium 60+
- Firefox 55+
- Safari 11+
- Edge 79+

**Required Features:**
- HTML5 Canvas 2D Context
- Web Audio API
- ES6+ JavaScript support
- CSS3 Flexbox

## 🚀 Development

### Debug Features
When running locally, access debug tools via the browser console:

```javascript
// Available debug commands
GameDebug.spawnFruit()          // Force spawn a fruit
GameDebug.spawnBomb()           // Spawn a bomb
GameDebug.createFruitRain(10)   // Spawn multiple fruits
GameDebug.getStats()            // Get performance statistics
GameDebug.toggleDebug()         // Toggle debug display
GameDebug.clearEffects()        // Clear all particle effects
```

### Local Development
1. Serve files through a local web server (required for audio loading)
2. Use browser developer tools for debugging
3. Monitor console for performance metrics and errors

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Areas for improvement:
- Additional fruit types and effects
- New game modes (time attack, zen mode)
- Enhanced mobile experience
- Accessibility improvements
- Performance optimizations

## 🎯 Future Enhancements

- **Power-ups**: Special abilities and temporary effects
- **Multiplayer**: Local and online competitive modes
- **Achievements**: Unlock system for goals and challenges
- **Themes**: Different visual styles and environments
- **Analytics**: Detailed performance and gameplay metrics

---

**Enjoy slicing! 🍎🔪**
