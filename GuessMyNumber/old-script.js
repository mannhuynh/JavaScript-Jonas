"use strict";

// Get a random number from 1 - 20
let secretNumber = Math.floor(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

document.querySelector(".check").addEventListener("click", function () {
	// Get the input number
	const guess = Number(document.querySelector(".guess").value);

	// Firstly validate the guessing number
	if (!guess || guess > 20 || guess < 1) {
		document.querySelector(".message").textContent =
			"🛑Choose Between 1 and 20🛑";

		// When player win the game
	} else if (guess === secretNumber) {
		// Change the text content of the element with class "message"
		document.querySelector(".message").textContent = "🌟Correct Number🌟";
		// Display the secretNumber
		document.querySelector(".number").textContent = secretNumber;
		// Change the inline CSS style
		document.querySelector("body").style.backgroundColor = "#60b347";
		document.querySelector(".number").style.width = "30rem";

        // Implement the Highscore 
        if (score > highscore) {
            highscore = score;
            document.querySelector('.highscore').textContent = highscore;
        }

		// When guessing number is higher than secretNumber
	} else if (guess > secretNumber) {
		if (score > 1) {
			document.querySelector(".message").textContent = "😅Too High😅";
			score--;
			document.querySelector(".score").textContent = score;
		} else {
			document.querySelector(".message").textContent = "😥You Lose😥";
			document.querySelector(".score").textContent = 0;
		}

		// When guessing number is lower than secretNumber
	} else if (guess < secretNumber) {
		if (score > 1) {
			document.querySelector(".message").textContent = "😅Too Low😅";
			score--;
			document.querySelector(".score").textContent = score;
		} else {
			document.querySelector(".message").textContent = "😥You Lose😥";
			document.querySelector(".score").textContent = 0;
		}
	}
});

// When user click Again! button, reset everything.
const againButton = document.querySelector(".again");
againButton.addEventListener("click", function () {
    secretNumber = Math.floor(Math.random() * 20) + 1;
	document.querySelector(".message").textContent = "Start guessing...";
	document.querySelector(".score").textContent = 20;
	document.querySelector(".guess").value = "";
	document.querySelector(".number").textContent = "?";
	document.querySelector("body").style.backgroundColor = "#222";
	document.querySelector(".number").style.width = "15rem";
});
