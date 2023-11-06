import axios from 'axios';

import { APP_KEY, URL } from '../../Constants/Constants';

const Http = axios.create({

	baseURL : URL,
	headers : {

		'X-Requested-With' : 'XMLHttpRequest',
		'App-Key' : APP_KEY
	},
	withCredentials : true
});

export default Http;