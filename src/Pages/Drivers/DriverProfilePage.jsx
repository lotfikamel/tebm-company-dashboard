import moment from "moment";

import classNames from "classnames";

import { Calendar, CheckCircle, ExternalLink, Hash, Key, Navigation, Phone, Star } from "react-feather";

import { Link, NavLink, Outlet, useParams } from "react-router-dom";

import { useDriverProfileQuery } from "../../Queries/DriversQueries";

import { DataLoader } from "../../Components/Loaders";

import usePermissions from "../../Hooks/usePermissions";

import AttachEngineAction from "./AttachEngineAction";

import Image from "../../Components/Image";

import { FetchErrorAlert, NoDataAlert } from "../../Components/Alerts";

import DriverActions, { DetachEngineAction } from "./DriverActions";

import DriverStatus from "./DriverStatus";

import { formatFullName, openLightbox, formatDriverAccountType, openDirectionInMap } from "../../ComponentsUtilities/ComponentsUtilities";

const DriverProfilePage = () => {

	const { driverId } = useParams();

	const { hasEngineAttatched } = usePermissions();

	const Tabs = [

		{
			path : '',
			label : 'Courses'
		},

		{
			path : 'reviews',
			label : 'Avis & notes'
		},

		{
			path : 'revenues',
			label : 'Revenus'
		},

		{
			path : 'debts',
			label : 'Dettes'
		}
	]

	const { data : profile, isLoading, isError, refetch } = useDriverProfileQuery({

		driverId
	});

	const lastKnownLocation = () => {

		return openDirectionInMap({ origin : profile.lastKnownLocation.coordinates })
	}

	return (

		<div id="driver-profile-page">

			<div className="container mx-auto px-4">

				{ isLoading && <DataLoader/> }

				{ !isLoading && isError && <FetchErrorAlert tryAgain={refetch}/> }

				{ !isLoading && !isError && !profile && <NoDataAlert/> }

				{ !isLoading && !isError && profile && (

					<>

						<h1 className="font-semibold mb-6">Profil chauffeur</h1>

						<div className="grid gap-6 grid-cols-12">

							<div className="col-span-4 space-y-4">

								<div className="shadow-lg p-4 rounded-lg space-y-3">

									<div className="flex justify-center">

										<img src={profile.photo.src} onClick={() => openLightbox({ images : [profile.photo.src] })} className="w-28 h-28 rounded-full" alt="" />

									</div>

									<div className="flex">

										<div className="flex flex-1">

											<div>

												<div className="font-medium text-2xl">{ formatFullName(profile.firstName, profile.lastName) }</div>

												<DriverStatus status={profile.status}/>

											</div>

										</div>

										<DriverActions driver={profile}/>

									</div>

									<div className="space-y-2 text-stone-600 text-lg">

										{ profile.companyId && (

											<div className="flex text-lg items-center text-blue-500">

												<CheckCircle/>

												<div className="ml-2">{ formatDriverAccountType(profile.type) }</div>

											</div>
										) }

										<div className="flex items-center text-lg">

											<Calendar/>

											<div className="ml-2">{ moment(profile.creationDate).format('DD MMMM YYYY HH:mm') }</div>

										</div>

										<div className="flex items-center text-lg">

											<Hash/>

											<div className="ml-2">{ profile._id }</div>

										</div>

										<div className="flex items-center text-lg">

											<Key/>

											<div className="ml-2">{ profile.password }</div>

										</div>

										{ profile.phones.map(phone => (

											<div key={phone} className="flex items-center text-lg">

												<Phone/>

												<div className="ml-2">{ phone }</div>

											</div>
										)) }

										<div className="flex items-center">

											<Star className="text-amber-500"/>

											<div className="ml-2">{ profile.total.rating } ({ profile.total.reviews } avis)</div>

										</div>

										<div>{ profile.total.completedRides } transport terminés</div>

									</div>

									{ profile.lastKnownLocation && (

										<a href={lastKnownLocation()} target="_blank" className="btn btn-ghost btn-active">

											<span className="mr-2">ouvrir la dernière localisation connue</span>

											<Navigation size={20}/>

										</a>

									) }

								</div>

								{ !hasEngineAttatched(profile) && (

									<AttachEngineAction driver={profile}/>
								) }

								{ profile.engine && (

									<div className="shadow-lg p-4 rounded-lg">
										
										<div className="flex justify-between items-center">

											<h4 className="mb-2">Engin</h4>

											<DetachEngineAction driver={profile}/>

										</div>

										<Link to={`/engines/details/${profile.engineId}`}>

											<div className="flex items-center mb-2">

												<div className="flex flex-1 items-center">

													<img src={profile.engine.firstPhoto.src} className="w-20 h-20 rounded-xl" alt="" />

													<div className="ml-2">

														<div className="font-medium text-gray-700">{ profile.engine.name }</div>

														<div className="text-blue">{ profile.engine.year }</div>

														<div className="flex justify-between items-center">

															<div className="border-2 border-stone-300 py-1 px-2 rounded-lg inline-flex">{ profile.engine.licencePlate }</div>

														</div>

													</div>

												</div>

												<ExternalLink className="text-gray-700" size={20}/>

											</div>

										</Link>

									</div>

								) }

								{ profile.company && (

									<div className="shadow-lg p-4 rounded-lg">
										
										<h4 className="mb-2">Entreprise</h4>

										<Link to={`/companies/profile/${profile.companyId}`}>

											<div className="flex items-center mb-2">

												<div className="flex flex-1 items-center">

													<img src={profile.company.photo.src} className="w-16 h-16 rounded-full" alt="" />

													<div className="ml-2 font-medium text-gray-700">{ profile.company.name }</div>

												</div>

												<ExternalLink className="text-gray-700" size={20}/>

											</div>

										</Link>

									</div>

								) }

								<div className="shadow-lg p-4 rounded-lg">
									
									<h4 className="mb-2">IDs</h4>

									<div className="grid gap-1 grid-cols-3">

										{ profile.ids.map(photo => (

											<div key={photo._id}>

												<Image src={photo.src} className="rounded-lg aspect-ratio-square" />

											</div>
										)) }

									</div>
									
								</div>

							</div>

							<div className="col-span-8 space-y-6">
								
								<div className="tabs">

									{ Tabs.map((tab, index) => (

										<NavLink

											key={index}
											to={tab.path}
											end
											className={({ isActive }) => classNames("tab flex-1 tab-lg tab-lifted", { "tab-active" : isActive })}
										>

											{ tab.label }

										</NavLink>
									)) }

								</div>

								<div>
										
									<Outlet/>

								</div>

							</div>

						</div>

					</>

				) }

			</div>

		</div>
	)
}

export default DriverProfilePage