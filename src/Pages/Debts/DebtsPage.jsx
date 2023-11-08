import React from "react";

import { NavLink, Outlet } from "react-router-dom";

import { useCompanyTotalDebtsQuery } from "../../Queries/RevenuesQueries";

import { formatPrice } from "../../ComponentsUtilities/ComponentsUtilities";
import classNames from "classnames";

const Stat = ({ title, stat }) => {

	return (

		<div className="stats shadow">

			<div className="stat">

				<div className="stat-title">{ title }</div>

				<div className="stat-value text-red-500">{ stat }</div>

			</div>

		</div>
	)
}

const DebtsStats = () => {

	const { data : total, isLoading, isError } = useCompanyTotalDebtsQuery({});

	if (isLoading || isError) {

		return null
	}

	return (

		<div>

			<Stat title="Total des dettes" stat={formatPrice(total)}/>

		</div>
	)
}

const DebtsPage = () => {

	return (

		<div id="debts-page">

			<div className="container px-4 mx-auto">

				<h1 className="font-bold first-letter:uppercase">Dettes</h1>

				<hr className="my-6"/>

				<div className="space-y-6">

					<DebtsStats/>

					<hr className="my-6"/>

					<div className="tabs">

						<NavLink

							to=""
							end
							className={({ isActive }) => classNames("tab flex-1 tab-lg tab-lifted", { "tab-active" : isActive })}
						>

							Détails

						</NavLink>

						<NavLink

							to="drivers"
							end
							className={({ isActive }) => classNames("tab flex-1 tab-lg tab-lifted", { "tab-active" : isActive })}
						>

							Chauffeurs

						</NavLink>

					</div>

					<Outlet/>

				</div>

			</div>

		</div>
	)
}

export default DebtsPage;