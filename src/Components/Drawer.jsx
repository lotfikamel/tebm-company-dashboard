import React from 'react';

import moment from 'moment';

import { NavLink, useLocation } from "react-router-dom";

import useAuthStore from '../Store/useAuthStore';

import { DollarSign, Home, LogOut, Settings, Shield, Truck, User, Users } from "react-feather";

import MaterialSymbolIcon from './MaterialSymbolIcon';

import { closeDrawer, modalAction } from '../ComponentsUtilities/ComponentsUtilities';

import { APP_NAME } from '../Constants/Constants';

import Logo from '../Assets/logo.png';

const Drawer = () => {

	const user = useAuthStore(state => state.user);

	const location = useLocation();

	React.useEffect(() => {

		closeDrawer("main-drawer");
	}, [location])

	return (

		<div className="drawer-side border-solid border-r border-slate-200 scollbar-hidden lg:custom-scrollbar">

			<label htmlFor="main-drawer" className="drawer-overlay"></label>

			<ul className="menu p-4 w-72 lg:w-72 xl:w-80 bg-base-100 text-base-content">

				<div className="flex justify-center">

					<img src={Logo} alt={APP_NAME} className="w-32 h-32 rounded-full"/>

				</div>

				<div className="text-center my-4 space-y-1">

					<div className="text-xl font-medium">{ user.name }</div>

					<div className="text-stone-400 first-letter:uppercase">admin depuis { moment(user.creationDate).format('DD MMMM YYYY') }</div>

				</div>

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

					<NavLink to="/companies" className="font-medium">

						<MaterialSymbolIcon name="emoji_transportation" size={25}/>

						Entreprises de transport

					</NavLink>

				</li>

				<li>

					<NavLink to="/rides" className="font-medium">

						<MaterialSymbolIcon name="near_me" size={25}/>

						Courses de transport

					</NavLink>

				</li>

				<li>

					<NavLink to="/users" className="font-medium">

						<User size={23}/>

						Utilisateurs

					</NavLink>

				</li>

				<li>

					<NavLink to="/debts" className="font-medium">

						<DollarSign size={23}/>

						Dettes

					</NavLink>

				</li>

				<li>

					<NavLink to="/admins" className="font-medium">

						<Shield size={23}/>

						Administrateurs

					</NavLink>

				</li>

				<li>

					<NavLink to="/settings" className="font-medium">

						<Settings size={23}/>

						Paramètres

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