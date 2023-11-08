import React from "react";

import { useCompanyDebtsQuery } from "../../Queries/RevenuesQueries";

import { DataLoader } from "../../Components/Loaders";

import Debt from "../../Components/Debt";

import { FetchErrorAlert } from "../../Components/Alerts";

import GridList from "../../Components/GridList";

import { formatRevenueGroupBy } from "../../ComponentsUtilities/ComponentsUtilities";

import { REVENUES_GROUP_BY } from "../../Constants/Constants";

const DebtsDetailsPage = () => {

	const [ filters, setFilters ] = React.useState({

		groupBy : REVENUES_GROUP_BY.DAYS
	});

	const { data : debts, isLoading, isError, refetch, hasNextPage, fetchNextPage, isFetchingNextPage } = useCompanyDebtsQuery({

		filters
	});

	const handleFilterChange = (e) => {

		setFilters(prevFilters => ({

			...prevFilters,
			[e.target.name] : e.target.value.trim()
		}))
	}

	return (

		<div id="debts-details-page">

			{ isLoading && <DataLoader/> }

			{ !isLoading && isError && <FetchErrorAlert tryAgain={refetch}/> }

			{ !isLoading && !isError && (

				<div className="space-y-4">

					<div>

						<select name="groupBy" className="select select-bordered w-full" value={filters.groupBy} onChange={handleFilterChange}>

							{ Object.values(REVENUES_GROUP_BY).map(by => (

								<option key={by} value={by}>{ formatRevenueGroupBy(by) }</option>
							)) }
							
						</select>

					</div>

					<GridList

						data={debts}
						renderElements={debt => (
							
							<Debt key={debt._id} debt={debt} groupBy={filters.groupBy}/>
						)}
						fetchNextPage={fetchNextPage}
						isFetchingNextPage={isFetchingNextPage}
						hasNextPage={hasNextPage}
						className="grid-cols-1 gap-4"
					/>

				</div>

			) }

		</div>
	)
}

export default DebtsDetailsPage;