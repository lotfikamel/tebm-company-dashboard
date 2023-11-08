import React from "react";

import { useCompanyRevenuesQuery, useCompanyTotalRevenuesQuery } from "../../Queries/RevenuesQueries";

import { DataLoader } from "../../Components/Loaders";

import Revenue from "../../Components/Revenue";

import { FetchErrorAlert } from "../../Components/Alerts";

import GridList from "../../Components/GridList";

import { formatPrice, formatRevenueGroupBy } from "../../ComponentsUtilities/ComponentsUtilities";

import { REVENUES_GROUP_BY } from "../../Constants/Constants";

const Stat = ({ title, stat }) => {

	return (

		<div className="stats shadow">

			<div className="stat">

				<div className="stat-title">{ title }</div>

				<div className="stat-value text-green-500">{ stat }</div>

			</div>

		</div>
	)
}

const RevenuesStats = () => {

	const { data : total, isLoading, isError } = useCompanyTotalRevenuesQuery();

	if (isLoading || isError) {

		return null
	}

	return (

		<div>

			<Stat title="Total des revenus" stat={formatPrice(total)}/>

		</div>
	)
}

const RevenuesPage = () => {

	const [ filters, setFilters ] = React.useState({

		groupBy : REVENUES_GROUP_BY.DAYS
	});

	const { data : revenues, isLoading, isError, refetch, hasNextPage, fetchNextPage, isFetchingNextPage } = useCompanyRevenuesQuery({

		filters
	});

	const handleFilterChange = (e) => {

		setFilters(prevFilters => ({

			...prevFilters,
			[e.target.name] : e.target.value.trim()
		}))
	}

	return (

		<div id="revenues-page">

			<div className="container px-4 mx-auto">

				<h1 className="font-bold first-letter:uppercase mb-8">Revenus</h1>

				<hr className="my-6"/>

				{ isLoading && <DataLoader/> }

				{ !isLoading && isError && <FetchErrorAlert tryAgain={refetch}/> }

				{ !isLoading && !isError && (

					<div className="space-y-4">

						<RevenuesStats/>

						<div>

							<select name="groupBy" className="select select-bordered w-full" value={filters.groupBy} onChange={handleFilterChange}>

								{ Object.values(REVENUES_GROUP_BY).map(by => (

									<option key={by} value={by}>{ formatRevenueGroupBy(by) }</option>
								)) }
								
							</select>

						</div>

						<GridList

							data={revenues}
							renderElements={revenue => (
								
								<Revenue key={revenue._id} revenue={revenue} groupBy={filters.groupBy}/>
							)}
							fetchNextPage={fetchNextPage}
							isFetchingNextPage={isFetchingNextPage}
							hasNextPage={hasNextPage}
							className="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
						/>

					</div>

				) }

			</div>

		</div>
	)
}

export default RevenuesPage;