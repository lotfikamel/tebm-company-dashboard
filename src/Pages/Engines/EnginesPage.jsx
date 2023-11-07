import React from "react";

import { Link } from "react-router-dom";

import { Plus } from "react-feather";

import useEnginesStore from '../../Store/useEnginesStore';

import { useEngineTypesQuery, useEnginesQuery } from "../../Queries/EnginesQueries";

import { DataLoader } from "../../Components/Loaders";

import { FetchErrorAlert } from "../../Components/Alerts";

import Engine from "./Engine";

import GridList from "../../Components/GridList";

import LicencePlateSearch from "./LicencePlateSearch";

import { formatEngineOwnershipType, formatEngineStatus } from "../../ComponentsUtilities/ComponentsUtilities";

import { ENGINE_STATUS } from "../../Constants/Constants";

const EnginesPage = () => {

	const { filters, setFilter } = useEnginesStore();

	const [ localFilters, setLocalFilters ] = React.useState({ ...filters });

	const { data : engineTypes } = useEngineTypesQuery();

	const { data : engines, isLoading, isError, refetch, hasNextPage, fetchNextPage, isFetchingNextPage } = useEnginesQuery({

		filters
	});

	const handleFilterChange = (e) => {

		setLocalFilters(prevFilters => ({

			...prevFilters,
			[e.target.name] : e.target.value.trim()
		}));
	}

	const applyFilters = () => {

		setFilter({ ...localFilters })
	}

	return (

		<div id="engines-page">

			<div className="container mx-auto px-4">

				<h1 className="font-bold first-letter:uppercase mb-8">gestion des engins</h1>

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

										data={engines}
										renderElements={engine => (
											
											<Engine key={engine._id} engine={engine}/>
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
											
											<select onChange={handleFilterChange} name="status" value={localFilters.status} className="select select-primary w-full">
													
												<option value="">tous</option>

												{ Object.values(ENGINE_STATUS).map(status => (

													<option key={status} value={status}>{ formatEngineStatus(status) }</option>
												)) }

											</select>
											
										</div>

										<div>

											<div className="mb-2 text-stone-500">type</div>
											
											<select onChange={handleFilterChange} name="engineType" value={localFilters.engineType} className="select select-primary w-full">
													
												<option value="">tous</option>

												{ engineTypes.map(type => (

													<option key={type._id} value={type._id}>{ type.name }</option>
												)) }

											</select>
											
										</div>

										<div>

											<div className="mb-2 text-stone-500">année</div>

											<input

												type="number"
												name="year"
												value={localFilters.year}
												onChange={handleFilterChange}
												className="input input-primary w-full"
												placeholder="Année example: 2016"
											/>

										</div>

										<div>
											
											<button onClick={applyFilters} className="btn btn-primary btn-block">appliquez</button>

										</div>

									</div>

									<LicencePlateSearch/>

								</div>

							</div>

						</div>

					) }

				</div>

			</div>

		</div>
	)
}

export default EnginesPage;