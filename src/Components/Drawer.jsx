import React from 'react';

import moment from 'moment';

import { NavLink, useLocation } from "react-router-dom";

import { useCompanyProfileQuery } from '../Queries/ProfileQueries';

import { DollarSign, Home, LogOut, Truck, Users } from "react-feather";

import MaterialSymbolIcon from './MaterialSymbolIcon';

import { closeDrawer, modalAction } from '../ComponentsUtilities/ComponentsUtilities';

const Drawer = () => {

	const { data : profile } = useCompanyProfileQuery({

		refetchOnMount : false
	});

	const location = useLocation();

	React.useEffect(() => {

		closeDrawer("main-drawer");
	}, [location])

	return (

		<div className="drawer-side border-solid border-r border-slate-200 scollbar-hidden lg:custom-scrollbar">

			<label htmlFor="main-drawer" className="drawer-overlay"></label>

			<ul className="menu p-4 w-72 lg:w-72 xl:w-80 bg-base-100 text-base-content">

				{ profile && (

					<div className="space-y-2 mb-6">

						<div className="flex justify-center">

							<img src={profile.photo.src} alt={profile.name} className="w-24 h-24 rounded-full"/>

						</div>

						<div className="text-center my-4 space-y-1">

							<div className="text-xl font-medium">{ profile.name }</div>

							<div className="text-stone-400 first-letter:uppercase">depuis { moment(profile.creationDate).format('DD MMMM YYYY') }</div>

						</div>

					</div>

				) }

				<li>

					<NavLink to="/" className="font-medium">

						<Home size={23}/>

						Accueil

					</NavLink>

				</li>

				<li>

					<NavLink to="/drivers" className="font-medium">

						<Users size={23}/>

						Chauffeurs

					</NavLink>

				</li>

				<li>

					<NavLink to="/engines" className="font-medium">

						<Truck size={23}/>

						Engins

					</NavLink>

				</li>

				<li>

					<NavLink to="/rides" className="font-medium">

						<MaterialSymbolIcon name="near_me" size={25}/>

						Courses de transport

					</NavLink>

				</li>

				<li>

					<NavLink to="/revenues" className="font-medium">

						<MaterialSymbolIcon name="payments"/>

						Revenus

					</NavLink>

				</li>

				<li>

					<NavLink to="/debts" className="font-medium">

						<DollarSign size={23}/>

						Dettes

					</NavLink>

				</li>

				<div className="divider m-0"></div>

				<li>

					<div onClick={() => modalAction('logout-alert', 'open')} className="font-medium">

						<LogOut size={23}/>

						Déconnexion

					</div>

				</li>

			</ul>
			
		</div>
	)
}

export default Drawer;