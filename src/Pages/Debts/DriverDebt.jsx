import React from "react";

import { ArrowRight } from "react-feather";

import { Link } from "react-router-dom";

import moment from 'moment';

import { formatDriverPayLink, formatFullName, formatPrice } from "../../ComponentsUtilities/ComponentsUtilities";

const DriverDebt = ({ debt }) => {

	const payLink = formatDriverPayLink({

		driverId : debt._id,
		startDate : debt.startDate,
		endDate : debt.endDate
	})

	return (

		<tr>

			<td>

				<div className="flex items-center space-x-2">

					<img src={debt.driver.photo.src} alt="" className="w-12 aspect-ratio-square rounded-full" />

					<div className="font-medium">{ formatFullName(debt.driver.firstName, debt.driver.lastName) }</div>

				</div>

			</td>

			<td>{ debt.totalRides }</td>

			<td>{ moment(debt.startDate).format('DD MMMM YYYY') }</td>

			<td>{ moment(debt.endDate).format('DD MMMM YYYY') }</td>

			<td className="text-red-500 font-semibold">{ formatPrice(debt.totalDebts) }</td>

			<td className="space-y-2">

				<div>

					<Link to={payLink} className="btn btn-sm btn-primary space-x-2">

						<span>régler</span>

						<ArrowRight size={16}/>

					</Link>

				</div>

				<div>

					<Link to={`/drivers/profile/${debt._id}/debts`} className="flex items-center space-x-2 link">

						<span>détails</span>

						<ArrowRight size={16}/>

					</Link>

				</div>

			</td>

		</tr>
	)
}

export default React.memo(DriverDebt);