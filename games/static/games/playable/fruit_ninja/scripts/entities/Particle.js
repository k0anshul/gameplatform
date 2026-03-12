/**
 * Particle Class
 * Represents various particle effects including juice splatters and bomb explosions
 * Extends GameObject with particle-specific rendering and behavior
 */

class Particle extends GameObject {
  /**
   * Creates a new Particle object
   * @param {number} x - Initial X coordinate
   * @param {number} y - Initial Y coordinate
   * @param {number} vx - Initial X velocity
   * @param {number} vy - Initial Y velocity
   * @param {string} type - Type of particle ("juice", "explosion", "wallSplash")
   * @param {Object} properties - Additional particle properties
   */
  constructor(x, y, vx, vy, type = "juice", properties = {}) {
    super(x, y, vx, vy);
    
    // Particle-specific properties
    this.type = type;
    this.radius = properties.radius || 3;
    this.color = properties.color || GameConstants.COLORS.JUICE_RED;
    this.emoji = properties.emoji || null;
    this.jitterRange = properties.jitterRange || 0;
    
    // Visual properties for wall splashes
    this.radiusX = properties.radiusX || 25;
    this.radiusY = properties.radiusY || 15;
    this.splashRotation = properties.splashRotation || Math.random() * Math.PI * 2;
    
    // Set lifecycle based on particle type
    switch (type) {
      case "juice":
        this.life = GameConstants.JUICE_PARTICLE_LIFE;
        this.maxLife = GameConstants.JUICE_PARTICLE_LIFE;
        break;
      case "explosion":
        this.life = GameConstants.BOMB_EXPLOSION_LIFE;
        this.maxLife = GameConstants.BOMB_EXPLOSION_LIFE;
        break;
      case "wallSplash":
        this.life = GameConstants.WALL_SPLASH_LIFE;
        this.maxLife = GameConstants.WALL_SPLASH_LIFE;
        break;
      default:
        this.life = 1.0;
        this.maxLife = 1.0;
    }
  }

  /**
   * Creates juice particles for a fruit slice effect
   * @param {number} x - Center X coordinate
   * @param {number} y - Center Y coordinate
   * @param {number} count - Number of particles to create
   * @returns {Array<Particle>} Array of juice particles
   */
  static createJuiceParticles(x, y, count = GameConstants.JUICE_PARTICLE_COUNT) {
    const particles = [];
    
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = GeometryUtils.randomRange(
        GameConstants.JUICE_PARTICLE_SPEED_MIN,
        GameConstants.JUICE_PARTICLE_SPEED_MAX
      );
      const radius = GeometryUtils.randomRange(
        GameConstants.JUICE_PARTICLE_RADIUS_MIN,
        GameConstants.JUICE_PARTICLE_RADIUS_MAX
      );
      
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      
      particles.push(new Particle(x, y, vx, vy, "juice", {
        radius: radius,
        color: GameConstants.COLORS.JUICE_RED
      }));
    }
    
