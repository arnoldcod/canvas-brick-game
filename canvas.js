
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Player
const playerWidth = 50;
const playerHeight = 20;
let playerX = (canvas.width - playerWidth) / 2; //It calculates the initial horizontal position of the player object on the canvas. It subtracts the playerWidth from the width of the canvas and then divides the result by 2 to horizontally center the player object.
const playerY = canvas.height - playerHeight - 10; //represents the vertical position of the player object on the canvas. It calculates the position based on the height of the canvas, subtracting the playerHeight to place the player object at the bottom of the canvas, and subtracts an additional 10 pixels to provide a small vertical gap between the player object and the bottom edge of 
const playerSpeed = 15; //represents the speed at which the player object can move horizontally in the game.





// Obstacles
const obstacleWidth = 50; //represents the width of the obstacles in the game.
const obstacleHeight = 20;//represents the height of the obstacles in the game.
let obstacles = []; //will store information about the obstacles in the game.
const obstacleSpeed = 1;  //represents the speed at which the obstacles move downward in the game.
let spawnRate = 80; // represents the rate at which new obstacles will be spawned in the game. A lower value means obstacles will spawn more frequently. The unit for spawnRate is typically frames per second (fps).



// Scoring
let score = 0; // will keep track of the player's score in the game. 
let gameOver = false; // When gameOver is true, it means the game has ended, and typically triggers actions such as stopping the game loop, displaying a game-over message, or showing final statistics. Initially, the game is not over (false).



// Handle player movement
document.addEventListener('keydown', function(event) { //adds an event listener to the entire document (i.e., the webpage) for the 'keydown' event, which is triggered when a key is pressed and held down.
    if (event.code === 'ArrowLeft' && playerX > 0) { //condition checks if the key pressed is the left arrow key (ArrowLeft) and ensures that the player's horizontal position (playerX) is greater than 0. If both conditions are met, it decrements the playerX variable by playerSpeed, which moves the player object to the left on the canvas.
        playerX -= playerSpeed;
    } else if (event.code === 'ArrowRight' && playerX < canvas.width - playerWidth) { //This condition checks if the key pressed is the right arrow key (ArrowRight) and ensures that the player's horizontal position (playerX) is less than the canvas width minus the player's width (playerWidth).
   // If both conditions are met, it increments the playerX variable by playerSpeed, which moves the player object to the right on the canvas.
    
        playerX += playerSpeed;
    }
});



// Main Game loop
function gameLoop() { //function continuously runs to update and render the game elements as long as the gameOver variable is false.

    //rendering
    if (!gameOver) {
        // At the beginning of each iteration, the canvas is cleared using ctx.clearRect() to remove any previous drawings.
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // player is drawn on the canvas using ctx.fillRect() with the specified playerX, playerY, playerWidth, and playerHeight
        ctx.fillStyle = '#3367ff';
        ctx.fillRect(playerX, playerY, playerWidth, playerHeight);


        // Draw obstacles
        for (let i = 0; i < obstacles.length; i++) { //obstacles are drawn similarly using a loop that iterates over the obstacles array. Each obstacle's position and size are determined by its x, y, obstacleWidth, and obstacleHeight.
            const obstacle = obstacles[i];
            ctx.fillStyle = '#ff3300';
            ctx.fillRect(obstacle.x, obstacle.y, obstacleWidth, obstacleHeight);

        
            obstacle.y += obstacleSpeed; // obstacle.y value is incremented by obstacleSpeed to move the obstacles downwards.


        // Check for collision with player.....Within the loop, collision detection between the player and obstacles is performed. If an obstacle collides with the player, the gameOver variable is set to true, indicating the end of the game
            if (obstacle.y + obstacleHeight >= playerY && obstacle.x < playerX + playerWidth && obstacle.x + obstacleWidth > playerX) {
                gameOver = true;
                break;
            }

            // Remove obstacles that go beyond the canvas,...Obstacles that move beyond the bottom edge of the canvas are removed from the obstacles array to prevent memory buildup. Additionally, the player's score is incremented each time an obstacle is removed.
            if (obstacle.y > canvas.height) {
                obstacles.splice(i, 1);
                i--;
                score++;
            }
        }

        // Spawn new obstacles...New obstacles are spawned randomly based on the spawnRate. Each time the loop runs, there's a probability of spawning a new obstacle.
        if (Math.random() < 1 / spawnRate) {
            const obstacleX = Math.random() * (canvas.width - obstacleWidth);
            obstacles.push({ x: obstacleX, y: 0 });
        }

        // Display score....The player's score is displayed on the canvas using ctx.fillText().//If the game is over (gameOver is true), a "Game Over" message along with the final score is displayed at the center of the canvas.
        ctx.fillStyle = '#333';
        ctx.font = '20px Arial';
        ctx.fillText('Score: ' + score, 10, 30);

        requestAnimationFrame(gameLoop); // Finally, requestAnimationFrame() is used to schedule the next iteration of the game loop, ensuring smooth animation and updates.

    } else {
        // Display game-over message
        ctx.fillStyle = '#333';
        ctx.font = '30px Arial';
        ctx.fillText('Game Over', canvas.width / 2 - 100, canvas.height / 2);
        ctx.fillText('Score: ' + score, canvas.width / 2 - 50, canvas.height / 2 + 40);
    }
}

gameLoop();


//Overall, this game loop manages the rendering, collision detection, scoring, and end-game conditions of the game. It continuously updates the canvas to provide an interactive gaming experience.