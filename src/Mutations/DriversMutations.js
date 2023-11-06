import { useMutation } from 'react-query';

import Http from '../System/Http/Http';

import { toast } from '../ComponentsUtilities/ComponentsUtilities';

const ROUTES = {

	addDriver : '/actions/drivers/add',
	updateDriver : '/actions/drivers/update',
	deleteDriver : '/actions/drivers/delete',
	blockDriver : '/actions/drivers/block',
	unblockDriver : '/actions/drivers/unblock',
	attachEngine : '/actions/drivers/attach-engine',
	detachEngine : '/actions/drivers/detach-engine'
}

function addDriver ({ data, photos }) {

	return new Promise((resolve, reject) => {

		const headers = {

			'Content-Type' : 'multipart/form-data',
			...data
		}

		const formData = new FormData();

		for (const photo of photos) {

			formData.append('photos', photo);
		}

		Http.post(ROUTES.addDriver, formData, {

			headers
		}).then(response => {

			if ('errors' in response.data) {

				return reject(response.data.errors);
			}

			return resolve(response.data.response);
		}).catch(err => {

			return reject({

				addDriver : 'error'
			});
		})
	});
}

function updateDriver ({ driverId, data, photos, allPhotos, deletedPhotos }) {

	return new Promise((resolve, reject) => {

		const headers = {

			'Content-Type' : 'multipart/form-data',
			driverId,
			...data,
			allPhotos,
			deletedPhotos
		}

		const formData = new FormData();

		if (photos.length > 0) {

			photos.forEach(photo => {

				formData.append('photos', photo);
			});
		}

		Http.post(ROUTES.updateDriver, formData, {

			headers
		}).then(response => {

			if ('errors' in response.data) {

				return reject(response.data.errors);
			}

			return resolve(response.data.response);
		}).catch(err => {

			return reject({

				updateDriver : 'error'
			});
		})
	});
}

function deleteDriver ({ driverId }) {

	return new Promise((resolve, reject) => {

		Http.post(ROUTES.deleteDriver, {

			driverId
		}).then(() => {

			return resolve();
		}).catch(err => {

			if (err.response?.data) {

				toast({ message : 'vous ne pouvez pas supprimer un chauffeur qui a déjà collecté des données.' })
			}

			return reject(err);
		})
	});
}

function blockDriver ({ driverId }) {

	return new Promise((resolve, reject) => {

		Http.post(ROUTES.blockDriver, {

			driverId
		}).then(() => {

			return resolve();
		}).catch(err => {

			if (err.response?.data) {

				toast({ message : 'vous ne pouvez pas bloqué ce chauffeur.' })
			}

			return reject(err);
		})
	});
}

function unblockDriver ({ driverId }) {

	return new Promise((resolve, reject) => {

		Http.post(ROUTES.unblockDriver, {

			driverId
		}).then(() => {

			return resolve();
		}).catch(err => {

			return reject(err);
		})
	});
}

function attachEngine ({ driverId, engineId }) {

	return new Promise((resolve, reject) => {

		Http.post(ROUTES.attachEngine, {

			driverId,
			engineId
		}).then(() => {

			return resolve();
		}).catch(err => {

			if (err.response?.data) {

				toast({ message : 'vous ne pouvez pas attachez cet engin a ce chauffeur.' })
			}

			return reject(err);
		})
	});
}

function detachEngine ({ driverId }) {

	return new Promise((resolve, reject) => {

		Http.post(ROUTES.detachEngine, {

			driverId
		}).then(() => {

			return resolve();
		}).catch(err => {

			return reject(err);
		})
	});
}

export const useAddDriverMutation = () => {

	return useMutation(addDriver);
}

export const useUpdateDriverMutation = () => {

	return useMutation(updateDriver);
}

export const useDeleteDriverMutation = () => {

	return useMutation(deleteDriver);
}

export const useBlockDriverMutation = () => {

	return useMutation(blockDriver);
}

export const useUnblockDriverMutation = () => {

	return useMutation(unblockDriver);
}

export const useAttachEngineMutation = () => {

	return useMutation(attachEngine)
}

export const useDetachEngineMutation = () => {

	return useMutation(detachEngine)
}