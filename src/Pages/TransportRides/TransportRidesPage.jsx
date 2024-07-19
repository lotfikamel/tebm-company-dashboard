import React from "react";

import useTransportRidesStore from '../../Store/useTransportRidesStore';

import { useTransportRidesQuery } from "../../Queries/TransportRidesQueries";

import { useEngineTypesQuery } from "../../Queries/EnginesQueries";

import Search from "./Search";

import { DataLoader } from "../../Components/Loaders";

import { FetchErrorAlert } from "../../Components/Alerts";

import TransportRide from "./TransportRide";

import TransportRidesStats from "./TransportRidesStats";

import GridList from "../../Components/GridList";

import { formatTransportRideStatus, getPermittedTransportRidesStatus } from "../../ComponentsUtilities/ComponentsUtilities";

const TransportRidesPage = () => {

	const STATUS = getPermittedTransportRidesStatus();

	const { filters, setFilter } = useTransportRidesStore();

	const { data : engineTypes = [] } = useEngineTypesQuery();

	const { data : rides = [], isLoading, isError, refetch, hasNextPage, fetchNextPage, isFetchingNextPage } = useTransportRidesQuery({

		filters
	});

	const handleFilterChange = (e) => {

		setFilter({

			[e.target.name] : e.target.value.trim()
		});
	}

	return (

		<div id="rides-page">

			<div className="container mx-auto px-4">

				<h1 className="font-bold first-letter:uppercase mb-8">gestion des courses de transport</h1>

				<TransportRidesStats/>

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

										data={rides}
										renderElements={ride => (
											
											<TransportRide key={ride._id} ride={ride}/>
										)}
										fetchNextPage={fetchNextPage}
										isFetchingNextPage={isFetchingNextPage}
										hasNextPage={hasNextPage}
										className="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
									/>

								</div>

								<div className="col-span-3 space-y-4">

									<div className="bg-white shadow-lg rounded-xl p-6 space-y-4">

										<h3 className="first-letter:uppercase font-medium">filtres</h3>

										<div>

											<div className="mb-2 text-stone-500">statut</div>
											
											<select onChange={handleFilterChange} name="status" value={filters.status} className="select select-primary w-full">
													
												<option value="">tous</option>

												{ Object.values(STATUS).map(status => (

													<option key={status} value={status}>{ formatTransportRideStatus(status) }</option>
												)) }

											</select>
											
										</div>

										<div>

											<div className="mb-2 text-stone-500">type d'véhicule</div>
											
											<select onChange={handleFilterChange} name="engineType" value={filters.engineType} className="select select-primary w-full">
													
												<option value="">tous</option>

												{ engineTypes.map(type => (

													<option key={type._id} value={type._id}>{ type.name }</option>
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

export default TransportRidesPage;