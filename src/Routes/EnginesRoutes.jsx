import React from 'react';

import AuthGuard from '../Guards/AuthGuard';

const EnginesPage = React.lazy(() => import('../Pages/Engines/EnginesPage'));

const AddEnginePage = React.lazy(() => import('../Pages/Engines/AddEnginePage'));

const UpdateEnginePage = React.lazy(() => import('../Pages/Engines/UpdateEnginePage'));

const EngineDetailsPage = React.lazy(() => import('../Pages/Engines/EngineDetailsPage'));

const EngineTransportRidesPage = React.lazy(() => import('../Pages/Engines/EngineTransportRidesPage'));

export default [

	{
		path : '/engines',
		element : <AuthGuard element={<EnginesPage/>} required={true}/>
	},

	{
		path : '/engines/add',
		element : <AuthGuard element={<AddEnginePage/>} required={true}/>
	},

	{
		path : '/engines/update/:engineId',
		element : <AuthGuard element={<UpdateEnginePage/>} required={true}/>
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