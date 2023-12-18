"use strict";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

let mouseUp = false;
let mouseDown = false;

let tool = null;
let imagen = null;

let colorPencil = document.getElementById("color");
let selectFiltro = document.getElementById("listFiltros");
let selecFile = document.getElementById("file");

/***************************
 * COMPORTAMIENTOS DEL MOUSE
 * *************************
 * */
canvas.addEventListener("mousedown", (e) => {
	mouseDown = true;
	mouseUp = false;
	tool.moveTo(e.offsetX, e.offsetY);
	tool.push();
});

canvas.addEventListener("mousemove", (e) => {
	if (mouseDown == true) {
		tool.moveTo(e.offsetX, e.offsetY);
		tool.draw();
	}
});

canvas.addEventListener("mouseup", (e) => {
	mouseUp = true;
	mouseDown = false;
	tool.leave();
});

/*********************
 * BOTONERA
 * *******************
 */
document.getElementById("pencil").addEventListener("click", (e) => {
	tool = new Pencil(ctx, "black");

	changeCursor("lapiz");

	colorPencil.style.display = "block";
	selectFiltro.style.display = "none";
});

document.getElementById("goma").addEventListener("click", (e) => {
	tool = new Goma(ctx);

	changeCursor("goma");

	colorPencil.style.display = "none";
	selectFiltro.style.display = "none";
});

document.getElementById("color").addEventListener("click", (e) => {
	tool.setColor(e.target.value);
});

document.getElementById("nuevo").addEventListener("click", (e) => {
	colorPencil.style.display = "none";
	selectFiltro.style.display = "none";
	selecFile.style.display = "none";
	changeCursor();
	clean();
});

document.getElementById("filtros").addEventListener("click", (e) => {
	colorPencil.style.display = "none";
	selectFiltro.style.display = "block";
	selecFile.style.display = "none";
	changeCursor();
});

document.getElementById("guardar").addEventListener("click", (e) => {
	colorPencil.style.display = "none";
	selectFiltro.style.display = "none";
	selecFile.style.display = "none";
	changeCursor();
	let link = document.createElement("a");
	link.download = "canvas.png";
	link.href = canvas.toDataURL();
	link.click();
	actualizarTexto("Imagen guardada");
});

document.getElementById("cargar").addEventListener("click", (e) => {
	colorPencil.style.display = "none";
	selectFiltro.style.display = "none";
	selecFile.style.display = "block";
	changeCursor();
});

document.getElementById("file").addEventListener("change", (e) => {
	colorPencil.style.display = "none";
	selectFiltro.style.display = "none";
	imagen = new Imagen(ctx);
	let file = e.target.files[0];
	imagen.cargarImagen(canvas, file);
	e.target.values = null;
	selecFile.style.display = "none";
});

/***********************
 * LLamado a los filtros
 */

document.getElementById("monocromo").addEventListener("click", (e) => {
	if (imagen != null) {
		imagen.monocromo();
	} else {
		imagen = new Imagen(ctx);
		imagen.monocromo();
	}
});

document.getElementById("negativo").addEventListener("click", (e) => {
	if (imagen != null) {
		imagen.negativo();
	} else {
		imagen = new Imagen(ctx);
		imagen.negativo();
	}
});

document.getElementById("contraste").addEventListener("click", (e) => {
	if (imagen != null) {
		imagen.contraste();
	} else {
		imagen = new Imagen(ctx);
		imagen.contraste();
	}
});

document.getElementById("sepia").addEventListener("click", (e) => {
	if (imagen != null) {
		imagen.sepia();
	} else {
		imagen = new Imagen(ctx);
		imagen.sepia();
	}
});

document.getElementById("bordes").addEventListener("click", (e) => {
	if (imagen != null) {
		imagen.detectorBordes();
	} else {
		imagen = new Imagen(ctx);
		imagen.detectorBordes();
	}
});

document.getElementById("blur").addEventListener("click", (e) => {
	if (imagen != null) {
		imagen.blur();
	} else {
		imagen = new Imagen(ctx);
		imagen.blur();
	}
});

/*******************************
 * Funcion clean() Limpia el canvas
 */
function clean() {
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

/**********************************
 * Funcion changeCursor() cambia la flecha del mouse
 */
function changeCursor(x) {
	if (x == "lapiz") {
		document.body.style.cursor = "url('img/lapiz.cur'), auto";
	} else if (x == "goma") {
		document.body.style.cursor = "url('img/goma.cur'), auto";
	} else {
		document.body.style.cursor = "default";
	}
}

/**********************
 * Funcion main o de inicio
 */
function main() {
	clean();
}
