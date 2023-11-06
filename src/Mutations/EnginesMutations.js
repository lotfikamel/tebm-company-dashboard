import { useMutation } from 'react-query';

import Http from '../System/Http/Http';

import { toast } from '../ComponentsUtilities/ComponentsUtilities';

const ROUTES = {

	addEngine : '/actions/engines/add',
	updateEngine : '/actions/engines/update',
	deleteEngine : '/actions/engines/delete'
}

function addEngine ({ data, photos }) {

	return new Promise((resolve, reject) => {

		const headers = {

			'Content-Type' : 'multipart/form-data',
			...data
		}

		const formData = new FormData();

		for (const photo of photos) {

			formData.append('photos', photo);
		}

		Http.post(ROUTES.addEngine, formData, {

			headers
		}).then(response => {

			if ('errors' in response.data) {

				return reject(response.data.errors);
			}

			return resolve(response.data.response);
		}).catch(err => {

			return reject({

				addEngine : 'error'
			});
		})
	});
}

function updateEngine ({ engineId, data, photos, allPhotos, deletedPhotos }) {

	return new Promise((resolve, reject) => {

		const headers = {

			'Content-Type' : 'multipart/form-data',
			engineId,
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

		Http.post(ROUTES.updateEngine, formData, {

			headers
		}).then(response => {

			if ('errors' in response.data) {

				return reject(response.data.errors);
			}

			return resolve(response.data.response);
		}).catch(err => {

			return reject({

				updateEngine : 'error'
			});
		})
	});
}

function deleteEngine ({ engineId }) {

	return new Promise((resolve, reject) => {

		Http.post(ROUTES.deleteEngine, {

			engineId
		}).then(() => {

			return resolve();
		}).catch(err => {

			if (err.response?.data) {

				toast({ message : 'vous ne pouvez pas supprimer un engin qui a déjà collecté des données.' })
			}

			return reject(err);
		})
	});
}

export const useAddEngineMutation = () => {

	return useMutation(addEngine);
}

export const useUpdateEngineMutation = () => {

	return useMutation(updateEngine);
}

export const useDeleteEngineMutation = () => {

	return useMutation(deleteEngine);
}