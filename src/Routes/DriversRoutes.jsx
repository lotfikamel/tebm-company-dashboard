import React from 'react';

import AuthGuard from '../Guards/AuthGuard';

const DriversPage = React.lazy(() => import('../Pages/Drivers/DriversPage'));

const DriverProfilePage = React.lazy(() => import('../Pages/Drivers/DriverProfilePage'));

const DriverTransportRidesPage = React.lazy(() => import('../Pages/Drivers/DriverTransportRidesPage'));

const DriverDebtsPage = React.lazy(() => import('../Pages/Drivers/DriverDebtsPage'));

const DriverRatingsPage = React.lazy(() => import('../Pages/Drivers/DriverRatingsPage'));

export default [

	{
		path : '/drivers',
		element : <AuthGuard element={<DriversPage/>} required={true}/>
	},

	{
		path : '/drivers/profile/:driverId',
		element : <AuthGuard element={<DriverProfilePage/>} required={true}/>,
		children : [

			{
				path : '',
				index : true,
				element : <DriverTransportRidesPage/>
			},

			{
				path : 'debts',
				element : <DriverDebtsPage/>
			},

			{
				path : 'reviews',
				element : <DriverRatingsPage/>
			}
		]
	},
];