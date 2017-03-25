var numSquares = 6;
var colors = [];
var pickedColor;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector(".reset");
var selectMode = document.querySelectorAll(".mode");


init();

function init() {
	//set evenlistener, we can also set it as an independent function
	for (var i = 0; i < selectMode.length; i++) {
		selectMode[i].addEventListener("click", function(){
			selectMode[0].classList.remove("selected");
			selectMode[1].classList.remove("selected");
			this.classList.add("selected");
			
			if (this.textContent === "Easy") {
				numSquares = 3;
			} else {
				numSquares = 6;
			}
			//how many squares to show
			//pick new colors
			//pick a new picked color
			//update page to reflect the change
			reset();
			
		});
	}
	//set squares, also can set this as a function
	for (var i = 0; i < squares.length; i++) {
		//add click listener
		squares[i].addEventListener("click", function(){
			//grab color of clicked square, compare color to picked COLOR
			if (this.style.background === pickedColor) {
				messageDisplay.textContent = "You are right";
				changeColors(this.style.background);
				h1.style.background = this.style.background;
				resetButton.textContent = "Play Again";
			} else {
				this.style.background = "#232323";
				messageDisplay.textContent = "Try Again";
			}
		});
	}
	reset();
}





function reset() {
	//generate all new colors
	colors = generateRandomColor(numSquares);
	//pick a new random color
	pickedColor = pickColorRandom();
	//change colorDisplay to match picked color
	colorDisplay.textContent = pickedColor;
	//change the button from play again to new color
	resetButton.textContent = "New Colors";
	//change the messageDisplay to empty
	messageDisplay.textContent = "";
	//change colors of squares
	for (var i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.background = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	//change the head backgroud back
	h1.style.background = "steelblue";
}



resetButton.addEventListener("click", function() {
	reset();
});



function changeColors(color) {
	for (var i = 0; i < colors.length; i++) {
		squares[i].style.background = color;
	}
}

function pickColorRandom() {
	return colors[Math.floor(Math.random() * colors.length)];
}

function generateRandomColor(mode) {
	var arr = [];
	for (var i = 0; i < mode; i++) {
		arr[i] = randomColor();
	}
	return arr;
}

function randomColor() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}



