/**
 * Audio Management System
 * Handles all game audio including sound effects and background music
 * Provides organized sound groups and playback functionality
 */

class AudioManager {
  constructor() {
    // Sound file collections organized by type
    this.soundGroups = {
      fruitSpawn: [
        "Sound/Throw-fruit.wav",
        "Sound/Impact-Apple.wav",
        "Sound/Impact-Banana.wav",
        "Sound/Impact-Orange.wav",
        "Sound/Impact-Pineapple.wav",
        "Sound/Impact-Strawberry.wav",
        "Sound/Impact-Watermelon.wav",
        "Sound/dragonfruit.wav"
      ],
      
      bombSpawn: [
        "Sound/player-bomb-launch.wav",
        "Sound/menu-bomb.wav"
      ],
      
      fruitCut: [
        "Sound/Clean-Slice-1.wav",
        "Sound/Clean-Slice-2.wav",
        "Sound/Clean-Slice-3.wav",
        "Sound/blade-cherry-blossom-1-1.wav",
        "Sound/blade-cherry-blossom-1-2.wav",
        "Sound/pome-slice-1.wav",
        "Sound/pome-slice-2.wav",
        "Sound/pome-slice-3.wav"
      ],
      
      bombCut: [
        "Sound/Bomb-explode.wav",
        "Sound/Throw-bomb.wav",
        "Sound/Bomb-Fuse.wav"
      ],
      
      swipe: [
        "Sound/bamboo-swipe-1.wav",
        "Sound/bamboo-swipe-2.wav",
        "Sound/bamboo-swipe-3.wav",
        "Sound/bamboo-swipe-4.wav",
        "Sound/Sword-swipe-1.wav",
        "Sound/Sword-swipe-2.wav",
        "Sound/Sword-swipe-3.wav",
        "Sound/Sword-swipe-4.wav",
        "Sound/Sword-swipe-5.wav",
        "Sound/Sword-swipe-6.wav",
        "Sound/Sword-swipe-7.wav"
      ],
      
      combo: [
        "Sound/combo-1.wav",
        "Sound/combo-2.wav",
        "Sound/combo-3.wav",
        "Sound/combo-4.wav",
        "Sound/combo-5.wav",
        "Sound/Combo-6.wav",
        "Sound/Combo-7.wav",
        "Sound/Combo-8.wav",
        "Sound/combo-blitz-1.wav",
        "Sound/combo-blitz-2.wav",
        "Sound/combo-blitz-3.wav",
        "Sound/combo-blitz-4.wav",
        "Sound/combo-blitz-5.wav",
        "Sound/combo-blitz-6.wav",
        "Sound/Combo.wav",
        "Sound/angel-combo-1.wav",
        "Sound/angel-combo-2.wav",
        "Sound/angel-combo-3.wav",
        "Sound/angel-combo-4.wav",
        "Sound/angel-combo-5.wav",
        "Sound/Combo-Blitz-Backing.wav",
        "Sound/Combo-Blitz-Backing-Light.wav",
        "Sound/Combo-Blitz-Backing-End.wav"
      ]
    };

    // Special audio files
    this.specialSounds = {
      gameStart: "Sound/Game-start.wav",
      gameOver: "Sound/Game-over.wav",
      uiHover: "Sound/bamboo-swipe-2.wav",
      uiClick: "Sound/Clean-Slice-1.wav"
    };

    // Menu music 
    this.menuMusicFile = "Sound/menu-music.mp3";
    this.menuMusic = null;
    this._menuReady = false;
    try {
      this.menuMusic = this.createAudioElement(this.menuMusicFile);
      this.menuMusic.loop = true;
      this.menuMusic.volume = 0.35;
      this.menuMusic.addEventListener('canplaythrough', () => { this._menuReady = true; });
      this.menuMusic.addEventListener('error', () => { this._menuReady = false; });
    } catch(_) {}

    // Remove in-game looping music 
    this.bgMusic = null;

    // Initialize SFX volume
    this.sfxVolume = 1.0;

    // Simple audio pool per filename to prevent creating many Audio objects
    this._audioPools = new Map(); // filename -> { list: Audio[], index: number }
    this._maxChannelsPerSound = 8; // allow overlapping plays without GC churn

    // Simple preloading of top sounds to reduce first-play lag
    this._preloaded = false;
    this.preload();

    this._groupIndices = new Map(); // for round-robin selection per group
  }

