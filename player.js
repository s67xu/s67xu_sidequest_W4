/*
Player.js
*/

class Player {
  constructor(tileSize) {
    this.ts = tileSize;
    this.r = 0;
    this.c = 0;

    this.movedAt = 0;
    this.moveDelay = 90;
    
    this.hurtUntil = 0;
    this.score = 0;
  }

  setCell(r, c) {
    this.r = r;
    this.c = c;
  }

  pixelX() {
    return this.c * this.ts + this.ts / 2;
  }

  pixelY() {
    return this.r * this.ts + this.ts / 2;
  }

draw() {
  // Flash red when hurt
  if (millis() < this.hurtUntil) {
    fill(220, 50, 50);
  } else {
    fill(20, 120, 255);
  }

  circle(this.pixelX(), this.pixelY(), this.ts * 0.6);
}

  tryMove(level, dr, dc) {
  const now = millis();

  // Prevent movement while hurt
  if (now < this.hurtUntil) return false;

  if (now - this.movedAt < this.moveDelay) return false;

  const nr = this.r + dr;
  const nc = this.c + dc;

  if (!level.inBounds(nr, nc)) return false;
  if (level.isWall(nr, nc)) return false;

  this.r = nr;
  this.c = nc;
  this.movedAt = now;

  level.checkPickup(this.r, this.c);

  if (level.checkDotPickup(this.r, this.c)) {
  this.score += 1;
}
  return true;
}

checkCrush(level) {
  const tile = level.tileAt(this.r, this.c);

  if (tile === 6 && level.isMovingWallActive()) {
    this.hurtUntil = millis() + 1000;

    // Restart entire level after short delay
    setTimeout(() => {
      restartLevel();
      player.score = 0;
    }, 1000);
  }
}
}
