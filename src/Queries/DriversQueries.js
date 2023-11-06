import { useInfiniteQuery, useQuery } from 'react-query';

import Http from "../System/Http/Http";

const ROUTES = {

	fetchDriverInfos : '/fetch/drivers/infos',
	fetchDrivers : '/fetch/drivers',
	fetchMoreDrivers : '/fetch/drivers/more',
	fetchDriverProfile : '/fetch/drivers/profile',

	fetchDriverRatings : '/fetch/drivers/ratings',
	fetchMoreDriverRatings : '/fetch/drivers/ratings/more',
}

export function fetchDriverInfos ({ driverId }) {

	return new Promise((resolve, reject) => {

		Http.get(ROUTES.fetchDriverInfos, {

			params : {

				driverId
			}
		}).then(response => {

			return resolve(response.data.response);
		}).catch(err => {

			return reject(err);
		})
	});
}

function fetchDrivers ({ filters, pageParam = null }) {

	return new Promise((resolve, reject) => {

		const creationDate = pageParam;

		const route = creationDate ? ROUTES.fetchMoreDrivers : ROUTES.fetchDrivers;

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

function fetchDriverProfile ({ driverId }) {

	return new Promise((resolve, reject) => {

		Http.get(ROUTES.fetchDriverProfile, {

			params : {

				driverId
			}
		}).then(response => {

			return resolve(response.data.response[0]);
		}).catch(err => {

			return reject(err);
		})
	});
}

function fetchDriverRatings ({ driverId, pageParam = null }) {

	return new Promise((resolve, reject) => {

		const creationDate = pageParam;

		const route = creationDate ? ROUTES.fetchMoreDriverRatings : ROUTES.fetchDriverRatings;

		Http.get(route, {

			params : {

				driverId,
				creationDate
			}
		}).then(response => {

			return resolve(response.data.response);
		}).catch(err => {

			return reject(err);
		})
	});
}

export const useDriverInfosQuery = ({ driverId, ...config }) => {

	return useQuery(['driverInfos', driverId], () => fetchDriverInfos({ driverId }), {

		...config
	});
}

export const useDriversQuery = ({ filters, ...config }) => {

	return useInfiniteQuery(['drivers', filters], ({ pageParam }) => fetchDrivers({ pageParam, filters }), {

		getNextPageParam : (lastPage) => {

			return lastPage.length > 0 ? lastPage[lastPage.length - 1].creationDate : undefined;
		},

		select : (data) => data.pages.flat(),

		...config
	});
}

export const useDriverProfileQuery = ({ driverId, ...config }) => {

	return useQuery(['driverProfile', driverId], () => fetchDriverProfile({ driverId }), {

		...config
	});
}

export const useDriverRatingsQuery = ({ driverId, ...config }) => {

	return useInfiniteQuery(['driverRatings', driverId], ({ pageParam }) => fetchDriverRatings({ pageParam, driverId }), {

		getNextPageParam : (lastPage) => {

			return lastPage.length > 0 ? lastPage[lastPage.length - 1].creationDate : undefined;
		},

		select : (data) => data.pages.flat(),

		...config
	});
}