  /**
   * Creates a new Audio element with error handling
   * @param {string} filename - Path to the audio file
   * @returns {Audio} Audio element instance
   */
  createAudioElement(filename) {
    const audio = new Audio(filename);
    audio.preload = "auto";
    audio.addEventListener('error', (e) => {
      console.warn(`Audio file could not be loaded: ${filename}`);
    });
    return audio;
  }

  /**
   * Gets an audio instance from pool for a given filename
   * Creates pool lazily and reuses audio elements to minimize allocations
   */
  _getPooledAudio(filename) {
    let pool = this._audioPools.get(filename);
    if (!pool) {
      // Lazy-create a small pool
      const list = Array.from({ length: 3 }, () => this.createAudioElement(filename));
      pool = { list, index: 0 };
      this._audioPools.set(filename, pool);
    }

    // Try to find a free channel (paused or ended)
    for (let i = 0; i < pool.list.length; i++) {
      const a = pool.list[i];
      if (a.ended || a.paused) return a;
    }

    // If all busy and under cap, add one more channel
    if (pool.list.length < this._maxChannelsPerSound) {
      const a = this.createAudioElement(filename);
      pool.list.push(a);
      return a;
    }

    // Fallback: rotate through pool and interrupt the oldest
    const a = pool.list[pool.index % pool.list.length];
    pool.index = (pool.index + 1) % pool.list.length;
    return a;
  }

  /**
   * Plays a specific sound file
   * @param {string} filename - Path to the audio file to play
   */
  playSoundFile(filename) {
    try {
      const audio = this._getPooledAudio(filename);
      // Reset and play
      audio.currentTime = 0;
      // Slightly boost combo volume for clarity
      const isCombo = filename.toLowerCase().includes('combo');
      audio.volume = Math.max(0, Math.min(1, this.sfxVolume * (isCombo ? 1.0 : 1.0)));
      audio.play().catch(e => {
        console.warn(`Could not play audio: ${filename}`, e);
      });
    } catch (error) {
      console.warn(`Error playing sound: ${filename}`, error);
    }
  }

  /**
   * Plays a random sound from a specified sound group
   * @param {string} groupName - Name of the sound group to play from
   */
  playRandomSound(groupName) {
    const soundGroup = this.soundGroups[groupName];
    if (!soundGroup || soundGroup.length === 0) {
      console.warn(`Sound group not found: ${groupName}`);
      return;
    }
    
    const randomIndex = Math.floor(Math.random() * soundGroup.length);
    const selectedSound = soundGroup[randomIndex];
    this.playSoundFile(selectedSound);
  }

  /**
   * Plays fruit spawn sound
   */
  playFruitSpawnSound() {
    this.playRandomSound('fruitSpawn');
  }

  /**
   * Plays bomb spawn sound
   */
  playBombSpawnSound() {
    this.playRandomSound('bombSpawn');
  }

  /**
   * Plays fruit cutting sound
   */
  playFruitCutSound() {
    this.playRandomSound('fruitCut');
  }

  /**
   * Plays bomb explosion sound
   */
  playBombCutSound() {
    this.playRandomSound('bombCut');
  }

  /**
   * Plays swipe sound with cooldown to prevent audio spam
   */
  playSwipeSound() {
    const now = Date.now();
    if (now - gameState.lastSwipeSoundTime > GameConstants.SWIPE_SOUND_COOLDOWN) {
      this.playRandomSound('swipe');
      gameState.lastSwipeSoundTime = now;
    }
  }

