import { Link } from "react-router-dom";

import { ExternalLink, MoreVertical } from "react-feather";

const EngineActions = ({ engine }) => {

	if (!engine.driverId) {

		return null;
	}

	return (

		<div>

			<div className="dropdown dropdown-bottom dropdown-left">

				<label tabIndex={0} className="cursor-pointer">

					<MoreVertical size={20}/>

				</label>

				<ul tabIndex={0} className="dropdown-content menu p-2 shadow-md bg-base-100 rounded-box w-60">

					<li>

						<Link to={`/drivers/profile/${engine.driverId}`}>

							<span><ExternalLink size={18}/></span>

							<span className="first-letter:uppercase">voir le chauffeur</span>

						</Link>

					</li>

				</ul>

			</div>

		</div>
	)
}

export default EngineActions;