import React from "react";

import { Link } from "react-router-dom";

import classNames from "classnames";

import { searchEngineByLicencePlate } from "../../Queries/EnginesQueries";

import { modalAction, toast } from "../../ComponentsUtilities/ComponentsUtilities";

import EventEmitter from "../../System/EventEmitter";

const LicencePlateResultsModal = ({ modalId, results, setResults }) => {

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

						<p className="text-gray-500 text-xl text-center">Aucun engin trouvé.</p>
					) : (					

						<div>

							{ results.map(engine => (

								<Link to={`/engines/details/${engine._id}`} key={engine._id}>

									<div className="flex cursor-pointer">

										<img src={engine.photos[0].src} alt="" className="w-16 rounded-lg aspect-ratio-square"/>

										<div className="ml-2">

											<div className="font-medium">{ engine.name }</div>
											
										</div>

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

const LicencePlateSearch = () => {

	const modalId = 'search-results';

	const [ input, setInput ] = React.useState('');

	const [ isLoading, setIsLoading ] = React.useState(false);

	const [ results, setResults ] = React.useState([]);

	const search = async () => {

		if (input.trim().length === 0) {

			toast({ message : 'Veuillez saisir une plaque d\'immatriculation' })

			return
		}
		
		setIsLoading(true);
 
		try {

			const data = await searchEngineByLicencePlate({

				licencePlate : input
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
				placeholder="Recherchez par matricule"
				value={input}
				onChange={e => setInput(e.target.value)}
			/>

			<button onClick={search} className={classNames("btn btn-ghost btn-block bg-stone-200", { "loading" : isLoading })}>recherchez</button>

			<LicencePlateResultsModal

				modalId={modalId}
				results={results}
				setResults={setResults}
			/>

		</div>
	)
}

export default LicencePlateSearch;