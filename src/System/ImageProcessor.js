class ImageProcessor {

	constructor (image) {

		/**
		* The image file object
		* @var {File}
		*/
		this.image = image;
	}

	/**
	* Resize image
	* @param {Object} dimension
	* @return Pomise
	*/
	resizeImage (dimension) {

		let reader = new FileReader();

		let img = document.createElement('img');

		let canvas = document.createElement('canvas');

		return new Promise(resolve => {

			img.onload = async () => {

				let imgDimension = await this.getImageDimension();

				let resizeWidth = dimension.width;

				let resizeHeight = dimension.height || resizeWidth;

				if ((imgDimension.width > resizeWidth) && (imgDimension.height > resizeHeight)) {

					let ratio = imgDimension.width / resizeWidth;

					if ((imgDimension.height / ratio) < resizeHeight) {

						ratio = imgDimension.height / resizeHeight;
					}

					canvas.width = imgDimension.width / ratio;

					canvas.height = imgDimension.height / ratio;
				} else {

					canvas.width = imgDimension.width;

					canvas.height = imgDimension.height;
				}

				let context = canvas.getContext('2d');

				context.drawImage(img, 0, 0, canvas.width, canvas.height);

				context.canvas.toBlob((blob) => {

					let file = new File([blob], this.image.name, {

						type : this.image.type,
						lastModified : Date.now()
					});

					resolve(file);
				},  this.image.type);	
			};

			reader.onload = (e) => {

				img.src = e.target.result;
			};

			reader.readAsDataURL(this.image);
		});
	}

	/**
	* Get image dimension
	* @return {Object}
	*/
	getImageDimension () {

		let img = document.createElement('img');

		let fileReader = new FileReader();

		return new Promise((resolve, reject) => {

			img.onload = () => {

				resolve({ width : img.naturalWidth, height : img.naturalHeight });
			}

			img.onerror = () => {

				reject('error loading image');
			}

			fileReader.onload = (e) => {

				img.src = e.target.result;
			}

			fileReader.readAsDataURL(this.image);
		});
	}
}

export default ImageProcessor;