import { useQuery } from "react-query";

import Http from '../System/Http/Http';

const ROUTES = {

	fetchCompanyProfile : '/fetch/profile'
}

function fetchCompanyProfile () {

	return new Promise((resolve, reject) => {

		Http.get(ROUTES.fetchCompanyProfile).then(response => {

			return resolve(response.data.response[0]);
		}).catch(err => {

			return reject(err);
		})
	});
}

export const useCompanyProfileQuery = (config) => {

	return useQuery(['companyProfile'], fetchCompanyProfile, {

		...config
	});
}