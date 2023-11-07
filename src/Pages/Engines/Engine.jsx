import React from "react";

import { Link } from "react-router-dom";

import moment from "moment";

import EngineActions from "./EngineActions";

import EngineStatus from "./EngineStatus";

const Engine = ({ engine }) => {

	const detailsLink = `/engines/details/${engine._id}`;

	return (

		<div className="shadow-lg p-4 bg-white rounded-lg cursor-pointer hover:ease-in-out hover:duration-200 hover:ring-2 hover:ring-offset-4 hover:ring-primary">

			<div className="flex mb-2">

				<div>

					<div className="font-medium">{ engine.name }</div>

					<div className="text-sm text-stone-400">{ moment(engine.creationDate).format('DD MMMM YYYY HH:mm') }</div>

				</div>

				<EngineActions engine={engine}/>

			</div>

			<Link to={detailsLink}>

				<div className="space-y-2">

					<div className="flex justify-between items-center">

						<div className="border-2 border-stone-300 py-1 px-2 rounded-lg inline-flex">{ engine.licencePlate }</div>

						<div className="text-blue text-lg">{ engine.year }</div>

					</div>

					<div className="-mx-4">

						<img src={engine.firstPhoto.src} alt="" className="aspect-ratio-square"/>

					</div>

					<div>{ engine.total.completedRides } transport terminés</div>

					<EngineStatus status={engine.status}/>

				</div>

			</Link>

		</div>
	)
}

export default React.memo(Engine)