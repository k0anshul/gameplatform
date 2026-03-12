/**
 * Geometry Utility Functions
 * Provides mathematical functions for collision detection and geometric calculations
 * Used throughout the game for physics and interaction systems
 */

class GeometryUtils {
  /**
   * Checks if a line segment intersects with a circle
   * Used for detecting swipe collisions with fruits and bombs
   * 
   * @param {number} x1 - X coordinate of line start point
   * @param {number} y1 - Y coordinate of line start point
   * @param {number} x2 - X coordinate of line end point
   * @param {number} y2 - Y coordinate of line end point
   * @param {number} cx - X coordinate of circle center
   * @param {number} cy - Y coordinate of circle center
   * @param {number} radius - Radius of the circle
   * @returns {boolean} True if line intersects circle, false otherwise
   */
  static lineIntersectsCircle(x1, y1, x2, y2, cx, cy, radius) {
    // Calculate line direction vector
    const dx = x2 - x1;
    const dy = y2 - y1;
    
    // Find the closest point on the line to the circle center
    // This uses vector projection to find the parameter t along the line
    let t = ((cx - x1) * dx + (cy - y1) * dy) / (dx * dx + dy * dy);
    
    // Clamp t to the line segment (between 0 and 1)
    t = Math.max(0, Math.min(1, t));
    
    // Calculate the closest point coordinates
    const closestX = x1 + t * dx;
    const closestY = y1 + t * dy;
    
    // Calculate distance from circle center to closest point
    const distance = Math.hypot(closestX - cx, closestY - cy);
    
    // Return true if distance is within circle radius
    return distance <= radius;
  }

  /**
   * Calculates the distance between two points
   * @param {number} x1 - X coordinate of first point
   * @param {number} y1 - Y coordinate of first point
   * @param {number} x2 - X coordinate of second point
   * @param {number} y2 - Y coordinate of second point
   * @returns {number} Distance between the two points
   */
  static distance(x1, y1, x2, y2) {
    return Math.hypot(x2 - x1, y2 - y1);
  }

  /**
   * Generates a random number within a specified range
   * @param {number} min - Minimum value (inclusive)
   * @param {number} max - Maximum value (inclusive)
   * @returns {number} Random number within the specified range
   */
  static randomRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  /**
   * Generates a random integer within a specified range
   * @param {number} min - Minimum value (inclusive)
   * @param {number} max - Maximum value (inclusive)
   * @returns {number} Random integer within the specified range
   */
  static randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Converts degrees to radians
   * @param {number} degrees - Angle in degrees
   * @returns {number} Angle in radians
   */
  static degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  /**
   * Converts radians to degrees
   * @param {number} radians - Angle in radians
   * @returns {number} Angle in degrees
   */
  static radiansToDegrees(radians) {
    return radians * (180 / Math.PI);
  }

  /**
   * Clamps a value between a minimum and maximum
   * @param {number} value - Value to clamp
   * @param {number} min - Minimum allowed value
   * @param {number} max - Maximum allowed value
   * @returns {number} Clamped value
   */
  static clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  /**
   * Linear interpolation between two values
   * @param {number} start - Starting value
   * @param {number} end - Ending value
   * @param {number} t - Interpolation factor (0-1)
   * @returns {number} Interpolated value
   */
  static lerp(start, end, t) {
    return start + (end - start) * t;
  }

  /**
   * Calculates the angle between two points
   * @param {number} x1 - X coordinate of first point
   * @param {number} y1 - Y coordinate of first point
   * @param {number} x2 - X coordinate of second point
   * @param {number} y2 - Y coordinate of second point
   * @returns {number} Angle in radians
   */
  static angleBetweenPoints(x1, y1, x2, y2) {
    return Math.atan2(y2 - y1, x2 - x1);
  }

  /**
   * Normalizes an angle to be between 0 and 2π
   * @param {number} angle - Angle in radians
   * @returns {number} Normalized angle
   */
  static normalizeAngle(angle) {
    while (angle < 0) angle += Math.PI * 2;
    while (angle >= Math.PI * 2) angle -= Math.PI * 2;
    return angle;
  }

  /**
   * Checks if a point is within the canvas bounds
   * @param {number} x - X coordinate
   * @param {number} y - Y coordinate
   * @param {number} canvasWidth - Canvas width
   * @param {number} canvasHeight - Canvas height
   * @returns {boolean} True if point is within bounds
   */
  static isPointInCanvas(x, y, canvasWidth, canvasHeight) {
    return x >= 0 && x <= canvasWidth && y >= 0 && y <= canvasHeight;
  }

  /**
   * Checks if a circle is completely outside the canvas bounds with a threshold
   * @param {number} x - Circle center X coordinate
   * @param {number} y - Circle center Y coordinate
   * @param {number} radius - Circle radius
   * @param {number} canvasWidth - Canvas width
   * @param {number} canvasHeight - Canvas height
   * @param {number} threshold - Additional distance beyond canvas to consider "outside"
   * @returns {boolean} True if circle is outside the canvas bounds plus threshold
   */
  static isCircleOutsideCanvas(x, y, radius, canvasWidth, canvasHeight, threshold = 0) {
    return (
      x + radius < -threshold ||
      x - radius > canvasWidth + threshold ||
      y + radius < -threshold ||
      y - radius > canvasHeight + threshold
    );
  }
}
