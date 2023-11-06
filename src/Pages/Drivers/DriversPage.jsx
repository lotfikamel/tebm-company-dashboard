import React from "react";

import useDriversStore from '../../Store/useDriversStore';

import { useDriversQuery } from "../../Queries/DriversQueries";

import { DataLoader } from "../../Components/Loaders";

import { FetchErrorAlert } from "../../Components/Alerts";

import Search from "./Search";

import Driver from "./Driver";

import GridList from "../../Components/GridList";

import { DRIVER_ACCOUNT_STATUS } from "../../Constants/Constants";

import { formatDriverAccountStatus } from "../../ComponentsUtilities/ComponentsUtilities";

const DriversPage = () => {

	const { filters, setFilter } = useDriversStore();

	const { data : drivers, isLoading, isError, refetch, hasNextPage, fetchNextPage, isFetchingNextPage } = useDriversQuery({

		filters
	});

	const handleFilterChange = (e) => {

		setFilter({

			[e.target.name] : e.target.value.trim()
		});
	}

	return (

		<div id="drivers-page">

			<div className="container mx-auto px-4">

				<h1 className="font-bold first-letter:uppercase mb-8">gestion des chauffeurs</h1>

				<hr className="my-6"/>

				<div>

					{ isLoading && <DataLoader/> }

					{ !isLoading && isError && <FetchErrorAlert tryAgain={refetch}/> }

					{ !isLoading && !isError && (

						<div>

							<div className="grid grid-cols-12 gap-6">

								<div className="col-span-9">

									<h2 className="font-semibold mb-4 first-letter:uppercase">liste</h2>

									<GridList

										data={drivers}
										renderElements={driver => (
											
											<Driver key={driver._id} driver={driver}/>
										)}
										fetchNextPage={fetchNextPage}
										isFetchingNextPage={isFetchingNextPage}
										hasNextPage={hasNextPage}
										className="grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4"
									/>

								</div>

								<div className="col-span-3 space-y-4">

									<div className="bg-white shadow-lg rounded-xl p-6 space-y-4">

										<h3 className="first-letter:uppercase font-medium">filtres</h3>

										<div>

											<div className="mb-2 text-stone-500">statut</div>
											
											<select onChange={handleFilterChange} name="status" value={filters.status} className="select select-primary w-full">
													
												<option value="">tous</option>

												{ Object.values(DRIVER_ACCOUNT_STATUS).map(status => (

													<option key={status} value={status}>{ formatDriverAccountStatus(status) }</option>
												)) }

											</select>
											
										</div>

									</div>

									<Search/>

								</div>

							</div>

						</div>

					) }

				</div>

			</div>

		</div>
	)
}

export default DriversPage;