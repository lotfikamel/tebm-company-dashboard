import React from "react";

import { useParams } from "react-router-dom";

import { useTransportRidesQuery } from "../../Queries/TransportRidesQueries";

import { DataLoader } from "../../Components/Loaders";

import { FetchErrorAlert } from "../../Components/Alerts";

import GridList from "../../Components/GridList";

import TransportRide from "../TransportRides/TransportRide";

const EngineTransportRidesPage = () => {

	const { engineId } = useParams();

	const { data : rides, isLoading, isError, refetch, hasNextPage, fetchNextPage, isFetchingNextPage } = useTransportRidesQuery({

		filters : {

			engine : engineId
		}
	});

	return (

		<div id="engine-transport-rides-page">

			{ isLoading && <DataLoader/> }

			{ !isLoading && isError && <FetchErrorAlert tryAgain={refetch}/> }

			{ !isLoading && !isError && (

				<div>

					<h3 className="mb-4">Courses</h3>

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

			) }

		</div>
	)
}

export default EngineTransportRidesPage;