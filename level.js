/*
Level.js

Tile legend:
0 = floor
1 = wall
2 = start
3 = goal
6 = moving wall (yellow, timed)
7 = red locked wall (requires key)
8 = key
*/

class Level {
  constructor(grid, tileSize) {
    this.grid = grid;
    this.ts = tileSize;

    this.start = this.findStart();
    if (this.start) {
      this.grid[this.start.r][this.start.c] = 0;
    }

    this.hasKey = false;
    this.unlockStartedAt = null;

    this.dots = [];
    this.generateDots(10); // number of dots per level
  }

  reset(originalGrid) {
  // Restore the grid from the original JSON data
  this.grid = originalGrid.map(row => row.slice());

  // Re-find start tile
  this.start = this.findStart();
  if (this.start) {
    this.grid[this.start.r][this.start.c] = 0;
  }

  // Reset level state
  this.hasKey = false;
  this.unlockStartedAt = null;
  this.generateDots(10);
}

generateDots(count) {
  this.dots = [];

  while (this.dots.length < count) {
    const r = floor(random(this.rows()));
    const c = floor(random(this.cols()));

    // Only place dots on floor tiles
    if (this.grid[r][c] === 0) {
      this.dots.push({ r, c });
    }
  }
}

checkDotPickup(r, c) {
  for (let i = this.dots.length - 1; i >= 0; i--) {
    if (this.dots[i].r === r && this.dots[i].c === c) {
      this.dots.splice(i, 1);
      return true; // dot collected
    }
  }
  return false;
}

  update() {
    // Reserved for future time-based logic
  }

  rows() {
    return this.grid.length;
  }

  // ---------- Size helpers ----------
  rows() {
    return this.grid.length;
  }

  cols() {
    return this.grid[0].length;
  }

  pixelWidth() {
    return this.cols() * this.ts;
  }

  pixelHeight() {
    return this.rows() * this.ts;
  }

  // ---------- Grid helpers ----------
  inBounds(r, c) {
    return r >= 0 && c >= 0 && r < this.rows() && c < this.cols();
  }

  tileAt(r, c) {
    return this.grid[r][c];
  }

  // ---------- Tile meaning ----------
  isGoal(r, c) {
    return this.tileAt(r, c) === 3;
  }

  isWall(r, c) {
    const v = this.tileAt(r, c);

    // Solid wall
    if (v === 1) return true;

    // Moving wall (on half the time)
    if (v === 6) {
      return frameCount % 60 < 30;
    }

    // Red locked wall
    if (v === 7) {
  if (!this.hasKey) return true;

  // Allow pass only after fade finishes
  if (millis() - this.unlockStartedAt < 1000) return true;

  return false;
}

    return false;
  }

  isMovingWallActive() {
    return frameCount % 60 < 30;
  }

  // ---------- Interactions ----------
  checkPickup(r, c) {
    if (this.tileAt(r, c) === 8) {
      this.hasKey = true;
      this.unlockStartedAt = millis(); // start fade animation
      this.grid[r][c] = 0; // remove key tile
    }
  }

  // ---------- Start tile ----------
  findStart() {
    for (let r = 0; r < this.rows(); r++) {
      for (let c = 0; c < this.cols(); c++) {
        if (this.grid[r][c] === 2) {
          return { r, c };
        }
      }
    }
    return null;
  }

  // ---------- Drawing ----------
  draw() {
    for (let r = 0; r < this.rows(); r++) {
      for (let c = 0; c < this.cols(); c++) {
        const v = this.grid[r][c];
        const x = c * this.ts;
        const y = r * this.ts;

        // ---- Base tile ----
        if (v === 1) {
          fill(30, 50, 60); // solid wall
          rect(x, y, this.ts, this.ts);
        } else if (v === 6) {
          // moving wall (yellow, timed)
          if (frameCount % 60 < 30) fill(255, 200, 0);
          else fill(232);
          rect(x, y, this.ts, this.ts);
        } else if (v === 7) {
          let alpha = 255;

          // Fade out after key is collected
          if (this.unlockStartedAt !== null) {
            const t = (millis() - this.unlockStartedAt) / 1000;
            alpha = lerp(255, 0, constrain(t, 0, 1));
          }

          // Red wall background
          fill(200, 50, 50, alpha);
          rect(x, y, this.ts, this.ts);

          // Lock hole (black triangle) — only BEFORE unlock
          if (!this.hasKey) {
            fill(0);
            triangle(
              x + this.ts * 0.25,
            y + this.ts * 0.75,
            x + this.ts * 0.75,
            y + this.ts * 0.75,
            x + this.ts * 0.5,
            y + this.ts * 0.35,
            );
          }
        } else if (v === 8) {
          // key = same size red triangle
          fill(232);
          rect(x, y, this.ts, this.ts);

          fill(200, 50, 50);
          triangle(
            x + this.ts * 0.25,
            y + this.ts * 0.75,
            x + this.ts * 0.75,
            y + this.ts * 0.75,
            x + this.ts * 0.5,
            y + this.ts * 0.35,
          );
        } else {
          fill(232); // floor
          rect(x, y, this.ts, this.ts);
        }

        // ---- Goal overlay ----
        if (v === 3) {
          fill(255, 200, 120, 200);
          rect(x + 4, y + 4, this.ts - 8, this.ts - 8, 6);
        }
      }
    }
    fill(0, 200, 120);
for (const dot of this.dots) {
  circle(
    dot.c * this.ts + this.ts / 2,
    dot.r * this.ts + this.ts / 2,
    this.ts * 0.2
  );
}
  }
}
