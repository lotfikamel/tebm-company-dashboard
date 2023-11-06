import React from 'react';

import ReactDOM from 'react-dom';

import { QueryClientProvider, QueryClient } from 'react-query';

import { ReactQueryDevtools } from 'react-query/devtools';

import { BrowserRouter } from 'react-router-dom';

import moment from 'moment';

import App from './App';

import 'moment/locale/fr';

import './index.css';

import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";

moment.locale('fr');

const queryClient = new QueryClient({

	defaultOptions : {

		queries : {

			refetchOnWindowFocus : false
		}
	}
});

ReactDOM.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
			<ReactQueryDevtools position="bottom-right"/>
		</QueryClientProvider>
	</React.StrictMode>,
	document.getElementById('root')
);