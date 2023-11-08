import React from "react";

import { useDriversDebtorsQuery } from "../../Queries/RevenuesQueries";

import { DataLoader } from "../../Components/Loaders";

import TableList from "../../Components/TableList";

import { FetchErrorAlert } from "../../Components/Alerts";

import DriverDebt from "./DriverDebt";

const DriverDebtsPage = () => {

	const { data : debts, isLoading, isError, refetch, hasNextPage, fetchNextPage, isFetchingNextPage } = useDriversDebtorsQuery();

	return (

		<div id="drivers-debtors-page">

			{ isLoading && <DataLoader/> }

			{ !isLoading && isError && <FetchErrorAlert tryAgain={refetch}/> }

			{ !isLoading && !isError && (

				<div>

					<div className="space-y-4">

						<TableList

							data={debts}
							renderElements={debt => (
								
								<DriverDebt key={debt._id} debt={debt}/>
							)}
							headers={['chauffeur', 'courses', 'du', 'au', 'total', 'actions']}
							fetchNextPage={fetchNextPage}
							isFetchingNextPage={isFetchingNextPage}
							hasNextPage={hasNextPage}
						/>

					</div>

				</div>

			) }

		</div>
	)
}

export default DriverDebtsPage;