var colors = [
	"rgb(255, 255, 0)",
	"rgb(255, 0, 255)",
	"rgb(255, 100, 100)",
	"rgb(255, 255, 255)",
	"rgb(55, 0, 150)",
	"rgb(5, 100, 200)" 
]

var squares = document.querySelectorAll(".square")

for (var i = 0; i < squares.length; i++) {
	sqaures[i].style.background = colors[i]
}