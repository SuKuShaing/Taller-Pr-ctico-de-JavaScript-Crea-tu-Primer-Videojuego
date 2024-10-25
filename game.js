const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");

window.addEventListener("load", startGame);

function startGame() {
	let canvasSize;

	if (window.innerHeight > window.innerWidth) {
		canvasSize = window.innerWidth * 0.75;
	} else {
		canvasSize = window.innerHeight * 0.75;
	}

	canvas.setAttribute("width", canvasSize);
	canvas.setAttribute("height", canvasSize);

	const elementsSize = parseInt((canvasSize / 10) - 1.5); // para crear la grilla

	console.log({canvasSize, elementsSize})

	game.font = elementsSize + "px Verdana";
	game.textAlign = "start";

	for (let i = 0; i < 10; i++) {
		game.fillText(emojis["X"], elementsSize * i, elementsSize);
	}

	// game.fillRect(0, 100, 100, 100); // (donde parte en X, donde parte en y, hasta dónde en X 100 px [ancho], hasta dónde en y 100 px [largo])
	// game.clearRect(0, 0, 50, 50); // borra lo que haya en esas coordenadas y funciona igual que el fillRect

	// game.font = "25px Verdana"; // Tamaño del texto, debe ir con la fuente del texto
	// game.fillStyle = "purple"; // Color del texto
	// game.textAlign = 'center' // alinea el texto, https://static.platzi.com/media/user_upload/text-788330e4-177b-444f-9911-661f51758139.jpg
	// game.fillText("Seba", 50, 50); // El texto a colocar y la posición de inicio
}
