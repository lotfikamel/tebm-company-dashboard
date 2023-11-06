import React, { Suspense } from 'react';

import Router from './Routes/Router';

import useAuthStore from './Store/useAuthStore';

import useRestoreScroll from './Hooks/useRestoreScroll';

import Navbar from './Components/Navbar';

import Drawer from './Components/Drawer';

import { FullPageLoader } from './Components/Loaders';

import { ConfirmAlert } from './Components/Alerts';

import ImageLightbox from './Components/ImageLightbox';

const App = () => {

	const { isLoggedIn, logout } = useAuthStore(state => state);

	useRestoreScroll();

	return (
		
		<Suspense fallback={<FullPageLoader/>}>

			<div className="drawer">

				<input id="main-drawer" type="checkbox" className="drawer-toggle"/>

				<div id="scroller" className="drawer-content">

					<div className="flex flex-col min-h-screen break-words bg-base-100">

						{ isLoggedIn && <Navbar/> }

						<main className="flex-1 my-8 print:my-0">

							<Router/>

						</main>

					</div>

				</div>

				{ isLoggedIn && (

					<>

						<Drawer/>
					
						<ConfirmAlert

							modalId="logout-alert"
							title="Déconnexion"
							text="êtes-vous sûr de vouloir vous déconnecter ?"
							onConfirm={logout}
						/>

					</>
				) }

				{ /** Toast place holder  */ }
				<div id="toast-top-placeholder" className="toast toast-top toast-end right-3"></div>

				<ImageLightbox/>

			</div>

		</Suspense>
	)
}

export default App;