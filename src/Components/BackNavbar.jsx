import { Link, useNavigate } from 'react-router-dom';

import { ArrowLeft } from 'react-feather';

const BackNavbar = ({ title, route }) => {

	const navigate = useNavigate();

	return (

		<div className="navbar bg-white">

			<div className="flex-none">

				{ route ? (

					<Link to={route} className="btn btn-square btn-ghost">

						<ArrowLeft size={25}/>

					</Link>
				) : (

					<button onClick={() => navigate(-1)} className="btn btn-square btn-ghost">

						<ArrowLeft size={25}/>

					</button>
				) }

			</div>

			<div className="flex-1">

				<div className="first-letter:uppercase font-semibold text-xl">{ title || 'retour' }</div>

			</div>

		</div>
	);
}

export default BackNavbar;