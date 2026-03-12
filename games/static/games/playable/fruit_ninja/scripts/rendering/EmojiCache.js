/**
 * EmojiCache - prerenders emoji to offscreen canvases per (emoji, size)
 * to make draw calls very cheap (drawImage instead of fillText each frame).
 * Global singleton class.
 */
class EmojiCache {
  static _map = new Map(); // key: `${emoji}|${size}|${fontFamily}` -> offscreen canvas

  /**
   * Returns an offscreen canvas with the emoji rendered centered.
   * @param {string} emoji
   * @param {number} size - pixel size (font size, roughly bounding box)
   * @param {string} fontFamily - optional font family
   * @returns {HTMLCanvasElement}
   */
  static getCanvas(emoji, size, fontFamily = '"Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", "Segoe UI Symbol", "Android Emoji", "EmojiOne Color", "Twemoji", sans-serif') {
    const key = `${emoji}|${Math.round(size)}|${fontFamily}`;
    let canvas = this._map.get(key);
    if (canvas) return canvas;

    // Create offscreen canvas
    canvas = document.createElement('canvas');
    // Slightly larger to avoid clipping
    const pad = Math.ceil(size * 0.2);
    const w = Math.ceil(size) + pad * 2;
    const h = Math.ceil(size) + pad * 2;
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext('2d');
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `${size}px ${fontFamily}`;
    // FillStyle doesn't affect color emoji, but set for monochrome fallbacks
    ctx.fillStyle = '#000';
    ctx.fillText(emoji, w / 2, h / 2);

    this._map.set(key, canvas);
    return canvas;
  }

  /**
   * Draws a cached emoji centered at (x, y) using drawImage
   * @param {CanvasRenderingContext2D} ctx
   * @param {string} emoji
   * @param {number} size
   * @param {number} x
   * @param {number} y
   */
  static draw(ctx, emoji, size, x, y) {
    const canvas = this.getCanvas(emoji, size);
    const w = canvas.width;
    const h = canvas.height;
    ctx.drawImage(canvas, x - w / 2, y - h / 2);
  }
}
