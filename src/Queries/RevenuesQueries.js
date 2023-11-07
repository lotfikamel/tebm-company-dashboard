import { useInfiniteQuery, useQuery } from 'react-query';

import Http from "../System/Http/Http";

const ROUTES = {

	fetchDriverTotalDebts : '/fetch/revenues/driver/debts/total',
	fetchCompanyTotalDebts : '/fetch/revenues/company/debts/total',

	fetchDriverDebts : '/fetch/revenues/driver/debts',
	fetchMoreDriverDebts : '/fetch/revenues/driver/debts/more',

	fetchCompanyRevenues : '/fetch/revenues/company',
	fetchMoreCompanyRevenues : '/fetch/revenues/company/more',
	
	fetchCompanyDebts : '/fetch/revenues/company/debts',
	fetchMoreCompanyDebts : '/fetch/revenues/company/debts/more',
}

function fetchDriverTotalDebts ({ driverId, startDate, endDate }) {

	return new Promise((resolve, reject) => {

		Http.get(ROUTES.fetchDriverTotalDebts, {

			params : {

				driverId,
				startDate,
				endDate
			}
		}).then(response => {

			return resolve(response.data.response)
		}).catch(err => {

			return reject(err);
		})
	})
}

function fetchCompanyTotalDebts ({ companyId, startDate, endDate }) {

	return new Promise((resolve, reject) => {

		Http.get(ROUTES.fetchCompanyTotalDebts, {

			params : {

				companyId,
				startDate,
				endDate
			}
		}).then(response => {

			return resolve(response.data.response)
		}).catch(err => {

			return reject(err);
		})
	})
}

function fetchCompanyTotalRevenues ({ companyId }) {

	return new Promise((resolve, reject) => {

		Http.get(ROUTES.fetchCompanyTotalRevenues, {

			params : {

				companyId
			}
		}).then(response => {

			return resolve(response.data.response)
		}).catch(err => {

			return reject(err);
		})
	})
}

function fetchDriverDebts ({ driverId, filters, pageParam = null }) {

	return new Promise((resolve, reject) => {

		const creationDate = pageParam;

		const route = creationDate ? ROUTES.fetchMoreDriverDebts : ROUTES.fetchDriverDebts;

		Http.get(route, {

			params : {

				driverId,
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

function fetchCompanyRevenues ({ companyId, filters, pageParam = null }) {

	return new Promise((resolve, reject) => {

		const creationDate = pageParam;

		const route = creationDate ? ROUTES.fetchMoreCompanyRevenues : ROUTES.fetchCompanyRevenues;

		Http.get(route, {

			params : {

				companyId,
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

function fetchCompanyDebts ({ companyId, filters, pageParam = null }) {

	return new Promise((resolve, reject) => {

		const creationDate = pageParam;

		const route = creationDate ? ROUTES.fetchMoreCompanyDebts : ROUTES.fetchCompanyDebts;

		Http.get(route, {

			params : {

				companyId,
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


export const useTransportRidesTypesTotalDebtsQuery = ({ startDate, endDate, ...config }) => {

	return useQuery(['transportRidesTypesTotalDebtsQuery', startDate, endDate], () => fetchTransportRidesTypesTotalDebts({ startDate, endDate }), {

		...config
	})
}

export const useCompanyTotalRevenuesQuery = ({ companyId, ...config }) => {

	return useQuery(['companyTotalRevenues', companyId], () => fetchCompanyTotalRevenues({ companyId }), {

		...config
	})
}

export const useDriverTotalDebtsQuery = ({ driverId, startDate, endDate, ...config }) => {

	return useQuery(['driverTotalDebts', driverId, startDate, endDate], () => fetchDriverTotalDebts({ driverId, startDate, endDate }), {

		...config
	})
}

export const useCompanyTotalDebtsQuery = ({ companyId, startDate, endDate, ...config }) => {

	return useQuery(['companyTotalDebts', companyId, startDate, endDate], () => fetchCompanyTotalDebts({ companyId, startDate, endDate }), {

		...config
	})
}

export const useDriverDebtsQuery = ({ driverId, filters, ...config }) => {

	return useInfiniteQuery(['driverDebts', driverId, filters], ({ pageParam }) => fetchDriverDebts({ pageParam, driverId, filters }), {

		getNextPageParam : (lastPage) => {

			return lastPage.length > 0 ? lastPage[lastPage.length - 1].creationDate : undefined;
		},

		select : (data) => data.pages.flat(),

		...config
	});
}

export const useCompanyRevenuesQuery = ({ companyId, filters, ...config }) => {

	return useInfiniteQuery(['companyRevenues', companyId, filters], ({ pageParam }) => fetchCompanyRevenues({ pageParam, companyId, filters }), {

		getNextPageParam : (lastPage) => {

			return lastPage.length > 0 ? lastPage[lastPage.length - 1].creationDate : undefined;
		},

		select : (data) => data.pages.flat(),

		...config
	});
}

export const useCompanyDebtsQuery = ({ companyId, filters, ...config }) => {

	return useInfiniteQuery(['companyDebts', companyId, filters], ({ pageParam }) => fetchCompanyDebts({ pageParam, companyId, filters }), {

		getNextPageParam : (lastPage) => {

			return lastPage.length > 0 ? lastPage[lastPage.length - 1].creationDate : undefined;
		},

		select : (data) => data.pages.flat(),

		...config
	});
}