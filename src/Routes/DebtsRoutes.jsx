import React from 'react';

import AuthGuard from '../Guards/AuthGuard';

const DebtsPage = React.lazy(() => import('../Pages/Debts/DebtsPage'));

const DebtsDetailsPage = React.lazy(() => import('../Pages/Debts/DebtsDetailsPage'));

const DriversDebtorsPage = React.lazy(() => import('../Pages/Debts/DriversDebtorsPage'));

export default [

	{
		path : '/debts',
		element : <AuthGuard element={<DebtsPage/>} required={true}/>,
		children : [

			{
				path : '',
				index : true,
				element : <DebtsDetailsPage/>
			},

			{
				path : 'drivers',
				element : <DriversDebtorsPage/>
			}
		]
	}
];