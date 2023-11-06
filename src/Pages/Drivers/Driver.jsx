import React from "react";

import moment from "moment";

import { Link } from "react-router-dom";

import { Star } from "react-feather";

import usePermissions from "../../Hooks/usePermissions";

import DriverActions from "./DriverActions";

import DriverStatus from "./DriverStatus";

import Image from "../../Components/Image";

import { formatCodeId, formatFullName } from "../../ComponentsUtilities/ComponentsUtilities";

const Driver = ({ driver }) => {

	const profileLink = `/drivers/profile/${driver._id}`;

	const { isDriverInactive } = usePermissions();

	return (

		<div className="bg-white p-4 cursor-pointer shadow-lg rounded-xl hover:ease-in-out hover:duration-200 hover:ring-2 hover:ring-offset-4 hover:ring-primary">

			<div className="flex mb-2">

				<div className="flex flex-1">

					<Image src={driver.photo.src} className="w-12 h-12 rounded-full" />

					<div className="ml-2">

						<div className="font-medium">{ formatFullName(driver.firstName, driver.lastName) }</div>

						<div className="text-sm text-stone-400">{ moment(driver.creationDate).format('DD MMMM YYYY HH:mm') }</div>

					</div>

				</div>

				{ !isDriverInactive(driver) && <DriverActions driver={driver}/> }

			</div>

			<Link to={profileLink}>

				<div className="mb-2">

					<div>{ formatCodeId(driver._id) }</div>

					<div className="text-stone-500">{ driver.phone }</div>

					<div className="flex items-center">

						<Star size={20} className="text-amber-500"/>

						<span className="ml-1 text-stone-500">{ driver.total.rating } ({ driver.total.reviews } avis)</span>

					</div>

					<div className="text-stone-500">{ driver.total.completedRides } transport terminés</div>

				</div>

				<DriverStatus status={driver.status}/>

			</Link>

		</div>
	)
}

export default React.memo(Driver);