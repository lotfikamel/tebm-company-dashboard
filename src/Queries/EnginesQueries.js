import { useInfiniteQuery, useQuery } from 'react-query';

import Http from "../System/Http/Http";

const ROUTES = {

	fetchEngineInfos : '/fetch/engines/infos',
	fetchEngines : '/fetch/engines',
	fetchMoreEngines : '/fetch/engines/more',
	fetchEngineDetails : '/fetch/engines/details',

	fetchEngineTypes : '/fetch/engines/types',
	searchEngineByLicencePlate : '/fetch/engines/search'
}

function fetchEngineInfos ({ engineId }) {

	return new Promise((resolve, reject) => {

		Http.get(ROUTES.fetchEngineInfos, {

			params : {

				engineId
			}
		}).then(response => {

			return resolve(response.data.response);
		}).catch(err => {

			return reject(err);
		})
	});
}

function fetchEngines ({ filters, pageParam = null }) {

	return new Promise((resolve, reject) => {

		const creationDate = pageParam;

		const route = creationDate ? ROUTES.fetchMoreEngines : ROUTES.fetchEngines;

		Http.get(route, {

			params : {

				filters,
				creationDate
			}
		}).then(response => {

			return resolve(response.data.response);
		}).catch(err => {

			return reject(err);
		})
	});
}

function fetchEngineDetails ({ engineId }) {

	return new Promise((resolve, reject) => {

		Http.get(ROUTES.fetchEngineDetails, {

			params : {

				engineId
			}
		}).then(response => {

			return resolve(response.data.response[0]);
		}).catch(err => {

			return reject(err);
		})
	});
}

function fetchEngineTypes () {

	return new Promise((resolve, reject) => {

		Http.get(ROUTES.fetchEngineTypes).then(response => {

			return resolve(response.data.response);
		}).catch(err => {

			return reject(err);
		})
	});
}

export function searchEngineByLicencePlate ({ licencePlate }) {

	return new Promise((resolve, reject) => {

		Http.get(ROUTES.searchEngineByLicencePlate, {

			params : {

				licencePlate
			}
		}).then(response => {

			return resolve(response.data.response);
		}).catch(err => {

			console.log(err);

			return reject(err);
		});
	})
}

export const useEngineInfosQuery = ({ engineId, ...config }) => {

	return useQuery(['engineInfos', engineId], () => fetchEngineInfos({ engineId }), {

		...config
	});
}

export const useEnginesQuery = ({ filters, ...config }) => {

	return useInfiniteQuery(['engines', filters], ({ pageParam }) => fetchEngines({ pageParam, filters }), {

		getNextPageParam : (lastPage) => {

			return lastPage.length > 0 ? lastPage[lastPage.length - 1].creationDate : undefined;
		},

		select : (data) => data.pages.flat(),

		...config
	});
}

export const useEngineDetailsQuery = ({ engineId, ...config }) => {

	return useQuery(['engineDetails', engineId], () => fetchEngineDetails({ engineId }), {

		...config
	});
}

export const useEngineTypesQuery = (config) => {

	return useQuery(['engineTypes'], fetchEngineTypes, {

		...config
	});
}