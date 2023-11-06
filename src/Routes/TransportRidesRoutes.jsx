import React from 'react';

import AuthGuard from '../Guards/AuthGuard';

const TransportRidesPage = React.lazy(() => import('../Pages/TransportRides/TransportRidesPage'));

const TransportRideDetails = React.lazy(() => import('../Pages/TransportRides/TransportRideDetailsPage'))

export default [

	{
		path : '/rides',
		element : <AuthGuard element={<TransportRidesPage/>} required={true}/>
	},

	{
		path : '/rides/details/:rideId',
		element : <AuthGuard element={<TransportRideDetails/>} required={true}/>
	},
];