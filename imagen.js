"use stricts";

class Imagen {
	constructor(ctx) {
		this.ctx = ctx;
		this.imgClon = new Image();
	}

	cargarImagen(canvas, file) {
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			let img = new Image();
			img.src = reader.result;
			this.imgClon.src = reader.result;
			img.onload = () => {
				let relacionAspecto = img.width / img.height;
				let newWidth = canvas.width;
				let newHeight = canvas.height;
				newHeight = newWidth / relacionAspecto;
				if (newHeight > canvas.height) {
					newHeight = canvas.height;
					newWidth = newHeight * relacionAspecto;
				}
				this.ctx.drawImage(img, 0, 0, newWidth, newHeight);
			};
		};
	}

	monocromo() {
		let imageData = this.ctx.getImageData(0, 0, canvasWidth, canvasHeight);
		let media = 0;
		for (let pixel = 0; pixel < imageData.data.length; pixel += 4) {
			media =
				(imageData.data[pixel + 0] +
					imageData.data[pixel + 1] +
					imageData.data[pixel + 2]) /
				3;
			imageData.data[pixel + 0] = media;
			imageData.data[pixel + 1] = media;
			imageData.data[pixel + 2] = media;
		}
		this.ctx.putImageData(imageData, 0, 0);
	}

	negativo() {
		let imageData = this.ctx.getImageData(0, 0, canvasWidth, canvasHeight);

		for (let pixel = 0; pixel < imageData.data.length; pixel += 4) {
			imageData.data[pixel + 0] = 255 - imageData.data[pixel + 0];
			imageData.data[pixel + 1] = 255 - imageData.data[pixel + 1];
			imageData.data[pixel + 2] = 255 - imageData.data[pixel + 2];
		}
		this.ctx.putImageData(imageData, 0, 0);
	}

	sepia() {
		let imageData = this.ctx.getImageData(0, 0, canvasWidth, canvasHeight);

		for (let pixel = 0; pixel < imageData.data.length; pixel += 4) {
			let luminosidad =
				(1 / 3) * imageData.data[pixel] +
				(3 / 5) * imageData.data[pixel + 1] +
				(1 / 10) * imageData.data[pixel + 2];
			imageData.data[pixel + 0] = Math.min(luminosidad + 40, 255);
			imageData.data[pixel + 1] = Math.min(luminosidad + 15, 255);
			imageData.data[pixel + 2] = luminosidad;
		}
		this.ctx.putImageData(imageData, 0, 0);
	}

	contraste() {
		let imageData = this.ctx.getImageData(0, 0, canvasWidth, canvasHeight);
		let pixels = imageData.data;
		let contraste = 100;
		let factor = (259 * (contraste + 255)) / (255 * (259 - contraste));

		for (let pixel = 0; pixel < pixels.length; pixel += 4) {
			let r = pixels[pixel + 0];
			let g = pixels[pixel + 1];
			let b = pixels[pixel + 2];

			pixels[pixel + 0] = factor * (r - 128) + 128;
			pixels[pixel + 1] = factor * (g - 128) + 128;
			pixels[pixel + 2] = factor * (b - 128) + 128;
		}
		this.ctx.putImageData(imageData, 0, 0);
	}

	detectorBordes() {
		let imageData = this.ctx.getImageData(0, 0, canvasWidth, canvasHeight);
		let imageDataAux = this.ctx.getImageData(0, 0, canvasWidth, canvasHeight);
		let kernelX = [
			[-1, 0, 1],
			[-2, 0, 2],
			[-1, 0, 1],
		];
		let kernelY = [
			[-1, -2, -1],
			[0, 0, 0],
			[1, 2, 1],
		];
		let offset = Math.floor(kernelX.length / 2);

		let rgb = 0;
		let acuX = 0;
		let acuY = 0;

		for (let i = offset; i < imageData.width - offset; i++) {
			for (let j = offset; j < imageData.height - offset; j++) {
				let pixel = (i + j * imageData.width) * 4;
				rgb = 0;
				acuX = 0;
				acuY = 0;
				for (let x = 0; x < kernelX.length; x++) {
					for (let y = 0; y < kernelY.length; y++) {
						let xn = x + i - offset;
						let yn = y + j - offset;
						let pixAd = (xn + yn * imageData.width) * 4;
						for (let ind = pixAd; ind < pixAd + 3; ind++) {
							acuX += imageData.data[ind] * kernelX[x][y];
							acuY += imageData.data[ind] * kernelY[x][y];
						}
					}
				}
				rgb = parseInt(Math.sqrt(acuX ** 2 + acuY ** 2));

				imageDataAux.data[pixel + 0] = rgb;
				imageDataAux.data[pixel + 1] = rgb;
				imageDataAux.data[pixel + 2] = rgb;
			}
		}

		this.ctx.putImageData(imageDataAux, 0, 0);
	}

	blur() {
		let imageData = this.ctx.getImageData(0, 0, canvasWidth, canvasHeight);
		let imageDataAux = this.ctx.getImageData(0, 0, canvasWidth, canvasHeight);
		let kernel = [
			[1 / 9, 1 / 9, 1 / 9],
			[1 / 9, 1 / 9, 1 / 9],
			[1 / 9, 1 / 9, 1 / 9],
		];
		let offset = Math.floor(kernel.length / 2);
		let aux = [0, 0, 0];

		for (let i = offset; i < imageData.width - offset; i++) {
			for (let j = offset; j < imageData.height - offset; j++) {
				let pixel = (i + j * imageData.width) * 4;
				aux = [0, 0, 0];
				for (let x = 0; x < kernel.length; x++) {
					for (let y = 0; y < kernel.length; y++) {
						let xn = x + i - offset;
						let yn = y + j - offset;
						let pixAd = (xn + yn * imageData.width) * 4;
						aux[0] += imageData.data[pixAd] * kernel[x][y];
						aux[1] += imageData.data[pixAd + 1] * kernel[x][y];
						aux[2] += imageData.data[pixAd + 2] * kernel[x][y];
					}
				}
				imageDataAux.data[pixel + 0] = aux[0];
				imageDataAux.data[pixel + 1] = aux[1];
				imageDataAux.data[pixel + 2] = aux[2];
			}
		}

		this.ctx.putImageData(imageDataAux, 0, 0);
	}
}