  /**
   * Plays combo sound
   */
  playComboSound() {
    const list = this.soundGroups && this.soundGroups.combo;
    if (!list || !list.length) return;
    let i = this._groupIndices.get('combo') || 0;
    const filename = list[i % list.length];
    this._groupIndices.set('combo', (i + 1) % list.length);
    this.playSoundFile(filename);
  }

  /**
   * Plays game start sound
   */
  playGameStartSound() {
    this.playSoundFile(this.specialSounds.gameStart);
  }

  /**
   * Plays game over sound
   */
  playGameOverSound() {
    this.playSoundFile(this.specialSounds.gameOver);
  }

  /** Smooth fade utility */
  _fadeAudio(audio, target, durationMs = 600) {
    if (!audio) return;
    const start = audio.volume;
    const delta = target - start;
    const steps = Math.max(1, Math.floor(durationMs / 30));
    let i = 0;
    const tick = () => {
      i++;
      const t = i/steps;
      audio.volume = Math.max(0, Math.min(1, start + delta * t));
      if (i < steps) setTimeout(tick, 30);
    };
    tick();
  }

  playMenuMusic() {
    if (!this.menuMusic) return;
    const doPlay = () => {
      try {
        this.menuMusic.currentTime = 0;
        this.menuMusic.play().catch(() => {});
      } catch(_) {}
      this._fadeAudio(this.menuMusic, 0.35, 600);
    };
    if (this._menuReady) {
      doPlay();
    } else {
      this.menuMusic.addEventListener('canplaythrough', () => {
        this._menuReady = true;
        doPlay();
      }, { once: true });
      try { this.menuMusic.load(); } catch(_) {}
    }
  }
  stopMenuMusic(fade = true) {
    if (!this.menuMusic) return;
    if (fade) {
      this._fadeAudio(this.menuMusic, 0, 400);
      setTimeout(() => { this.menuMusic.pause(); }, 420);
    } else { this.menuMusic.pause(); }
  }

  // Background music methods kept as no-ops unless implemented later
  startBackgroundMusic() { /* no-op */ }
  stopBackgroundMusic() { /* no-op */ }

  /**
   * Sets background music volume
   * @param {number} volume - Volume level (0.0 to 1.0)
   */
  setBackgroundMusicVolume(volume) {
    this.bgMusic.volume = Math.max(0, Math.min(1, volume));
  }

  /**
   * Sets the volume for music.
   * @param {number} volume - The volume level (0-1).
   */
  setMusicVolume(volume) {
    this.bgMusic.volume = volume;
  }

  /**
   * Sets the volume for sound effects.
   * @param {number} volume - The volume level (0-1).
   */
  setSfxVolume(volume) {
    this.sfxVolume = volume;
  }

  /** UI hover/click helpers */
  playUiHover() { this.playSoundFile(this.specialSounds.uiHover); }
  playUiClick() { this.playSoundFile(this.specialSounds.uiClick); }

  /** Preload a subset of sounds for better first-hit latency */
  preload() {
    if (this._preloaded) return;
    this._preloaded = true;
    const groups = ['fruitCut', 'swipe', 'bombCut', 'fruitSpawn', 'bombSpawn', 'combo'];
    for (const g of groups) {
      const list = this.soundGroups[g] || [];
      for (let i = 0; i < Math.min(3, list.length); i++) {
        this._getPooledAudio(list[i]);
      }
    }
    // Prime UI and try loading menu track
    this._getPooledAudio(this.specialSounds.gameStart);
    this._getPooledAudio(this.specialSounds.gameOver);
    this._getPooledAudio(this.specialSounds.uiHover);
    this._getPooledAudio(this.specialSounds.uiClick);
    try { this.menuMusic?.load(); } catch(_) {}
  }
}

// Create global audio manager instance
const audioManager = new AudioManager();
