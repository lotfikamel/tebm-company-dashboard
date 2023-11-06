import React from 'react';

import AuthGuard from '../Guards/AuthGuard';

const DriverPayDebtsPage = React.lazy(() => import('../Pages/Revenues/DriverPayDebtsPage'));

const CompanyPayDebtsPage = React.lazy(() => import('../Pages/Revenues/CompanyPayDebtsPage'));

export default [

	{
		path : '/revenues/driver-pay-debts/:driverId',
		element : <AuthGuard element={<DriverPayDebtsPage/>} required={true}/>
	},

	{
		path : '/revenues/company-pay-debts/:companyId',
		element : <AuthGuard element={<CompanyPayDebtsPage/>} required={true}/>
	}
];