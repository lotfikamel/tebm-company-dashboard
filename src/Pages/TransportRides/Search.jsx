import React from "react";

import { Link } from "react-router-dom";

import { Map, MapPin } from "react-feather";

import classNames from "classnames";

import { fetchTransportRideInfos } from "../../Queries/TransportRidesQueries";

import TransportRideStatus from "./TransportRideStatus";

import { modalAction, toast } from "../../ComponentsUtilities/ComponentsUtilities";

import EventEmitter from "../../System/EventEmitter";

const SearchResultsModal = ({ modalId, results, setResults }) => {

	const onModalAction = ({ detail : { id, action } }) => {

		if (modalId != id) {

			return;
		}

		if (action == 'close') {

			setResults([]);
		}
	}

	React.useEffect(() => {

		EventEmitter.on('ModalAction', onModalAction);

		return () => {

			EventEmitter.remove('ModalAction', onModalAction);
		}
	}, []);

	return (

		<div>

			<input type="checkbox" id={modalId} className="modal-toggle" />

			<div className="modal">

				<div className="modal-box max-w-3xl space-y-4">

					<h3 className="font-semibold">Résultats de la recherche</h3>

					{ results.length === 0 ? (

						<p className="text-gray-500 text-xl text-center">Aucune course trouvée.</p>
					) : (

						<div>

							{ results.map(ride => (

								<Link to={`/rides/details/${ride._id}`} key={ride._id}>

									<div className="space-y-1 p-4 bg-white shadow-lg rounded-xl">

										<div className="font-medium">{ ride._id }</div>

										<div className="flex items-center">

											<MapPin size={18}/>

											<span className="ml-2">{ ride.originAddress }</span>

										</div>

										<div className="flex items-center">

											<Map size={18}/>

											<span className="ml-2">{ ride.destinationAddress }</span>

										</div>

										<TransportRideStatus status={ride.status}/>

									</div>

								</Link>
							)) }

						</div>
					) }

					<div className="modal-action">

						<label onClick={() => modalAction(modalId, 'close')} className="btn btn-ghost btn-active rounded-xl">fermer</label>

					</div>

				</div>

			</div>

		</div>
	)
}

const Search = () => {

	const modalId = 'search-results';

	const [ input, setInput ] = React.useState('');

	const [ isLoading, setIsLoading ] = React.useState(false);

	const [ results, setResults ] = React.useState([]);

	const search = async () => {

		if (input.trim().length === 0) {

			toast({ message : 'Veuillez saisir un ID course' })

			return
		}
		
		setIsLoading(true);
 
		try {

			const data = await fetchTransportRideInfos({

				rideId : input
			});

			if (data) {

				setResults([ data ]);
			}

			modalAction(modalId, 'open');
		} catch (err) {

			console.log(err)

			toast({ message : 'une erreur s\'est produite' })
		}

		setIsLoading(false);
	}

	return (

		<div id="licence-plate-search" className="bg-white shadow-lg rounded-xl p-6 space-y-4">

			<h3 className="first-letter:uppercase font-medium">recherche</h3>

			<input

				type="text"
				className="input input-ghost w-full bg-gray-100"
				placeholder="Recherchez par code"
				value={input}
				onChange={e => setInput(e.target.value)}
			/>

			<button onClick={search} className={classNames("btn btn-ghost btn-block bg-stone-200", { "loading" : isLoading })}>recherchez</button>

			<SearchResultsModal

				modalId={modalId}
				results={results}
				setResults={setResults}
			/>

		</div>
	)
}

export default Search;