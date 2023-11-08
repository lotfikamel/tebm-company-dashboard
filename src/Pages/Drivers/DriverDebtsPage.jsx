import React from "react";

import { useParams } from "react-router-dom";

import { useDriverDebtsQuery, useDriverTotalDebtsQuery } from "../../Queries/RevenuesQueries";

import { DataLoader } from "../../Components/Loaders";

import Debt from "../../Components/Debt";

import { FetchErrorAlert } from "../../Components/Alerts";

import GridList from "../../Components/GridList";

import { formatDriverPayLink, formatPrice } from "../../ComponentsUtilities/ComponentsUtilities";

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

const DebtsStats = ({ driverId }) => {

	const { data : total, isLoading, isError } = useDriverTotalDebtsQuery({

		driverId
	});

	if (isLoading || isError) {

		return null
	}

	return (

		<div>

			<Stat title="Total des dettes" stat={formatPrice(total)}/>

		</div>
	)
}

const DriverDebtsPage = () => {

	const { driverId } = useParams();

	const { data : debts = [], isLoading, isError, refetch, hasNextPage, fetchNextPage, isFetchingNextPage } = useDriverDebtsQuery({

		driverId
	});

	const formatPayLink = (debt) => {

		return formatDriverPayLink({

			driverId,
			startDate : debt.creationDate,
			endDate : debt.creationDate
		});
	}


	return (

		<div id="driver-debts-page">

			{ isLoading && <DataLoader/> }

			{ !isLoading && isError && <FetchErrorAlert tryAgain={refetch}/> }

			{ !isLoading && !isError && (

				<div>

					<h3 className="mb-4">Dettes</h3>

					<div className="space-y-4">

						<DebtsStats driverId={driverId}/>

						<GridList

							data={debts}
							renderElements={debt => (
								
								<Debt key={debt._id} debt={debt} payLink={formatPayLink(debt)}/>
							)}
							fetchNextPage={fetchNextPage}
							isFetchingNextPage={isFetchingNextPage}
							hasNextPage={hasNextPage}
							className="grid-cols-1 gap-4"
						/>

					</div>

				</div>

			) }

		</div>
	)
}

export default DriverDebtsPage;