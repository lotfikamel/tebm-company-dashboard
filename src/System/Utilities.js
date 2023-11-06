/** 
* Build files form data
* @return FormData
*/
export function buildFilesFormData (input, files) {

	let formData = new FormData();

	for (let i=0; i<files.length; i++) {

		formData.append(input, files[i]);
	}

	return formData;
}

/**
* Generate random code with the following form x[n]
* @param {Number} length
* @return {String}
*/
export function randomCode (length) {

	let numbers = '0123456789';

	let code = '';

	for (let i=0; i<length; i++) {

		code += numbers.charAt(Math.floor(Math.random() * 9));
	}

	return code;
}

/**
* Check if the given variable is object
* @param {Mixed} v
* @return {Boolean}
*/
export function isObject (v) {

	return v && v.constructor.name == 'Object';
}

/**
* Check if the given variable is array
* @param {Mixed} v
* @return {Boolean}
*/
export function isArray (v) {

	return v && v.constructor.name == 'Array';
}

/**
* Check if the given variable is boolean
* @param {Mixed} v
* @return {Boolean}
*/
export function isBoolean (v) {

	return v != undefined && v.constructor.name == 'Boolean';
}