"use strict";

//CLASE GOMA DE BORRAR
class Goma {
    constructor(context){
        this.antX = 0;
        this.antY = 0;
        this.posX = 0;
        this.posY = 0;
        this.ctx = context;
        this.fill = 'white';
        this.status = 'leave';
    }

    //FUNCION "BORRAR" DE LA GOMA
    draw(){
        if (this.status == 'leave') {
            return;
        }
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.fill;
        this.ctx.moveTo(this.antX, this.antY);
        this.ctx.lineTo(this.posX, this.posY);
        this.ctx.lineWidth = 15;
        this.ctx.stroke();
		this.ctx.closePath();
       
    }

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
}