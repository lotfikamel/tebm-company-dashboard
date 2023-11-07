import React from 'react';

import AuthGuard from '../Guards/AuthGuard';

const EnginesPage = React.lazy(() => import('../Pages/Engines/EnginesPage'));

const EngineDetailsPage = React.lazy(() => import('../Pages/Engines/EngineDetailsPage'));

const EngineTransportRidesPage = React.lazy(() => import('../Pages/Engines/EngineTransportRidesPage'));

export default [

	{
		path : '/engines',
		element : <AuthGuard element={<EnginesPage/>} required={true}/>
	},

	{
		path : '/engines/details/:engineId',
		element : <AuthGuard element={<EngineDetailsPage/>} required={true}/>,
		children : [

			{
				path : '',
				index : true,
				element : <EngineTransportRidesPage/>
			}
		]
	},
];