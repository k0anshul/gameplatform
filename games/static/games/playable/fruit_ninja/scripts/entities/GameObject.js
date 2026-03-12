/**
 * Base GameObject Class
 * Abstract base class for all game entities (fruits, particles, etc.)
 * Provides common properties and methods shared by all game objects
 */

class GameObject {
  /**
   * Creates a new GameObject with basic physics properties
   * @param {number} x - Initial X coordinate
   * @param {number} y - Initial Y coordinate
   * @param {number} vx - Initial X velocity
   * @param {number} vy - Initial Y velocity
   */
  constructor(x = 0, y = 0, vx = 0, vy = 0) {
    // Position properties
    this.x = x;
    this.y = y;
    
    // Velocity properties
    this.vx = vx;
    this.vy = vy;
    
    // Rotation properties
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() * 2 - 1) * Math.PI;
    
    // Lifecycle properties
    this.life = 1.0;
    this.maxLife = 1.0;
    this.isAlive = true;
  }

  /**
   * Updates the game object's position and physics
   * Should be called every frame with the time delta
   * @param {number} deltaTime - Time elapsed since last update (in seconds)
   */
  update(deltaTime) {
    // Update position based on velocity
    this.x += this.vx * deltaTime;
    this.y += this.vy * deltaTime;
    
    // Apply gravity to vertical velocity
    this.vy += GameConstants.GRAVITY * deltaTime;
    
    // Update rotation
    this.rotation += this.rotationSpeed * deltaTime;
    
    // Update life if object has limited lifespan
    if (this.maxLife > 0) {
      this.life -= deltaTime;
      if (this.life <= 0) {
        this.isAlive = false;
      }
    }
  }

  /**
   * Renders the game object to the canvas
   * This is a placeholder method that should be overridden by subclasses
   * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
   */
  render(ctx) {
    // Base implementation - subclasses should override this
    console.warn('GameObject.render() should be overridden by subclasses');
  }

  /**
   * Checks if the object is outside the canvas bounds and should be removed
   * @param {number} canvasWidth - Canvas width
   * @param {number} canvasHeight - Canvas height
   * @returns {boolean} True if object should be removed
   */
  shouldRemove(canvasWidth, canvasHeight) {
    // Remove if not alive or if far outside canvas bounds
    return !this.isAlive || 
           this.y > canvasHeight + GameConstants.CANVAS_OVERFLOW_THRESHOLD;
  }

  /**
   * Gets the current alpha value based on remaining life
   * Useful for fade-out effects
   * @returns {number} Alpha value between 0 and 1
   */
  getAlpha() {
    return this.maxLife > 0 ? Math.max(0, this.life / this.maxLife) : 1.0;
  }

  /**
   * Sets the object's position
   * @param {number} x - New X coordinate
   * @param {number} y - New Y coordinate
   */
  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Sets the object's velocity
   * @param {number} vx - New X velocity
   * @param {number} vy - New Y velocity
   */
  setVelocity(vx, vy) {
    this.vx = vx;
    this.vy = vy;
  }

  /**
   * Adds force to the object's velocity
   * @param {number} fx - Force in X direction
   * @param {number} fy - Force in Y direction
   */
  addForce(fx, fy) {
    this.vx += fx;
    this.vy += fy;
  }

  /**
   * Gets the distance to another game object
   * @param {GameObject} other - Another game object
   * @returns {number} Distance between objects
   */
  distanceTo(other) {
    return GeometryUtils.distance(this.x, this.y, other.x, other.y);
  }

  /**
   * Destroys the object (marks it as not alive)
   */
  destroy() {
    this.isAlive = false;
  }
}
