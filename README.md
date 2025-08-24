# Zombie Shooter Game
## Overview

Zombie Shooter Game is a 2D survival shooter game developed using JavaScript and HTML Canvas. The goal of the game is to shoot zombies while trying to achieve the highest possible score. The game increases in difficulty as zombies spawn more frequently and move faster. The player loses health if zombies reach the left side of the screen, and the game ends when all health points are lost.

## Demo
[Play now!](https://pawo0.github.io/zombie-shooter-game/)

## Preview
![in_game](https://github.com/user-attachments/assets/b03ef323-81f4-4a12-9cb4-7f628ab087d3)
![menu](https://github.com/user-attachments/assets/89f8da8c-bed3-4f6b-890c-a0c4532df330)


## Key Features

- Real-Time Rendering using HTML Canvas for smooth game animations.
- Interactive Sound Effects that enhance the gaming experience, including background music, zombie noises, and shooting effects.
- Dynamic Scaling to adapt the canvas to any screen size, maintaining aspect ratios.
- Player Stats Tracking, including score and best score history.
- Game Over Interface with options to restart the game.
- Difficulty Progression, with zombies spawning faster and moving quicker as the player progresses.

## Technologies Used

JavaScript (ES6+) for game logic and DOM manipulation.
HTML Canvas for rendering animations and game visuals.
Object-Oriented Design Patterns for maintaining a clean and modular code structure.
Responsive Design to handle different screen sizes.
Audio Handling using the Web Audio API for in-game sounds and background music.

## Installation & Setup

Clone the repository:
```bash
git clone https://github.com/Pawo0/Zombie-Game.git
cd Zombie-Game
```
Open index.html in your preferred browser to start the game.

## Gameplay Instructions

- Objective: Shoot zombies before they reach the left side of the screen.
- Controls:
-- Use the mouse to aim.
-- Left-click to shoot.
- Scoring:
-- + 20 points for each zombie hit.
-- - 5 points for missed shots.
- Health: The player has three health points. Each zombie that reaches the left side of the screen decreases health by one.
- Game Over: The game ends when health reaches zero. The player can restart the game or end it.

## Code Structure

- script.js: The main game loop and event listeners.
- ZombieSpawner.js: Manages zombie spawning intervals and difficulty progression.
- Zombie.js: Handles individual zombie properties and behavior.
- SoundManage.js: Manages game sounds, including background music and sound effects.
- ScoreBoard.js: Manages the player's score and best score.
- HpStatus.js: Manages player health and its visual representation.
- GameOver.js: Manages the game-over screen and player interaction for restarting or ending the game.
- Cursor.js: Custom crosshair cursor implementation.


