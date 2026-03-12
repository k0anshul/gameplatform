---
name: Simple Tetris MVP
overview: Build a minimal Tetris game that runs in the browser with basic gameplay, score tracking, and piece movement controls.
todos: []
---

# Simple Tetris MVP Plan

## Overview

Create a single-page Tetris game using vanilla HTML, CSS, and JavaScript that runs directly in the browser. The game will include basic Tetris mechanics: falling pieces, movement controls, line clearing, and score tracking.

## Architecture

The application will consist of three files:

- `index.html` - Main HTML structure with game canvas and score display
- `style.css` - Basic styling for the game board and UI
- `game.js` - Core game logic including piece management, movement, and scoring

## Implementation Details

### 1. HTML Structure (`index.html`)

- Canvas element for rendering the game board (10x20 grid)
- Score display area
- Simple instructions for controls
- No external dependencies required

### 2. Game Logic (`game.js`)

- **Game Board**: 10 columns × 20 rows grid represented as a 2D array
- **Tetrominoes**: 7 standard Tetris pieces (I, O, T, S, Z, J, L shapes)
- **Piece Movement**:
- Left/Right arrow keys for horizontal movement
- Down arrow for soft drop
- Up arrow or Space for rotation
- **Game Loop**: 
- Pieces fall automatically at regular intervals
- Check for collisions before movement
- Lock pieces when they can't move down
- **Line Clearing**: Detect and remove completed rows
- **Score System**: Points for line clears (1 line = 100, 2 lines = 300, 3 lines = 500, 4 lines = 800)
- **Game Over**: Detect when new piece can't spawn

### 3. Styling (`style.css`)

- Grid-based layout for the game board
- Each cell is a small square (e.g., 30px × 30px)
- Color coding for different piece types
- Simple, clean design with dark background

## File Structure

```javascript
demo_cursor/
├── index.html
├── style.css
└── game.js
```



## Key Features

- 7 standard Tetris pieces with rotation
- Keyboard controls (arrow keys + space)
- Automatic piece falling
- Line clearing with score updates