    return particles;
  }

  /**
   * Creates bomb explosion particles
   * @param {number} x - Center X coordinate
   * @param {number} y - Center Y coordinate
   * @param {number} count - Number of explosion particles to create
   * @returns {Array<Particle>} Array of explosion particles
   */
  static createBombExplosion(x, y, count = GameConstants.BOMB_EXPLOSION_COUNT) {
    const particles = [];
    
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = GeometryUtils.randomRange(
        GameConstants.BOMB_EXPLOSION_SPEED_MIN,
        GameConstants.BOMB_EXPLOSION_SPEED_MAX
      );
      
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      
      particles.push(new Particle(x, y, vx, vy, "explosion", {
        emoji: GameConstants.EXPLOSION_EMOJI,
        jitterRange: GameConstants.EXPLOSION_JITTER_RANGE
      }));
    }
    
    return particles;
  }

  /**
   * Creates a wall splash effect
   * @param {number} x - Splash X coordinate
   * @param {number} y - Splash Y coordinate
   * @returns {Particle} Wall splash particle
   */
  static createWallSplash(x, y) {
    const radiusX = GeometryUtils.randomRange(
      GameConstants.WALL_SPLASH_RADIUS_X_MIN,
      GameConstants.WALL_SPLASH_RADIUS_X_MAX
    );
    const radiusY = GeometryUtils.randomRange(
      GameConstants.WALL_SPLASH_RADIUS_Y_MIN,
      GameConstants.WALL_SPLASH_RADIUS_Y_MAX
    );
    
    return new Particle(x, y, 0, 0, "wallSplash", {
      radiusX: radiusX,
      radiusY: radiusY,
      splashRotation: Math.random() * Math.PI * 2
    });
  }

  /**
   * Updates the particle's position and physics
   * @param {number} deltaTime - Time elapsed since last update
   */
  update(deltaTime) {
    super.update(deltaTime);
    
    // Apply type-specific physics
    if (this.type === "juice") {
      // Juice particles are affected by gravity more subtly
      this.vy += GameConstants.GRAVITY * deltaTime * 0.5;
    } else if (this.type === "wallSplash") {
      // Wall splashes don't move
      this.vx = 0;
      this.vy = 0;
    }
  }

  /**
   * Renders the particle based on its type
   * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
   */
  render(ctx) {
    const alpha = this.getAlpha();
    if (alpha <= 0) return;
    
    ctx.save();
    ctx.globalAlpha = alpha;
    
    switch (this.type) {
      case "juice":
        this.renderJuiceParticle(ctx);
        break;
      case "explosion":
        this.renderExplosionParticle(ctx);
        break;
      case "wallSplash":
        this.renderWallSplash(ctx);
        break;
    }
    
    ctx.restore();
  }

  /**
   * Renders a juice particle as a colored circle
   * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
   */
  renderJuiceParticle(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  /**
   * Renders an explosion particle as a jittery emoji
   * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
   */
  renderExplosionParticle(ctx) {
    if (!this.emoji) return;

    // Apply jitter
    const jitterX = (Math.random() - 0.5) * this.jitterRange;
    const jitterY = (Math.random() - 0.5) * this.jitterRange;

    ctx.translate(this.x + jitterX, this.y + jitterY);
    EmojiCache.draw(ctx, this.emoji, 50, 0, 0);
  }

  /**
   * Renders a wall splash as a gradient ellipse
   * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
   */
  renderWallSplash(ctx) {
    ctx.translate(this.x, this.y);
    ctx.rotate(this.splashRotation);
    
    // Create radial gradient for splash effect
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.radiusX);
    gradient.addColorStop(0, "rgba(255,0,0,0.8)");
    gradient.addColorStop(1, "rgba(255,0,0,0)");
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(0, 0, this.radiusX, this.radiusY, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  /**
   * Checks if the particle should be removed
   * @param {number} canvasWidth - Canvas width
   * @param {number} canvasHeight - Canvas height
   * @returns {boolean} True if particle should be removed
   */
  shouldRemove(canvasWidth, canvasHeight) {
    // Remove if life expired or far off screen (except wall splashes which stay put)
    if (!this.isAlive) return true;
    
    if (this.type === "wallSplash") {
      return false; // Wall splashes only expire based on life
    }
    
    return this.y > canvasHeight + GameConstants.CANVAS_OVERFLOW_THRESHOLD ||
           this.x < -GameConstants.CANVAS_OVERFLOW_THRESHOLD ||
           this.x > canvasWidth + GameConstants.CANVAS_OVERFLOW_THRESHOLD;
  }

  /**
   * Gets the particle's approximate bounding box
   * @returns {Object} Bounding box with left, right, top, bottom properties
   */
  getBounds() {
    const size = Math.max(this.radius, this.radiusX || 0, this.radiusY || 0);
    return {
      left: this.x - size,
      right: this.x + size,
      top: this.y - size,
      bottom: this.y + size
    };
  }
}
