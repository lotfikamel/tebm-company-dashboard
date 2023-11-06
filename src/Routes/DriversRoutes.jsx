import React from 'react';

import AuthGuard from '../Guards/AuthGuard';

const AddDriverPage = React.lazy(() => import('../Pages/Drivers/AddDriverPage'));

const UpdateDriverPage = React.lazy(() => import('../Pages/Drivers/UpdateDriverPage'));

const DriversPage = React.lazy(() => import('../Pages/Drivers/DriversPage'));

const DriverProfilePage = React.lazy(() => import('../Pages/Drivers/DriverProfilePage'));

const DriverTransportRidesPage = React.lazy(() => import('../Pages/Drivers/DriverTransportRidesPage'));

const DriverRevenuesPage = React.lazy(() => import('../Pages/Drivers/DriverRevenuesPage'));

const DriverDebtsPage = React.lazy(() => import('../Pages/Drivers/DriverDebtsPage'));

const DriverRatingsPage = React.lazy(() => import('../Pages/Drivers/DriverRatingsPage'));

export default [

	{
		path : '/drivers/add',
		element : <AuthGuard element={<AddDriverPage/>} required={true}/>
	},

	{
		path : '/drivers/update/:driverId',
		element : <AuthGuard element={<UpdateDriverPage/>} required={true}/>
	},

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
				path : 'revenues',
				element : <DriverRevenuesPage/>
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