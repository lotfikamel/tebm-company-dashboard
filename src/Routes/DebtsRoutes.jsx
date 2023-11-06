import React from 'react';

import AuthGuard from '../Guards/AuthGuard';

const DebtsPage = React.lazy(() => import('../Pages/Debts/DebtsPage'));

const DriversDebtorsPage = React.lazy(() => import('../Pages/Debts/DriversDebtorsPage'));

const CompaniesDebtorsPage = React.lazy(() => import('../Pages/Debts/CompaniesDebtorsPage'));

export default [

	{
		path : '/debts',
		element : <AuthGuard element={<DebtsPage/>} required={true}/>,
		children : [

			{
				path : '',
				element : <CompaniesDebtorsPage/>
			},

			{
				path : 'drivers',
				element : <DriversDebtorsPage/>
			},
		]
	}
];