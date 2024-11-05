const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const btnUp = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnDown = document.querySelector("#down");
const spanLives = document.querySelector("#lives");
const spanTime = document.querySelector("#time");
const spanRecord = document.querySelector("#record");
const pResult = document.querySelector("#result");
const modalTime = document.querySelector("#tiempo-hecho");
const contadorReinicio = document.querySelector("#contador-reinicio");

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

let canvasSize;
let elementsSize;
let paddingCanvas;
let level = 0;
let lives = 3;
let timeStart;
let timePlayer;
let timeInterval;

const playerPosition = {
	x: undefined,
	y: undefined,
};
const giftPosition = {
	x: undefined,
	y: undefined,
};
let enemyPositions = [];

// Establece el tamaño del mapa y lo hace responsive
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

	playerPosition.x = undefined;
	playerPosition.y = undefined;

	startGame();
}

// Carga los elementos del mapa
function startGame() {
	game.clearRect(0, 0, canvas.width, canvas.height); // limpia el canvas
	enemyPositions = []; // vaciamos el array de enemigos o bombas

	game.font = elementsSize + "px Verdana";
	game.textAlign = "left"; // Alineación horizontal
	game.textBaseline = "top"; // Alineación Vertical

	// array.forEach(fc) // no devuelve un array
	// array.map(fc) // devuelve un array

	// array.split('') // corta el array según el carácter que se le dé, sí no tiene se le corta por cada carácter
	// array.trim() // elimina los espacios al inicio o final de un array

	const map = maps[level]; // Seleccionamos el mapa o nivel

	// verifica que ya no quedan más mapas, terminamos el último mapa
	if (!map) {
		gameWin();
		return;
	}

	// pasa los mapas de un string a array
	const mapRows = map.trim().split("\n"); // corta en los enter
	const mapRowsLimpios = mapRows.map((row) => row.trim()); // a cada fila le quita el inicio y final en blanco
	const mapColums = mapRowsLimpios.map((row) => row.split("")); // cada fila es cortada por letra y puesta en un array

	showLives();

	showRecords();

	mapColums.forEach((row, rowI) => {
		// el segundo elemento rowI es el indice
		row.forEach((col, colI) => {
			// el segundo elemento colI es el indice
			const emoji = emojis[col];

			const xx = elementsSize * colI + paddingCanvas / 2;
			const yy = elementsSize * rowI + paddingCanvas;

			// Buscando la puerta para colocar al jugador
			if (col == "O" && playerPosition.x == undefined) {
				playerPosition.x = xx;
				playerPosition.y = yy;
			}
			// Buscando el regalo para colocar la posición objetivo
			if (col == "I" && giftPosition.x == undefined) {
				giftPosition.x = xx;
				giftPosition.y = yy;
			}
			// Buscando y guardando la posición de las bombas
			if (col == "X") {
				enemyPositions.push({
					x: xx,
					y: yy,
				});
			}

			game.fillText(emoji, xx, yy); // renderiza lo emogis
		});
	});

	movePlayer();

	/*
	for (let row = 0; row < 10; row++) {
		for (let colums = 0; colums < 10; colums++) {
			let xx = elementsSize * colums + paddingCanvas / 2;
			let yy = elementsSize * row + paddingCanvas;
			
			game.fillText(emojis[mapColums[row][colums]], xx, yy);
		}
	}
	*/

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

	// game.fillRect(0, 100, 100, 100); // (donde parte en X, donde parte en y, hasta dónde en X 100 px [ancho], hasta dónde en y 100 px [largo])
	// game.clearRect(0, 0, 50, 50); // borra lo que haya en esas coordenadas y funciona igual que el fillRect

	// game.font = "25px Verdana"; // Tamaño del texto, debe ir con la fuente del texto
	// game.fillStyle = "purple"; // Color del texto
	// game.textAlign = 'center' // alinea el texto, https://static.platzi.com/media/user_upload/text-788330e4-177b-444f-9911-661f51758139.jpg
	// game.fillText("Seba", 50, 50); // El texto a colocar y la posición de inicio
}

// dibuja la nueva posición del jugador
function movePlayer() {
	// verificar si colisiona con el objetivo regalo mediante ver si tienen la misma posición
	const giftCollisionX =
		Math.trunc(playerPosition.x) == Math.trunc(giftPosition.x);
	const giftCollisionY =
		Math.trunc(playerPosition.y) == Math.trunc(giftPosition.y);
	// Se eliminan los decimales puesto que para hacer la verificación pueden variar los decimales y lanza que no hemos colisionado
	const giftCollision = giftCollisionX && giftCollisionY;

	if (giftCollision) {
		levelWin();
	}

	// verificar si colisiona con alguna bomba
	const enemyCollision = enemyPositions.find((enemy) => {
		const enemyCollisionX = Math.trunc(enemy.x) == Math.trunc(playerPosition.x);
		const enemyCollisionY = Math.trunc(enemy.y) == Math.trunc(playerPosition.y);
		return enemyCollisionX && enemyCollisionY;
	});

	if (enemyCollision) {
		animacionDeColision(playerPosition.x, playerPosition.y);
	}

	game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
}

function levelWin() {
	console.log("subiste de nivel, wiii");
	level++;

	// limpia las posiciones de jugador y el objetivo
	playerPosition.x = undefined;
	playerPosition.y = undefined;
	giftPosition.x = undefined;
	giftPosition.y = undefined;

	startGame();
}

