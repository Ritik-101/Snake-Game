// Game Constants and Variables
let snakeVelocity = {x:0, y:0};
const musicSound = new Audio('music/music.mp3')
const moveSound = new Audio('music/move.mp3');
const foodSound = new Audio('music/food.mp3')
const gameOverSound = new Audio('music/gameover.mp3')
let speed = 9;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 11, y:16}
]
food = {x: 7, y:20}

// Game functions
function main(ctime) {
    window.requestAnimationFrame(main)
    // console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime
    gameEngine()
}


function isCollide(snake) {
    // if the snake collides with itself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    // if the snake collides with the wall
    if(snake[0].x <= 0 || snake[0].x >= 25 || snake[0].y <= 0 || snake[0].y >= 25){
        return true;
    }
}

function gameEngine(){
    // Part 1: Updating the snake array & food
    if(isCollide(snakeArr)) {
        musicSound.pause();
        snakeVelocity = {x: 0, y:0};
        gameOverSound.play();
        alert("Game Over. Press any key to play again!!");
        snakeArr = [{x: 11, y:16}];
        musicSound.play();
        score = 0;
    }

    // If snake eats the food, increment the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
            hiscoreBoard.innerHTML = "Hi-Score: " + hiscoreval;
        }
        scoreBoard.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + snakeVelocity.x, y: snakeArr[0].y + snakeVelocity.y})
        let a = 5;
        let b = 20;
        food = {x: Math.round(a + (b-a)*Math.random()), y:Math.round(a+(b-a)*Math.random())}
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += snakeVelocity.x;
    snakeArr[0].y += snakeVelocity.y;


    // Part 2: Display the snake and food
    // Displaying snake
    board.innerHTML = "";
    snakeArr.forEach((element, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = element.y;
        snakeElement.style.gridColumnStart = element.x;
        if (index == 0) {
            snakeElement.classList.add('head')
        } else {
            snakeElement.classList.add('body')
        }
        board.appendChild(snakeElement);
    });

    // Displaying food
    foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food')
        board.appendChild(foodElement);
}


// Main logic
musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore == null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
} 
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBoard.innerHTML = "Hi-Score: " + hiscore;
}
window.requestAnimationFrame(main)
window.addEventListener('keydown', e =>{
    snakeVelocity = {x:0, y:1} // Game Start
    moveSound.play()
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            snakeVelocity.x = 0;
            snakeVelocity.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown")
            snakeVelocity.x = 0;
            snakeVelocity.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft")
            snakeVelocity.x = -1;
            snakeVelocity.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight")
            snakeVelocity.x = 1;
            snakeVelocity.y = 0;
            break;
    
        default:
            break;
    }
})