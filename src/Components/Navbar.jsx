import { Link } from 'react-router-dom';

import Logo from '../Assets/logo.png';

const Navbar = () => {

	return (

		<div className="navbar bg-white w-full border-solid border-b border-slate-200 print:hidden">

			<div className="container mx-auto px-4">

				<div className="flex-none">

					<label htmlFor="main-drawer" className="btn btn-square btn-ghost">

						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
					
					</label>

				</div>

				<div className="flex flex-1 px-4">

					<div className="avatar">

						<div className="w-16 rounded-md">

							<Link to="/">

								<img src={Logo} />

							</Link>

						</div>

					</div>

				</div>

			</div>

		</div>
	);
}

export default Navbar;