const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

let canvasSize;
let elementsSize;
let paddingCanvas;

function setCanvasSize() {
	if (window.innerHeight > window.innerWidth) {
		canvasSize = window.innerWidth * 0.75;
	} else {
		canvasSize = window.innerHeight * 0.75;
	}

	canvas.setAttribute("width", canvasSize);
	canvas.setAttribute("height", canvasSize);

	elementsSize = parseInt(canvasSize / 10 - 1.5); // para crear la grilla
	paddingCanvas = (canvasSize - elementsSize * 10) / 2;
	startGame();
}

function startGame() {
	console.log({ canvasSize, elementsSize, paddingCanvas });

	game.font = elementsSize + "px Verdana";
	game.textAlign = "left"; // Alineación horizontal
	game.textBaseline = "top"; // Alineación Vertical

	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 10; j++) {
			// let xx = elementsSize * i;
			// let yy = elementsSize * j;
			let xx = elementsSize * i + paddingCanvas / 2;
			let yy = elementsSize * j + paddingCanvas;

			game.fillText(emojis["X"], xx, yy);
			console.log({ xx, yy, elementsSize });
		}

		//Cuadricula
		/* 
		for (let i = 0; i <= 10; i++) {
			let xx = elementsSize * i;
			fillLine(xx, 0, xx, canvasSize);
		}
		for (let i = 0; i <= 10; i++) {
			let yy = elementsSize * i;
			fillLine(0, yy, canvasSize, yy);
		}
		*/
	}

	// game.fillRect(0, 100, 100, 100); // (donde parte en X, donde parte en y, hasta dónde en X 100 px [ancho], hasta dónde en y 100 px [largo])
	// game.clearRect(0, 0, 50, 50); // borra lo que haya en esas coordenadas y funciona igual que el fillRect

	// game.font = "25px Verdana"; // Tamaño del texto, debe ir con la fuente del texto
	// game.fillStyle = "purple"; // Color del texto
	// game.textAlign = 'center' // alinea el texto, https://static.platzi.com/media/user_upload/text-788330e4-177b-444f-9911-661f51758139.jpg
	// game.fillText("Seba", 50, 50); // El texto a colocar y la posición de inicio
}

function fillLine(x1, y1, x2, y2) {
	game.beginPath(); // Inicia un nuevo camino
	game.moveTo(x1, y1); // Mueve el punto de inicio a (x1, y1) sin rayar nada
	game.lineTo(x2, y2); // Dibuja una línea hasta (x2, y2)
	game.stroke(); // Dibuja el contorno del camino
}
