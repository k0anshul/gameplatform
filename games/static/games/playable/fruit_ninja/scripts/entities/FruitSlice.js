/**
 * FruitSlice Class
 * Represents the halves of a sliced fruit that fall and fade away
 * Extends GameObject with slice-specific rendering and behavior
 */

class FruitSlice extends GameObject {
  /**
   * Creates a new FruitSlice object
   * @param {number} x - Initial X coordinate
   * @param {number} y - Initial Y coordinate
   * @param {number} vx - Initial X velocity
   * @param {number} vy - Initial Y velocity
   * @param {string} emoji - Emoji representation of the original fruit
   * @param {string} half - Which half this represents ("left" or "right")
   * @param {number} size - Size of the slice
   * @param {number} rotation - Initial rotation
   * @param {number} rotationSpeed - Rotation speed
   */
  constructor(x, y, vx, vy, emoji, half = "left", size = 60, rotation = 0, rotationSpeed = 0) {
    super(x, y, vx, vy);
    
    // Slice-specific properties
    this.emoji = emoji;
    this.half = half; // "left" or "right"
    this.size = size;
    
    // Override lifecycle properties for slices
    this.life = GameConstants.SLICE_LIFE_DURATION;
    this.maxLife = GameConstants.SLICE_LIFE_DURATION;
    
    // Set rotation properties
    this.rotation = rotation;
    this.rotationSpeed = rotationSpeed;
  }

  /**
   * Creates two fruit slices from a sliced fruit
   * @param {Fruit} fruit - The original fruit that was sliced
   * @returns {Array<FruitSlice>} Array containing left and right slice halves
   */
  static createFromFruit(fruit) {
    const slices = [];
    const size = fruit.radius * 2;
    
    // Create left half
    const leftVx = fruit.vx - (GameConstants.SLICE_SEPARATION_FORCE + 
                               Math.random() * GameConstants.SLICE_SEPARATION_VARIATION);
    const leftVy = fruit.vy - (GameConstants.SLICE_SEPARATION_FORCE + 
                               Math.random() * GameConstants.SLICE_SEPARATION_VARIATION);
    const leftRotationSpeed = fruit.rotationSpeed - 
                              (Math.random() * GameConstants.SLICE_ROTATION_MODIFIER);
    
    slices.push(new FruitSlice(
      fruit.x, fruit.y, leftVx, leftVy,
      fruit.emoji, "left", size,
      fruit.rotation, leftRotationSpeed
    ));
    
    // Create right half
    const rightVx = fruit.vx + (GameConstants.SLICE_SEPARATION_FORCE + 
                                Math.random() * GameConstants.SLICE_SEPARATION_VARIATION);
    const rightVy = fruit.vy - (GameConstants.SLICE_SEPARATION_FORCE + 
                                Math.random() * GameConstants.SLICE_SEPARATION_VARIATION);
    const rightRotationSpeed = fruit.rotationSpeed + 
                               (Math.random() * GameConstants.SLICE_ROTATION_MODIFIER);
    
    slices.push(new FruitSlice(
      fruit.x, fruit.y, rightVx, rightVy,
      fruit.emoji, "right", size,
      fruit.rotation, rightRotationSpeed
    ));
    
    return slices;
  }

  /**
   * Updates the slice's position and physics
   * @param {number} deltaTime - Time elapsed since last update
   */
  update(deltaTime) {
    super.update(deltaTime);
    
    // Apply additional physics effects specific to slices
    // Could add air resistance or other effects here if desired
  }

  /**
   * Renders the fruit slice with clipping to show only half of the emoji
   * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
   */
  render(ctx) {
    const alpha = this.getAlpha();
    if (alpha <= 0) return;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);

    const size = this.size;
    const off = EmojiCache.getCanvas(this.emoji, size);
    const w = off.width;
    const h = off.height;

    // Clip to half
    ctx.beginPath();
    if (this.half === 'left') {
      ctx.rect(-w / 2, -h / 2, w / 2, h);
    } else {
      ctx.rect(0, -h / 2, w / 2, h);
    }
    ctx.clip();

    ctx.drawImage(off, -w / 2, -h / 2);

    ctx.restore();
  }

  /**
   * Checks if the slice should be removed
   * @param {number} canvasWidth - Canvas width
   * @param {number} canvasHeight - Canvas height
   * @returns {boolean} True if slice should be removed
   */
  shouldRemove(canvasWidth, canvasHeight) {
    // Remove if life expired or far off screen
    return !this.isAlive || 
           this.y > canvasHeight + GameConstants.CANVAS_OVERFLOW_THRESHOLD ||
           this.x < -GameConstants.CANVAS_OVERFLOW_THRESHOLD ||
           this.x > canvasWidth + GameConstants.CANVAS_OVERFLOW_THRESHOLD;
  }

  /**
   * Gets the slice's bounding box
   * @returns {Object} Bounding box with left, right, top, bottom properties
   */
  getBounds() {
    const halfSize = this.size / 2;
    return {
      left: this.x - halfSize,
      right: this.x + halfSize,
      top: this.y - halfSize,
      bottom: this.y + halfSize
    };
  }

  /**
   * Creates a juice particle effect at the slice's current position
   * This can be called when the slice hits something or for extra effects
   */
  createJuiceEffect() {
    // This would typically be handled by the EffectsManager
    // but we provide this method as a convenience
    return {
      type: "juice",
      position: { x: this.x, y: this.y },
      velocity: { x: this.vx, y: this.vy }
    };
  }
}
