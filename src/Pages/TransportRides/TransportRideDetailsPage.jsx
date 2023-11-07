import { Link, useParams } from "react-router-dom";

import moment from 'moment';

import { ExternalLink, Map, MapPin, Navigation } from "react-feather";

import { useTransportRideDetailsQuery } from "../../Queries/TransportRidesQueries";

import { FetchErrorAlert } from "../../Components/Alerts";

import { DataLoader } from "../../Components/Loaders";

import TransportRideStatus from "./TransportRideStatus";

import RevenuesStatus from "./RevenuesStatus";

import FiveStarsRating from "../../Components/FiveStarsRating";

import { formatDistance, formatFullName, formatPrice, formatTime, openDirectionInMap } from "../../ComponentsUtilities/ComponentsUtilities";

const TransportRideDetailsPage = () => {

	const { rideId } = useParams();

	const { data : ride, isLoading, isError, refetch } = useTransportRideDetailsQuery({

		rideId
	});

	const openMap = () => {

		return openDirectionInMap({

			origin : ride.origin.coordinates,
			destination : ride.destination.coordinates
		});
	}

	return (

		<div id="transport-ride-details">

			<div className="container mx-auto px-4">

				{ isLoading && <DataLoader/> }

				{ !isLoading && isError && <FetchErrorAlert tryAgain={refetch}/> }

				{ !isLoading && !isError && ride && (

					<div className="space-y-6">

						<div className="space-y-1">

							<h1 className="font-bold">Course <span className="text-primary">{ ride._id }</span></h1>

							<div className="text-stone-400 text-xl">{ moment(ride.creationDate).format('DD MMMM YYYY à HH:mm') }</div>

							<TransportRideStatus status={ride.status}/>

						</div>

						<div className="grid gap-4 grid-cols-12">

							<div className="col-span-3 space-y-4">

								<div className="shadow-lg bg-white p-5 rounded-xl">

									<h4 className="font-medium mb-4">Utilisateur</h4>

									<div className="flex items-center gap-2">

										<img src={ride.user.photo.src} className="w-16 h-16 rounded-full" alt="" />

										<div className="ml-2 font-medium text-gray-700">{ formatFullName(ride.user.firstName, ride.user.lastName) }</div>

									</div>

								</div>

								{ ride.driverId && (

									<div className="shadow-lg bg-white p-5 rounded-xl">

										<h4 className="font-medium mb-4">Chauffeur</h4>

										<Link to={`/drivers/profile/${ride.driverId}`}>

											<div className="flex items-center mb-2">

												<div className="flex flex-1 items-center gap-2">

													<img src={ride.driver.photo.src} className="w-16 h-16 rounded-full" alt="" />

													<div className="ml-2 font-medium text-gray-700">{ formatFullName(ride.driver.firstName, ride.driver.lastName) }</div>

												</div>

												<ExternalLink className="text-gray-700" size={20}/>

											</div>

										</Link>

									</div>
								) }

								{ ride.engineId && (

									<div className="shadow-lg bg-white p-5 rounded-xl">

										<h4 className="font-medium mb-4">Engin</h4>

										<Link to={`/engines/details/${ride.engineId}`}>

											<div className="flex items-center mb-2">

												<div className="flex flex-1 items-center gap-2">

													<img src={ride.engine.firstPhoto.src} className="w-20 h-20 rounded-xl" alt="" />

													<div>

														<div className="font-medium text-gray-700">{ ride.engine.name }</div>

														<div className="text-blue">{ ride.engine.year }</div>

														<div className="flex justify-between items-center">

															<div className="border-2 border-stone-300 py-1 px-2 rounded-lg inline-flex">{ ride.engine.licencePlate }</div>

														</div>

													</div>

												</div>

												<ExternalLink className="text-gray-700" size={20}/>

											</div>

										</Link>

									</div>
								) }

							</div>

							<div className="col-span-6 space-y-4">

								<div className="shadow-lg bg-white p-5 rounded-xl space-y-4">

									<div>

										<h4 className="font-medium mb-2">Détails</h4>

										<div className="flex justify-between mb-2">

											<div className="space-y-2 flex-1">

												<div className="flex items-center gap-1">

													<div>

														<MapPin size={20}/>

													</div>

													<div className="ml-2">{ ride.originAddress }</div>

												</div>

												<div className="flex items-center gap-1">

													<div>

														<Map size={20}/>

													</div>

													<div className="ml-2">{ ride.destinationAddress }</div>

												</div>

											</div>

											<div>

												<a href={openMap()} target="_blank" className="btn btn-sm btn-ghost btn-active">

													<Navigation size={20}/>

													<span className="ml-2">ouvrir</span>

												</a>

											</div>

										</div>

										<div className="space-y-2">

											<div className="flex items-center justify-between">

												<div>Durée estimée</div>

												<div className="font-medium">{ formatTime(ride.duration) }</div>

											</div>


											<div className="flex items-center justify-between">

												<div>Distance</div>

												<div className="font-medium">{ formatDistance(ride.distance) }</div>

											</div>

											<div className="flex items-center justify-between">

												<div>Passagers</div>

												<div className="font-medium">{ ride.numberOfPassengers }</div>

											</div>
											
											<div>

												<div>Cargaison</div>

												<div className="text-stone-500">{ ride.description }</div>

											</div>

										</div>

									</div>

									{ ride.userReview && (

										<div>

											<h4 className="font-medium mb-2">Avis et note du client</h4>

											<FiveStarsRating currentRating={ride.userReview.rating}/>

											{ ride.userReview.reviewNote && <p className="text-stone-500 mt-1">{ ride.userReview.reviewNote }</p> }

										</div>
									) }

									{ ride.driverReview && (

										<div>

											<h4 className="font-medium mb-2">Avis et note du chauffeur</h4>

											<FiveStarsRating currentRating={ride.driverReview.rating}/>

											{ ride.driverReview.reviewNote && <p className="text-stone-500 mt-1">{ ride.driverReview.reviewNote }</p> }

										</div>
									) }

								</div>

							</div>

							<div className="col-span-3 space-y-4">

								<div className="shadow-lg bg-white p-5 rounded-xl">

									<h4 className="font-medium mb-4">Prix et revenus</h4>

									<div className="space-y-2">

										{ ride.price && (

											<div className="flex justify-between">

												<div>Prix</div>
												
												<div className="font-bold text-green-500">{ formatPrice(ride.price) }</div>
											
											</div>
										) }

										<div className="flex justify-between">

											<div>Revenus de l'application</div>
											
											<div className="font-bold text-green-500">{ formatPrice(ride.appRevenues) }</div>
										
										</div>

										<div className="flex justify-between">

											<div>Revenus du chauffeur</div>
											
											<div className="font-bold text-green-500">{ formatPrice(ride.driverRevenues) }</div>
										
										</div>

										<RevenuesStatus status={ride.revenuesStatus}/>

									</div>

								</div>
								
							</div>

						</div>

					</div>
				) }


			</div>

		</div>
	)
}

export default TransportRideDetailsPage;