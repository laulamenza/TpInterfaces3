"use strict";

//CLASE PENCIL
class Pencil {
	constructor(context, color) {
		this.antX = 0;
		this.antY = 0;
		this.posX = 0;
		this.posY = 0;
		this.ctx = context;
		this.fill = color;
		this.status = "leave";
	}

	//FUNCION DIBUJAR DEL PENCIL
	draw() {
		if (this.status == "leave") {
			return;
		}
		this.ctx.beginPath();
		this.ctx.strokeStyle = this.fill;
		this.ctx.moveTo(this.antX, this.antY);
		this.ctx.lineTo(this.posX, this.posY);
		this.ctx.stroke();
		this.ctx.closePath();
	}

	//FUNCION Q ACTUALIZA LA POSICION DEL MOUSE
	moveTo(x, y) {
		this.antX = this.posX;
		this.antY = this.posY;
		this.posX = x;
		this.posY = y;
	}

	//SETEA EL STATUS A "PUSH" O "APOYADO"
	push() {
		this.status = "push";
	}

	//SETEA EL STATUS A "LEAVE" O "SUELTO"
	leave() {
		this.status = "leave";
	}

	//SETEA EL COLOR DEL PENCIL
	setColor(color) {
		this.fill = color;
	}
}
