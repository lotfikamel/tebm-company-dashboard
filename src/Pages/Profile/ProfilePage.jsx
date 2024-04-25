import moment from 'moment';

import { Calendar, Key, Mail, Phone, Star, Truck, Users } from 'react-feather';

import { openLightbox } from "../../ComponentsUtilities/ComponentsUtilities";

import { useCompanyProfileQuery } from "../../Queries/ProfileQueries";

import Status from './Status';

import Stat from '../../Components/Stat';

import MaterialSymbolIcon from '../../Components/MaterialSymbolIcon';

import { DataLoader } from '../../Components/Loaders';

const ProfilePage = () => {

	const { data : profile, isLoading, isError, refetch } = useCompanyProfileQuery()

	return (

		<div id="company-profile-page">

			<div className="container mx-auto px-4">

				{ isLoading && <DataLoader/> }

				{ !isLoading && isError && <FetchErrorAlert tryAgain={refetch}/> }

				{ !isLoading && !isError && !profile && <NoDataAlert/> }

				{ !isLoading && !isError && profile && (

					<>

						<h1 className="font-semibold mb-6">Profil</h1>

						<div className="grid grid-cols-12 gap-4">

							<div className="col-span-4">

								<div className="space-y-6">

									<div className="shadow-lg p-4 rounded-lg space-y-3">

										<div className="flex justify-center">

											<img src={profile.photo.src} onClick={() => openLightbox({ images : [profile.photo.src] })} className="w-28 h-28 rounded-full" alt="" />

										</div>

										<div className="font-medium text-2xl">{ profile.name }</div>

										<Status status={profile.status}/>

										<div className="space-y-2 text-stone-600 text-lg">

											<div className="flex items-center text-lg">

												<Calendar/>

												<div className="ml-2">{ moment(profile.creationDate).format('DD MMMM YYYY HH:mm') }</div>

											</div>

											<div className="flex items-center text-lg">

												<Mail/>

												<div className="ml-2">{ profile.email }</div>

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

										</div>

									</div>

								</div>

							</div>

							<div className="col-span-8">

								<div className="grid gap-4 grid-cols-3">
											
									<Stat IconComponent={<Users size={25}/>} title="Chauffeurs" stat={profile.total.drivers}/>

									<Stat IconComponent={<Truck size={25}/>} title="Engins" stat={profile.total.engines}/>

									<Stat IconComponent={<MaterialSymbolIcon name="near_me" size={25}/>} title="course terminées" stat={profile.total.drivers}/>

								</div>

							</div>

						</div>

					</>

				) }

			</div>

		</div>
	)
}

export default ProfilePage;