import React from 'react';

import AuthGuard from '../Guards/AuthGuard';

const RevenuesPage = React.lazy(() => import('../Pages/Revenues/RevenuesPage'));

const DriverPayDebtsPage = React.lazy(() => import('../Pages/Revenues/DriverPayDebtsPage'));

export default [

	{
		path : '/revenues',
		element : <AuthGuard element={<RevenuesPage/>} required={true}/>
	},

	{
		path : '/revenues/driver-pay-debts/:driverId',
		element : <AuthGuard element={<DriverPayDebtsPage/>} required={true}/>
	}
];