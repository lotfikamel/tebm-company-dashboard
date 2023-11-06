import React from "react";

import { useParams } from "react-router-dom";

import { useDriverRatingsQuery } from "../../Queries/DriversQueries";

import { DataLoader } from "../../Components/Loaders";

import { FetchErrorAlert } from "../../Components/Alerts";

import GridList from "../../Components/GridList";

import Rating from "./Rating";

const DriverRatingsPage = () => {

	const { driverId } = useParams();

	const { data : ratings, isLoading, isError, refetch, hasNextPage, fetchNextPage, isFetchingNextPage } = useDriverRatingsQuery({

		driverId
	});

	return (

		<div id="driver-ratings-page">

			{ isLoading && <DataLoader/> }

			{ !isLoading && isError && <FetchErrorAlert tryAgain={refetch}/> }

			{ !isLoading && !isError && (

				<div>

					<h3 className="mb-4">Avis & notes</h3>

					<GridList

						data={ratings}
						renderElements={review => (
							
							<Rating key={review._id} review={review}/>
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

export default DriverRatingsPage;