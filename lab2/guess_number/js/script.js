//Event Listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);

//Global variables
let randomNumber;
let attempts = 0;
let wins = 0;
let losses = 0;

initializeGame();

function initializeGame() {
    attempts = 0;
   randomNumber = Math.floor(Math.random() * 99) + 1;
   console.log("randomNumber: " + randomNumber);

   //hiding the Reset button
   document.querySelector("#resetBtn").style.display = "none";

   //showing the Guess button
   document.querySelector("#guessBtn").style.display = "inline";
  
   let playerGuess = document.querySelector("#playerGuess");
   playerGuess.focus(); //adding focus to textbox
   playerGuess.value = ""; //clearing the textbox

   let feedback = document.querySelector("#feedback");
   feedback.textContent = "";

   //clearing previous guesses
   document.querySelector("#guesses").textContent = "";
   document.querySelector("#attemptsLeft").textContent = "Attempts remaining: " + (7 - attempts);
}

function checkGuess() {
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";
    let guess = document.querySelector("#playerGuess").value;
    console.log("Player guess: " + guess);
    if ( guess <  1 || guess > 99) {
        feedback.textContent = "enter a number between 1 and 99";
        feedback.style.color = "red";
        return;
    }

    attempts++;
    console.log("Attempts:" + attempts);
    feedback.style.color = "orange";
    if (guess == randomNumber) {
        feedback.textContent = "You Won! The number was: " + randomNumber;
        feedback.style.color = "darkgreen";
        document.querySelector("#attemptsLeft").textContent = "Attempts remaining: " + (7 - attempts);
        wins++;
        displayScore();
        gameOver();
    } else {
        document.querySelector("#guesses").textContent += guess + " ";
        if (attempts == 7) {
            feedback.textContent = "Sorry, you lost! The number was: " + randomNumber;
            feedback.style.color = "red";
            document.querySelector("#attemptsLeft").textContent = "Attempts remaining: " + (7 - attempts);
            losses++;
            displayScore();
            gameOver();
        } else if ( guess > randomNumber) {
            feedback.textContent = "Guess was high";
            document.querySelector("#attemptsLeft").textContent = "Attempts remaining: " + (7 - attempts);
        } else {
            feedback.textContent = "Guess was low";
            document.querySelector("#attemptsLeft").textContent = "Attempts remaining: " + (7 - attempts);
        }
    }
}


function gameOver() {
    let guessBtn = document.querySelector("#guessBtn");
    let resetBtn = document.querySelector("#resetBtn");
    guessBtn.style.display = "none"; //hides Guess button
    resetBtn.style.display = "inline"; //displays Reset button
}

function displayScore() {
    document.querySelector("#Wins").textContent = "Total Wins: " + wins;
    document.querySelector("#Losses").textContent = "Total Losses: " + losses;
}