function gameWin() {
	console.log("Terminaste el juego");
	clearInterval(timeInterval);

	const recordTime = localStorage.getItem("record_time");
	const playerTime = Date.now() - timeStart;

	if (recordTime) {
		if (playerTime < recordTime) {
			localStorage.setItem("record_time", playerTime);
			pResult.innerHTML = "SUPERASTE EL RECORD!!!";
		} else {
			pResult.innerHTML = "Aunque no superaste el record :(";
		}
	} else {
		localStorage.setItem("record_time", playerTime);
		pResult.innerHTML = "Se guardó el siguiente record" + playerTime;
	}

	modalDeLaVictoria(playerTime);

	console.log({ recordTime, playerTime });
}

function animacionDeColision(posXJugador, posYJugador) {
	rellenarCanvas(posXJugador, posYJugador);

	// espera un segundo antes de avanzar
	setTimeout(levelFail, 1000);
}

function rellenarCanvas(posXJugador, posYJugador) {
	posXInicio = posXJugador + elementsSize / 2 + paddingCanvas;
	posYInicio = posYJugador + elementsSize / 2;

	for (let i = 0; i < canvasSize + 100; i = i + 1) {
		const opacidad = 1 - i / (canvasSize + 200); // Calcula la opacidad de 1 a 0
		const color = `rgba(255, 0, 0, ${opacidad})`;

		setTimeout(() => {
			drawCircle(posXInicio, posYInicio, elementsSize + i, color, 2);
		}, 10);
	}
}

function levelFail() {
	// console.log("Chocaste contra un enemigo :(");

	lives--;

	if (lives <= 0) {
		level = 0;
		lives = 3;
		timeStart = undefined;
	}

	// limpia las posiciones de jugador y el objetivo
	playerPosition.x = undefined;
	playerPosition.y = undefined;
	giftPosition.x = undefined;
	giftPosition.y = undefined;

	startGame();
}

function showLives() {
	// Array(lives).fill(emojis['HEART']); //  ['❤️', '❤️', '❤️']

	spanLives.innerHTML = emojis["HEART"].repeat(lives);
}

function showTime() {
	if (!timeStart) {
		spanTime.innerHTML = 0;
	} else {
		spanTime.innerHTML = Date.now() - timeStart;
	}
}

function showRecords() {
	spanRecord.innerHTML = localStorage.getItem("record_time");
}

function modalDeLaVictoria(playerTime) {
	setTimeout(openModal, 400); // Después de ganar le dá un tiempo de espera para que aparezca el modal
	modalTime.innerHTML = playerTime; // Tiempo del usuario en pantalla final
	timeStart = Date.now() + 11000;
	setInterval(conteoRegresivo, 1000); // Se limpia cuando se recarga la página
	setTimeout(recargarWeb, 10500);
}

function conteoRegresivo() {
	contadorReinicio.innerHTML = parseInt((timeStart - Date.now()) / 1000);
}

function recargarWeb() {
	location.reload();
}

// Escuchar que tecla o botón presionó el jugador
window.addEventListener("keydown", moveByKeys);
btnUp.addEventListener("click", moveUp);
btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);
btnDown.addEventListener("click", moveDown);

function moveByKeys(event) {
	if (event.key == "ArrowUp") moveUp();
	else if (event.key == "ArrowDown") moveDown();
	else if (event.key == "ArrowRight") moveRight();
	else if (event.key == "ArrowLeft") moveLeft();
}
function moveUp() {
	if (playerPosition.y - elementsSize >= 0) {
		//verificación para que no se salga del mapa
		playerPosition.y -= elementsSize;
		startGame();
	}

	inicializarTiempo();
}
function moveLeft() {
	if (playerPosition.x - elementsSize >= 0) {
		playerPosition.x -= elementsSize;
		startGame();
	}
	inicializarTiempo();
}
function moveRight() {
	if (playerPosition.x + elementsSize < canvasSize - elementsSize) {
		//verificación para que no se salga del mapa
		playerPosition.x += elementsSize;
		startGame();
	}
	inicializarTiempo();
}
function moveDown() {
	if (playerPosition.y + elementsSize < canvasSize - elementsSize) {
		playerPosition.y += elementsSize;
		startGame();
	}
	inicializarTiempo();
}

function inicializarTiempo() {
	// Verifica que el tiempos esté vacío, si es así lo inicializa
	if (!timeStart) {
		timeStart = Date.now();
		timeInterval = setInterval(showTime, 100);
	}
}

// Para crear una linea
function fillLine(
	PuntoXInicial,
	PuntoYInicial,
	PuntoXFinal,
	PuntoYFinal,
	color = "red",
	lineWidth = 5
) {
	game.beginPath(); // Inicia un nuevo camino
	game.moveTo(PuntoXInicial, PuntoYInicial); // Mueve el punto de inicio a (x1, y1) sin rayar nada
	game.lineTo(PuntoXFinal, PuntoYFinal); // Dibuja una línea hasta (x2, y2)
	game.strokeStyle = color; // Establece el color de la línea
	game.lineWidth = lineWidth; // Establece el grosor de la línea, en pixeles
	game.stroke(); // Dibuja el contorno del camino
}

// Función para dibujar un círculo con el centro vacío
function drawCircle(centerX, centerY, radius, color = "red", lineWidth = 5) {
	game.beginPath(); // Inicia un nuevo camino
	game.arc(centerX, centerY, radius, 0, 2 * Math.PI); // Dibuja un arco completo (círculo)

	// Dibuja un círculo con contorno
	game.strokeStyle = color; // Establece el color del contorno
	game.lineWidth = lineWidth; // Establece el grosor del contorno
	game.stroke(); // Dibuja el contorno del círculo

	// Dibuja un círculo relleno
	// game.fillStyle = color; // Establece el color de relleno
	// game.fill(); // Rellena el círculo con el color especificado
}
