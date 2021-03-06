//Declare Game Variables
const hole = document.getElementsByClassName("hole");
const moles = document.querySelectorAll('.mole');
let gameOver = false;
let score = 0;
let displayScore = document.getElementById("molesHit");


//Add event listeners DOM load before running game- code to be executed when page has finished loading
document.addEventListener("DOMContentLoaded", function () {

    //runs the playGame function below when user clicks the play button
    let button = document.getElementById("playButton");
    button.addEventListener("click", function () {
        playGame();
    });

    //Declare About Button Variables - Game Instructions Pop Out (Modal) Box
    const infoBox = document.getElementById("infoModalBox");
    const infoButton = document.getElementById("game-instructions");
    const closeSpan = document.getElementsByClassName("close")[0];
    const audioControls = document.getElementById("audio-controls");

    // When the user clicks the About Button, open the info box & set audio back to start
    infoButton.onclick = function () {
        infoBox.style.display = "block";
        audioControls.currentTime = 0;
    };

    // When the user clicks on (x), close the info box and audio
    closeSpan.onclick = function () {
        infoBox.style.display = "none";
        audioControls.pause();
    };

    // When the user clicks anywhere outside of the info box, close it & audio too
    window.onclick = function (event) {
        if (event.target === infoBox) {
            infoBox.style.display = "none";
            audioControls.pause();
        }
    };
});

/**
 * function randomHole to get random DOM element of “holes” &
 * generate random number between the lenght of holes. 
 */
function randomHole(hole) {
    let x = Math.floor(Math.random() * hole.length); //using hole.lenght so can add/remove holes in future without changing code
    let allHoles = hole[x]; // x stands for the random hole number 0-5 generated above
    return (allHoles);
}

/**
 * function randomTimeBetweenPeek to calculate
 * a random amount of time between the moles peeking up.
 */
function randomTimeBetweenPeek(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

/**
 * function peek for getting moles to pop up out of a random hole 
 * for a random amount of time and then disappear back
 * into hole
 */
function peek() {
    let randTime = randomTimeBetweenPeek(500, 2000);
    let randHole = randomHole(hole);
    randHole.classList.add("up"); //take the randHole variable and assign it the class "up" to show moles when peek() is run  
    setTimeout(function () {
        randHole.classList.remove("up"); //to remove the class "up" after the random time generated has passed
        if (gameOver === false) { //when timer is running (while gameOver is false) to keep running peek
            peek();
            document.getElementById("playButton").disabled = true; //to disable play button once game starts to avoid user clicking and setting off peek() multiple times
        }
    }, randTime);
}

/**
 * function onclick of Play Button
 */
function playGame() {
    gameOver = false; //to reset game on start
    displayScore.textContent = 0; //reset scoreboard to 0 on play again
    score = 0; //reset score counter on play again
    document.getElementById("time-up-alert").style.display = "none"; //hide time-up message on game start & play again
    document.getElementById("time-left").style.display = "block"; //show countdown timer on game start & play again
    document.getElementById("scoreboard").style.backgroundColor = "rgba(93, 93, 93)"; //reset scoreboard background colour
    timeLeft(20); //to pass 20 through the timer function below called timeLeft()
    peek();
    peek(); //running twice makes moles pop up in several locations at same time so harder
    setTimeout(function () {
        gameOver = true; //set game over for when time runs out
        document.getElementById("playButton").disabled = false; //to enable play (or play again) button again once game over
    }, 20000); //set gameOver to true here after 20secs, then if statement in function peek() will stop running peek
}

/**
 * function game timer countdown
 */
function timeLeft(seconds) {
    let countDown = setInterval(function () {
        document.getElementById("timer").innerHTML = seconds; //access the timer html text to display the number counting down
        seconds--;
        if (seconds === -1) {
            clearInterval(countDown); //if statement for what to do when timer gets to 0 and game is over
            document.getElementById("time-up-alert").style.display = "block"; 
            document.getElementById("time-left").style.display = "none";
            document.getElementById("playButton-text").innerHTML = "Play Again";
            document.getElementById("scoreboard").style.backgroundColor = "red";
        }
    }, 1000);
}

/**
 * iterate through the array of moles, 
 * add click event to increase score 
 * & change background image on hit
 */
moles.forEach(mole => {
    mole.addEventListener("click", function () {

        score++; //increase the score on every mole click
        displayScore.textContent = score; //add the score text to the score display

        mole.style.backgroundImage = "url('assets/images/mole-whacked-image.png')";

        setTimeout(function () {
            mole.style.backgroundImage = "url('assets/images/mole-image.png')";
        }, 800); //changes mole pic on click for short time to rechange on next pop up
    });
});