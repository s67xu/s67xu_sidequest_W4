## Project Title

GBDA302 Week 4 Side Quest: Between the Walls
---

## Authors
Sofia Xu | s67xu | 21082052

Original starter code by Dr. Karen Cochrane and David Han.
Game design, iteration, mechanics expansion, UI/UX decisions, and GenAI-assisted redesign by Sofia Xu

---

## Description

This game is a top-down maze navigation game where the player controls a ball moving through a series of levels. The main goal is to reach the goal tile while avoiding obstacles and interacting with different mechanics introduced across levels.

Players move using WASD or arrow keys and must carefully navigate corridors, time moving walls, and collect items. Green dots scattered throughout the maze reward points, encouraging exploration. In later levels, additional mechanics such as moving yellow walls, keys, and locked doors are introduced, increasing difficulty and requiring more strategic movement and timing.

The game emphasizes spatial awareness, timing, and learning through short tutorial screens shown at the beginning of each level. A final ending screen evaluates player performance based on the total score earned.

---

## Learning Goals

Learning Goals:

- Loads JSON levels (preload)
- Builds Level objects
- Creates/positions the Player
- Handles input + level switching

It is intentionally light on "details" because those are moved into:

- Level.js (grid + drawing + tile meaning)
- Player.js (position + movement rules)

---

## Setup and Interaction Instructions
### How to Play

#### Movement: <br>
Use WASD or Arrow Keys to move the ball one tile at a time.

#### Objective: <br>
Reach the goal tile to complete each level.

#### Scoring: <br>
Collect green dots scattered throughout the maze to earn points.

#### Hazards: <br>
Avoid moving walls. Touching a wall when it reappears will reset the level.

#### Keys & Doors: <br>
In later levels, collect the red key to unlock the red door.

#### Tutorial Screens: <br>
Each level begins with a tutorial overlay explaining new mechanics.
Press SPACE to start the level.

#### Game End: <br>
After completing all levels, an ending screen displays the final score and performance rank.
Click Try Again to restart the game from the beginning.

---
## Iteration Notes
### a. Post-Playtest (Self-Playtesting)

#### 1. Visual and UI clarity improvements <br>
During playtesting, I noticed readability issues related to typography size, color contrast, and HUD layout. Text elements such as instructions and score display were adjusted to improve contrast and hierarchy, ensuring that important information is clearly visible without distracting from gameplay.

#### 2. Expanded use of moving walls and scoring to encourage exploration <br>
Initially, the game included only one yellow moving wall, which did not significantly increase challenge or encourage exploration. To address this, additional yellow walls were added throughout the maze to increase difficulty and require better timing.
To further motivate exploration instead of simply rushing to the goal, green collectible dots were introduced. Collecting these dots increases the player’s score, and final performance is ranked based on the total number collected, reinforcing replayability and risk–reward decision making.

#### 3. Improved visual connection and feedback for the key–door mechanic <br>
Early versions of the game used a red square to represent a locked wall and a separate green triangle to represent a key. However, after playtesting, I realized there was no clear visual or interactive connection between the two, which could confuse players.
To improve clarity, a matching triangle shape was added to the red wall to visually suggest a keyhole. However, this alone did not provide enough feedback to confirm that the player had successfully collected the key.
To resolve this, an additional interaction was implemented: once the key is collected, the red wall slowly fades and disappears. This creates an immediate and visible response to the player’s action, reinforcing the relationship between the key and the door while clearly communicating that the path has been unlocked.

### b. Post-Showcase: Planned Improvements

#### 1. Increase level complexity and mechanic combinations
Future iterations would include more levels that combine existing mechanics (moving walls, keys, collectibles) in more complex ways, creating layered challenges and a smoother difficulty curve.

#### 2. Add sound and animation polish
Adding sound effects and subtle animations for collecting items, unlocking doors, and failing states would improve feedback and make the game feel more responsive and immersive.

---

## Assets

N/A

---

## GenAI

The original code structure was provided by Dr. Karen Cochrane and David Han. During the development of this project, I later redesigned and extended the codebase using GenAI as a support tool. GenAI was used to help restructure logic, debug gameplay issues, and iteratively refine mechanics, interactions, and visual feedback. It was also used to assist with generating and revising comments for clarity and maintainability.

All final design decisions, gameplay mechanics, and implementations were reviewed, adapted, and integrated by me.

---
