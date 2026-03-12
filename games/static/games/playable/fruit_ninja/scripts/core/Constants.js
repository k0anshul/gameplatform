/**
 * Game Constants Configuration
 * Centralized location for all game configuration values and constants
 * This allows for easy tweaking of game balance and behavior
 */

const GameConstants = {
  // Physics Constants
  GRAVITY: 1000,                    // Gravity force affecting all game objects
  CANVAS_OVERFLOW_THRESHOLD: 100,   // Distance beyond canvas before objects are removed
  
  // Timing Constants
  INITIAL_SPAWN_INTERVAL: 1000,     // Initial time between fruit spawns (ms)
  MIN_SPAWN_INTERVAL: 300,          // Minimum spawn interval for maximum difficulty (ms)
  COMBO_THRESHOLD: 800,             // Max time between slices to maintain combo (ms)
  SWIPE_SOUND_COOLDOWN: 150,        // Minimum time between swipe sounds (ms)
  SWIPE_TRAIL_DURATION: 200,        // How long swipe trail points last (ms)
  
  // Difficulty Scaling
  DIFFICULTY_INCREASE_RATE: 10,     // How fast spawn rate increases per second
  SPEED_INCREASE_RATE: 5,           // How much fruit speed increases per second
  
  // Entity Sizes and Properties
  FRUIT_BASE_RADIUS: 30,            // Base radius for fruits
  FRUIT_RADIUS_VARIATION: 10,       // Random variation in fruit radius
  BOMB_CHANCE: 0.15,                // Probability of spawning a bomb instead of fruit
  
  // Spawn Area Configuration
  SPAWN_CENTER_OFFSET: 200,         // Maximum horizontal offset from center for spawning
  SPAWN_VELOCITY_RANGE: 200,        // Range of horizontal velocity for spawned items
  SPAWN_VELOCITY_MIN: 800,          // Minimum upward velocity for spawned items
  SPAWN_VELOCITY_VARIATION: 200,    // Random variation in upward velocity
  
  // Slice Effects
  SLICE_SEPARATION_FORCE: 50,       // Base force separating fruit halves when sliced
  SLICE_SEPARATION_VARIATION: 50,   // Random variation in separation force
  SLICE_ROTATION_MODIFIER: 2,       // Multiplier for rotation change on slice
  SLICE_LIFE_DURATION: 1.0,         // How long sliced fruit pieces remain visible (seconds)
  
  // Particle System
  JUICE_PARTICLE_COUNT: 12,         // Number of juice particles per fruit slice (reduced for performance)
  JUICE_PARTICLE_SPEED_MIN: 50,     // Minimum speed for juice particles
  JUICE_PARTICLE_SPEED_MAX: 200,    // Maximum speed for juice particles
  JUICE_PARTICLE_RADIUS_MIN: 2,     // Minimum radius for juice particles
  JUICE_PARTICLE_RADIUS_MAX: 4,     // Maximum radius for juice particles
  JUICE_PARTICLE_LIFE: 1.0,         // Life duration for juice particles (seconds)
  
  BOMB_EXPLOSION_COUNT: 8,          // Number of explosion particles per bomb (reduced for performance)
  BOMB_EXPLOSION_SPEED_MIN: 50,     // Minimum speed for bomb explosion particles
  BOMB_EXPLOSION_SPEED_MAX: 150,    // Maximum speed for bomb explosion particles
  BOMB_EXPLOSION_LIFE: 0.8,         // Life duration for bomb explosion particles (seconds)
  
  // Wall Splash Effects
  WALL_SPLASH_LIFE: 1.0,            // How long wall splashes remain visible (reduced for performance)
  WALL_SPLASH_RADIUS_X_MIN: 20,     // Minimum horizontal radius for wall splashes
  WALL_SPLASH_RADIUS_X_MAX: 50,     // Maximum horizontal radius for wall splashes
  WALL_SPLASH_RADIUS_Y_MIN: 10,     // Minimum vertical radius for wall splashes
  WALL_SPLASH_RADIUS_Y_MAX: 30,     // Maximum vertical radius for wall splashes
  
  // Combo System
  COMBO_SPLASH_LIFE: 1.0,           // How long combo text displays (seconds)
  COMBO_SPLASH_Y_POSITION: 150,     // Vertical position for combo text display
  COMBO_SCALE_MULTIPLIER: 0.5,      // Scale increase multiplier for combo text animation
  
  // Rendering Properties
  SWIPE_TRAIL_WIDTH: 5,             // Width of the swipe trail line
  FRUIT_SHADOW_BLUR: 20,            // Shadow blur amount for fruits
  BOMB_SHADOW_BLUR: 25,             // Shadow blur amount for bombs
  EXPLOSION_JITTER_RANGE: 6,        // Range of random jitter for explosion particles
  
  // Emoji Sets
  FRUIT_EMOJIS: ["🍎", "🍌", "🍊", "🍇", "🍉", "🍍"],
  BOMB_EMOJI: "💣",
  EXPLOSION_EMOJI: "💥",
  READY_SCREEN_EMOJI: "🍎",
  
  // Color Definitions
  COLORS: {
    NEON_CYAN: "#0ff",
    NEON_RED: "#ff0055",
    NEON_YELLOW: "#ff0",
    JUICE_RED: "rgba(255, 0, 0, 0.8)",
    SWIPE_TRAIL: "rgba(0,255,255,{alpha})"
  }
};
