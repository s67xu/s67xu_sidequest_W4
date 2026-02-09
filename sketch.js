/*
Week 4 — Example 4: Playable Maze (JSON + Level + Player)
GBDA302
*/

const TS = 32;

let levelsData;
let levels = [];
let li = 0;
let player;

let gameFinished = false;
let finalScore = 0;
let tryAgainBtn = null;
let showTutorial = true;
let canvas;

function preload() {
  levelsData = loadJSON("levels.json");
}

function setup() {
  canvas = createCanvas(100, 100);
  canvas.parent("game-container");

  originalGrids = levelsData.levels.map((grid) => copyGrid(grid));
  levels = originalGrids.map((grid) => new Level(copyGrid(grid), TS));
  player = new Player(TS);
  loadLevel(0);

  noStroke();
  textFont("sans-serif");
  textSize(14);
}

function draw() {
  background(240);

  if (gameFinished) {
    drawEndingScreen();
    return;
  }

  // Base gameplay
  levels[li].update();
  levels[li].draw();

  if (!showTutorial) {
    player.draw();
    player.checkCrush(levels[li]);
  }

  // HUD + score panel
  drawHUD();
  drawScorePanel();

  // 🔥 Tutorial MUST be drawn LAST (on top of everything)
  if (showTutorial) {
    drawTutorialOverlay();
  }
}

function drawHUD() {
  fill(255); // white text
  textSize(12); // smaller font

  if (li === 0) {
    text("Level 1: Reach the goal. Use WASD / Arrow Keys.", 10, 14);
  } else if (li === 1) {
    text(
      "Level 2: Press the red button to unlock the door. Time the walls.",
      10,
      14,
    );
  }
}

function keyPressed() {
  if (showTutorial && key === " ") {
    showTutorial = false;
    return;
  }

  if (gameFinished) return;

  let dr = 0;
  let dc = 0;

  if (keyCode === LEFT_ARROW || key === "a" || key === "A") dc = -1;
  else if (keyCode === RIGHT_ARROW || key === "d" || key === "D") dc = 1;
  else if (keyCode === UP_ARROW || key === "w" || key === "W") dr = -1;
  else if (keyCode === DOWN_ARROW || key === "s" || key === "S") dr = 1;
  else return;

  const moved = player.tryMove(levels[li], dr, dc);

  if (moved && levels[li].isGoal(player.r, player.c)) {
    if (li === levels.length - 1) {
      finishGame();
    } else {
      nextLevel();
    }
  }
}

function loadLevel(idx) {
  li = idx;
  const level = levels[li];

  // Reset score when entering a new level
  player.score = 0;
  showTutorial = true;

  if (level.start) {
    player.setCell(level.start.r, level.start.c);
  } else {
    player.setCell(1, 1);
  }

  resizeCanvas(level.pixelWidth() + 200, level.pixelHeight());
}

function nextLevel() {
  const next = (li + 1) % levels.length;
  loadLevel(next);
}

function copyGrid(grid) {
  return grid.map((row) => row.slice());
}

function restartLevel() {
  levels[li].reset(originalGrids[li]);
  player.setCell(levels[li].start.r, levels[li].start.c);
}

function drawScorePanel() {
  const panelX = levels[li].pixelWidth();
  const panelW = 200;

  // Panel background
  fill(230);
  rect(panelX, 0, panelW, height);

  // Centered score text
  fill(0);
  textAlign(CENTER, CENTER);

  textSize(16);
  text("SCORE", panelX + panelW / 2, height / 2 - 30);

  textSize(36);
  text(player.score, panelX + panelW / 2, height / 2 + 10);

  // Reset alignment for other text
  textAlign(LEFT, BASELINE);
}

function finishGame() {
  gameFinished = true;
  finalScore = player.score;

  tryAgainBtn = createButton("Try Again");
  tryAgainBtn.parent("game-container");

  tryAgainBtn.position(0, 0);
  tryAgainBtn.style("position", "absolute");
  tryAgainBtn.style("left", "50%");
  tryAgainBtn.style("top", "73%");
  tryAgainBtn.style("transform", "translateX(-50%)");

  tryAgainBtn.size(120, 40);

  tryAgainBtn.style("background", "#2c7be5");
  tryAgainBtn.style("color", "white");
  tryAgainBtn.style("border", "none");
  tryAgainBtn.style("border-radius", "6px");
  tryAgainBtn.style("font-size", "16px");
  tryAgainBtn.style("cursor", "pointer");

  tryAgainBtn.mouseOver(() => {
    tryAgainBtn.style("background", "#1a5fd0");
  });

  tryAgainBtn.mouseOut(() => {
    tryAgainBtn.style("background", "#2c7be5");
  });

  tryAgainBtn.mousePressed(restartGame);
}

function drawEndingScreen() {
  background(30, 50, 60);

  fill(255);
  textAlign(CENTER, CENTER);

  textSize(36);
  text("🎉 Congratulations! 🎉", width / 2, height / 2 - 80);

  textSize(18);
  text("You have completed the game.", width / 2, height / 2 - 30);

  textSize(22);
  text(`Final Score: ${finalScore}`, width / 2, height / 2 + 20);

  textSize(24);
  text(`Rank: ${getRank(finalScore)}`, width / 2, height / 2 + 70);
}

function getRank(score) {
  if (score >= 15) return "S — Master Navigator";
  if (score >= 10) return "A — Skilled Explorer";
  if (score >= 6) return "B — Maze Solver";
  return "C — Beginner";
}

function restartGame() {
  // Remove button
  if (tryAgainBtn) {
    tryAgainBtn.remove();
    tryAgainBtn = null;
  }

  // Reset game state
  gameFinished = false;
  li = 0;

  // Reset score
  player.score = 0;

  // Reset all levels
  for (let i = 0; i < levels.length; i++) {
    levels[i].reset(originalGrids[i]);
  }

  // Load first level
  loadLevel(0);
}

function drawTutorialOverlay() {
  // Dark background overlay
  fill(0, 180);
  rect(0, 0, width, height);

  // Tutorial card
  const boxW = 420;
  const boxH = 240;
  const x = width / 2 - boxW / 2;
  const y = height / 2 - boxH / 2;

  fill(245);
  rect(x, y, boxW, boxH, 12);

  // ---- Title ----
  fill(0);
  textAlign(CENTER, TOP);
  textSize(20);
  text(getTutorialTitle(), width / 2, y + 20);

  // ---- Body text (LEFT aligned, centered block) ----
  textAlign(LEFT, TOP);
  textSize(14);

  const padding = 30;
  text(getTutorialText(), x + padding, y + 70, boxW - padding * 2);

  // ---- Footer hint ----
  textAlign(CENTER, TOP);
  textSize(12);
  fill(80);
  text("Press SPACE to start", width / 2, y + boxH - 30);

  // Reset alignment
  textAlign(LEFT, BASELINE);
}

function getTutorialTitle() {
  if (li === 0) return "Welcome to the Maze";
  if (li === 1) return "New Mechanics Introduced";
  return "";
}

function getTutorialText() {
  if (li === 0) {
    return (
      "Use WASD or Arrow Keys to move the ball.\n\n" +
      "Reach the goal tile to finish the level.\n\n" +
      "Collect green dots to gain points."
    );
  }

  if (li === 1) {
    return (
      "Yellow walls move in and out. Time them carefully.\n\n" +
      "Touching a wall when it reappears will reset the level.\n\n" +
      "Collect the red key to unlock the red door."
    );
  }

  return "";
}
