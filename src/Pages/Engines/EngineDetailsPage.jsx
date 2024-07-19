import moment from "moment";

import classNames from "classnames";

import { Award, Calendar, ExternalLink, Hash } from "react-feather";

import { Link, NavLink, Outlet, useParams } from "react-router-dom";

import { useEngineDetailsQuery } from "../../Queries/EnginesQueries";

import Image from "../../Components/Image";

import { DataLoader } from "../../Components/Loaders";

import { FetchErrorAlert, NoDataAlert } from "../../Components/Alerts";

import EngineActions from "./EngineActions";

import { formatFullName } from "../../ComponentsUtilities/ComponentsUtilities";

import EngineStatus from "./EngineStatus";

const EngineDetailsPage = () => {

	const { engineId } = useParams();

	const Tabs = [

		{
			path : '',
			label : 'Courses'
		}
	]

	const { data : engine, isLoading, isError, refetch } = useEngineDetailsQuery({

		engineId
	});

	return (

		<div id="engine-details-page">

			<div className="container mx-auto px-4">

				{ isLoading && <DataLoader/> }

				{ !isLoading && isError && <FetchErrorAlert tryAgain={refetch}/> }

				{ !isLoading && !isError && !engine && <NoDataAlert/> }

				{ !isLoading && !isError && engine && (

					<>

						<h1 className="font-semibold mb-6">Détails d'véhicule</h1>

						<div className="grid gap-4 grid-cols-12">

							<div className="col-span-4 space-y-4">

								<div className="shadow-lg p-4 rounded-lg space-y-2">

									<div className="flex">

										<div className="flex flex-1">

											<div className="font-medium text-2xl">{ engine.name }</div>

										</div>

										<EngineActions engine={engine}/>

									</div>

									<EngineStatus status={engine.status}/>

									<div className="space-y-2 text-stone-600 text-lg">

										<div className="flex items-center text-lg">

											<Calendar/>

											<div className="ml-2">{ moment(engine.creationDate).format('DD MMMM YYYY HH:mm') }</div>

										</div>

										<div className="flex items-center text-lg">

											<Hash/>

											<div className="ml-2">{ engine.licencePlate }</div>

										</div>

										<div className="flex items-center text-lg">

											<Award/>

											<div className="ml-2">{ engine.year }</div>

										</div>

										<div>{ engine.total.completedRides } transport terminés</div>

									</div>

								</div>

								<div className="shadow-lg p-4 rounded-lg">
									
									<h4 className="mb-2">Photos</h4>

									<div className="grid gap-1 grid-cols-3">

										{ engine.photos.map(photo => (

											<div key={photo._id}>

												<Image src={photo.src} className="rounded-lg aspect-ratio-square" />

											</div>
										)) }

									</div>
									
								</div>

								<div className="shadow-lg p-4 rounded-lg">
									
									<h4 className="mb-2">Chauffeur</h4>

									{ engine.driver ? (

										<Link to={`/drivers/profile/${engine.driverId}`}>

											<div className="flex items-center mb-2">

												<div className="flex flex-1 items-center">

													<img src={engine.driver.photo.src} className="w-16 h-16 rounded-full" alt="" />

													<div className="ml-2 font-medium text-gray-700">{ formatFullName(engine.driver.firstName, engine.driver.lastName) }</div>

												</div>

												<ExternalLink className="text-gray-700" size={20}/>

											</div>

										</Link>
									) : (

										<div className="py-2 px-4 bg-orange-100 text-orange-500 rounded-lg">Aucun chauffeur attaché</div>
									) }

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

export default EngineDetailsPage