import React from "react";

import moment from "moment";

import { Map, MapPin } from "react-feather";

import { Link } from "react-router-dom";

import TransportRideStatus from "./TransportRideStatus";

import { formatPrice } from "../../ComponentsUtilities/ComponentsUtilities";

const TransportRide = ({ ride }) => {

	return (

		<div className="bg-white p-4 cursor-pointer shadow-lg rounded-xl hover:ease-in-out hover:duration-200 hover:ring-2 hover:ring-offset-4 hover:ring-primary">

			<Link to={`/rides/details/${ride._id}`}>

				<div className="space-y-1">

					<div>					

						<div className="font-medium">{ ride._id }</div>

						<div className="text-stone-400">{ moment(ride.creationDate).format('DD MMMM YYYY HH:mm') }</div>

					</div>

					<div className="flex items-center">

						<div>

							<MapPin size={18}/>

						</div>

						<span className="ml-2">{ ride.originAddress }</span>

					</div>

					<div className="flex items-center">

						<div>

							<Map size={18}/>

						</div>

						<span className="ml-2">{ ride.destinationAddress }</span>

					</div>

					{ ride.price && <div className="font-semibold text-green-500">{ formatPrice(ride.price) }</div> }

					<TransportRideStatus status={ride.status}/>

				</div>

			</Link>

		</div>
	)
}

export default React.memo(TransportRide);