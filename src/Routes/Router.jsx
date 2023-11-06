import React from 'react';

import { useRoutes } from 'react-router-dom';

import AuthGuard from '../Guards/AuthGuard';

import UnAuthGuard from '../Guards/UnAuthGuard';

const ProfilePage = React.lazy(() => import('../Pages/Profile/ProfilePage'));

const LoginPage = React.lazy(() => import('../Pages/Login/LoginPage'));

const Logout = React.lazy(() => import('../Pages/Logout/LogoutPage'));

const NotFoundPage = React.lazy(() => import('../Pages/NotFound/NotFoundPage'));

import DriversRoutes from './DriversRoutes';

const Router = () => {

	const routes = useRoutes([

		{
			path : '/',
			element : <AuthGuard element={<ProfilePage/>} required={true}/>
		},

		{
			path : '/login',
			element : <UnAuthGuard element={<LoginPage/>}/>
		},

		{
			path : '/logout',
			element : <AuthGuard element={<Logout/>} required={true}/>
		},

		...DriversRoutes,

		{
			path : '*',
			element : <NotFoundPage/>
		}
	])

	return routes;
}

export default Router;