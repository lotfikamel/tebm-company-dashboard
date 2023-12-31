const EventEmitter = {

	on (event, callback) {

		document.addEventListener(event, callback)
	},

	emit (event, data) {

		document.dispatchEvent(new CustomEvent(event, { detail : data }));
	},

	remove (event, callback) {

		document.removeEventListener(event, callback);
	}
}

export default EventEmitter;