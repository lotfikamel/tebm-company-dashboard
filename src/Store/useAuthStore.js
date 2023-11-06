import { create } from 'zustand';

import jwtDecode from 'jwt-decode';

import Http from '../System/Http/Http';

import useScrollPositionStore from './useScrollPositionStore';

import useDriversStore from './useDriversStore';

import useEnginesStore from './useEnginesStore';

const initState = {

	sending : false,

	/**
	* User Login Status
	* 
	*/
	isLoggedIn : false,

	/**
	*  User data
	*/
	user : null,
}

const useAuthStore = create((set, get) => ({

	...initState,

	updateSending : (payload) => set({ sending : payload }),

	setUser : (user) => set({ isLoggedIn : true, user }),

	reset : () => set(initState),

	login : (data) => {

		return new Promise((resolve, reject) => {

			get().updateSending(true);

			Http.post('/login', {

				...data
			}).then(response => {

				get().updateSending(false);

				if ('errors' in response.data) {

					return reject(response.data.errors);
				}

				window.localStorage.setItem('_at', response.data._at);

				get().reset();

				get().setAuthData();

				return resolve();
			}).catch(err => {

				console.log(err);

				get().updateSending(false);

				return reject({

					login : 'error'
				});
			});
		});
	},

	setAuthData : (params = {}) => {

		const _at = window.localStorage.getItem('_at');

		if (params.updateAuthToken === true || (get().isLoggedIn === false && _at)) {

			try {

				const decodedData = jwtDecode(_at);

				Http.defaults.headers.common['Authorization'] = `Bearer ${_at}`;

				get().setUser(decodedData);
				
			} catch (err) {

				console.log(err);
			}
		}
	},

	logout : () => {

		window.localStorage.removeItem('_at');

		delete Http.defaults.headers.common['Authorization'];

		useScrollPositionStore.getState().reset();

		useDriversStore.getState().reset();

		useEnginesStore.getState().reset();

		get().reset();
	}
}));

export default useAuthStore;