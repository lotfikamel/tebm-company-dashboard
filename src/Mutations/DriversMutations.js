import { useMutation } from 'react-query';

import Http from '../System/Http/Http';

import { toast } from '../ComponentsUtilities/ComponentsUtilities';

const ROUTES = {

	blockDriver : '/actions/drivers/block',
	unblockDriver : '/actions/drivers/unblock',
	attachEngine : '/actions/drivers/attach-engine',
	detachEngine : '/actions/drivers/detach-engine'
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

				toast({ message : 'vous ne pouvez pas attachez cet véhicule a ce chauffeur.' })
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