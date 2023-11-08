import { useInfiniteQuery, useQuery } from 'react-query';

import Http from "../System/Http/Http";

const ROUTES = {

	fetchCompanyTotalRevenues : '/fetch/revenues/total',

	fetchDriverTotalDebts : '/fetch/revenues/driver/debts/total',
	fetchCompanyTotalDebts : '/fetch/revenues/debts/total',

	fetchDriverDebts : '/fetch/revenues/driver/debts',
	fetchMoreDriverDebts : '/fetch/revenues/driver/debts/more',

	fetchCompanyRevenues : '/fetch/revenues',
	fetchMoreCompanyRevenues : '/fetch/revenues/more',
	
	fetchCompanyDebts : '/fetch/revenues/debts',
	fetchMoreCompanyDebts : '/fetch/revenues/debts/more',

	fetchDriversDebtors : '/fetch/revenues/debtors',
	fetchMoreDriversDebtors : '/fetch/revenues/debtors/more',
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

function fetchCompanyTotalDebts ({ startDate, endDate }) {

	return new Promise((resolve, reject) => {

		Http.get(ROUTES.fetchCompanyTotalDebts, {

			params : {

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

function fetchCompanyTotalRevenues () {

	return new Promise((resolve, reject) => {

		Http.get(ROUTES.fetchCompanyTotalRevenues).then(response => {

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

function fetchCompanyRevenues ({ filters, pageParam = null }) {

	return new Promise((resolve, reject) => {

		const creationDate = pageParam;

		const route = creationDate ? ROUTES.fetchMoreCompanyRevenues : ROUTES.fetchCompanyRevenues;

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

function fetchCompanyDebts ({ filters, pageParam = null }) {

	return new Promise((resolve, reject) => {

		const creationDate = pageParam;

		const route = creationDate ? ROUTES.fetchMoreCompanyDebts : ROUTES.fetchCompanyDebts;

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

function fetchDriversDebtors ({ pageParam = null }) {

	return new Promise((resolve, reject) => {

		const skip = pageParam;

		const route = skip ? ROUTES.fetchMoreDriversDebtors : ROUTES.fetchDriversDebtors;

		Http.get(route, {

			params : {

				skip
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

export const useCompanyTotalRevenuesQuery = (config) => {

	return useQuery(['companyTotalRevenues'], fetchCompanyTotalRevenues, {

		...config
	})
}

export const useDriverTotalDebtsQuery = ({ driverId, startDate, endDate, ...config }) => {

	return useQuery(['driverTotalDebts', driverId, startDate, endDate], () => fetchDriverTotalDebts({ driverId, startDate, endDate }), {

		...config
	})
}

export const useCompanyTotalDebtsQuery = ({ startDate, endDate, ...config }) => {

	return useQuery(['companyTotalDebts', startDate, endDate], () => fetchCompanyTotalDebts({ startDate, endDate }), {

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

export const useCompanyRevenuesQuery = ({ filters, ...config }) => {

	return useInfiniteQuery(['companyRevenues', filters], ({ pageParam }) => fetchCompanyRevenues({ pageParam, filters }), {

		getNextPageParam : (lastPage) => {

			return lastPage.length > 0 ? lastPage[lastPage.length - 1].creationDate : undefined;
		},

		select : (data) => data.pages.flat(),

		...config
	});
}

export const useCompanyDebtsQuery = ({ filters, ...config }) => {

	return useInfiniteQuery(['companyDebts', filters], ({ pageParam }) => fetchCompanyDebts({ pageParam, filters }), {

		getNextPageParam : (lastPage) => {

			return lastPage.length > 0 ? lastPage[lastPage.length - 1].creationDate : undefined;
		},

		select : (data) => data.pages.flat(),

		...config
	});
}

export const useDriversDebtorsQuery = (config) => {

	return useInfiniteQuery(['driversDebtors'], ({ pageParam }) => fetchDriversDebtors({ pageParam }), {

		getNextPageParam : (lastPage, allPages) => {

			return lastPage.length > 0 ? allPages.flat().length : undefined;
		},

		select : (data) => data.pages.flat(),

		...config
	});
}