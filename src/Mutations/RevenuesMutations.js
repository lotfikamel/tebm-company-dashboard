import { useMutation } from 'react-query';

import Http from '../System/Http/Http';

const ROUTES = {

	driverPayDebts : '/actions/revenues/driver/pay'
}

function driverPayDebts ({ driverId, startDate, endDate }) {

	return new Promise((resolve, reject) => {

		Http.post(ROUTES.driverPayDebts, {

			driverId,
			startDate,
			endDate
		}).then(() => {

			return resolve();
		}).catch(err => {

			return reject(err);
		})
	});
}

export const useDriverPayDebtsMutation = () => {

	return useMutation(driverPayDebts);
}