import { useInfiniteQuery, useQuery } from 'react-query';

import Http from "../System/Http/Http";

const ROUTES = {

	fetchTransportRideInfos : '/fetch/transport-rides/infos',
	fetchTransportRidesStats : '/fetch/transport-rides/stats',
	fetchTransportRides : '/fetch/transport-rides',
	fetchMoreTransportRides : '/fetch/transport-rides/more',
	fetchTransportRideDetails : '/fetch/transport-rides/details',
}

export function fetchTransportRideInfos ({ rideId }) {

	return new Promise((resolve, reject) => {

		Http.get(ROUTES.fetchTransportRideInfos, {

			params : {

				rideId
			}
		}).then(response => {

			return resolve(response.data.response);
		}).catch(err => {

			return reject(err);
		})
	});
}

function fetchTransportRidesStats () {

	return new Promise((resolve, reject) => {

		Http.get(ROUTES.fetchTransportRidesStats).then(response => {

			return resolve(response.data.response);
		}).catch(err => {

			return reject(err);
		})
	});
}

function fetchTransportRides ({ filters, pageParam = null }) {

	return new Promise((resolve, reject) => {

		const creationDate = pageParam;

		const route = creationDate ? ROUTES.fetchMoreTransportRides : ROUTES.fetchTransportRides;

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

function fetchTransportRideDetails ({ rideId }) {

	return new Promise((resolve, reject) => {

		Http.get(ROUTES.fetchTransportRideDetails, {

			params : {

				rideId
			}
		}).then(response => {

			return resolve(response.data.response[0]);
		}).catch(err => {

			return reject(err);
		})
	});
}

export const useTransportRideInfosQuery = ({ rideId, ...config }) => {

	return useQuery(['transportRideInfos', rideId], () => fetchTransportRideInfos({ rideId }), {

		...config
	});
}

export const useTransportRidesStatsQuery = (config) => {

	return useQuery(['transportRidesStats'], fetchTransportRidesStats, {

		...config
	});
}

export const useTransportRidesQuery = ({ filters, ...config }) => {

	return useInfiniteQuery(['transportRides', filters], ({ pageParam }) => fetchTransportRides({ pageParam, filters }), {

		getNextPageParam : (lastPage) => {

			return lastPage.length > 0 ? lastPage[lastPage.length - 1].creationDate : undefined;
		},

		select : (data) => data.pages.flat(),

		...config
	});
}

export const useTransportRideDetailsQuery = ({ rideId, ...config }) => {

	return useQuery(['transportRideDetails', rideId], () => fetchTransportRideDetails({ rideId }), {

		...config
	});
}