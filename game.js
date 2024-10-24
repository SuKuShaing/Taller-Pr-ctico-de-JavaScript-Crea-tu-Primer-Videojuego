const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");

window.addEventListener("load", startGame);

function startGame() {
	game.fillRect(0, 100, 100, 100); // (donde parte en X, donde parte en y, hasta dónde en X 100 px [ancho], hasta dónde en y 100 px [largo])
	game.clearRect(0, 0, 50, 50);
	game.clearRect(50, 50, 10, 20);

	game.font = "25px Verdana";
	game.fillStyle = "purple";
    game.textAlign = 'center'
	game.fillText("Seba", 50, 50);
}
