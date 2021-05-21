"use strict";

let score = 20;
let highscore = 0;
const scoreContent = document.querySelector('.score');
const numberContent = document.querySelector(".number");
const bodyContent = document.querySelector('body');
const guessValue = document.querySelector('.guess');
// Get a random number from 1 - 20
let secretNumber = Math.floor(Math.random() * 20) + 1;

const displayMessage = function (message) {
	document.querySelector('.message').textContent = message;
}

document.querySelector(".check").addEventListener("click", function () {
	// Get the input number
	const guess = Number(guessValue.value);

	// Firstly validate the guessing number
	if (!guess || guess > 20 || guess < 1) {
		displayMessage("🛑Choose Between 1 and 20🛑");
		// When player win the game
	} else if (guess === secretNumber) {
		// Change the text content of the element with class "message"
		displayMessage("🌟Correct Number🌟");
		// Display the secretNumber
		numberContent.textContent = secretNumber;
		// Change the inline CSS style
		bodyContent.style.backgroundColor = "#60b347";
		numberContent.style.width = "30rem";

        // Implement the Highscore 
        if (score > highscore) {
            highscore = score;
            document.querySelector('.highscore').textContent = highscore;
        }

		// When guessing number is different from secretNumber
	} else if (guess !== secretNumber) {
		if (score > 1) {
			// document.querySelector(".message").textContent = guess > secretNumber ? "😅Too High😅" : "😅Too Low😅";
			displayMessage(guess > secretNumber ? "😅Too High😅" : "😅Too Low😅");
			score--;
			scoreContent.textContent = score;
		} else {
			displayMessage("😥You Lose😥");
			scoreContent.textContent = 0;
		}		
	} 
});

// When user click Again! button, reset everything.
const againButton = document.querySelector(".again");
againButton.addEventListener("click", function () {
    secretNumber = Math.floor(Math.random() * 20) + 1;
	displayMessage("Start guessing...");
	scoreContent.textContent = 20;
	guessValue.value = "";
	numberContent.textContent = "?";
	bodyContent.style.backgroundColor = "#222";
	numberContent.style.width = "15rem";
});
