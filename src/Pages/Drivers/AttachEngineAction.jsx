import React from "react";

import { useQueryClient } from "react-query";

import classNames from "classnames";

import { useAttachEngineMutation } from "../../Mutations/DriversMutations";

import { searchEngineByLicencePlate } from "../../Queries/EnginesQueries";

import { modalAction, toast } from "../../ComponentsUtilities/ComponentsUtilities";

const ResultsModal = ({ modalId, results, driver }) => {

	const queryClient = useQueryClient();

	const { mutate, isLoading } = useAttachEngineMutation();

	const attach = (engine) => {

		if (isLoading) {

			return
		}

		mutate({

			driverId : driver._id,
			engineId : engine._id
		}, {

			onError () {

				toast({ message : 'une erreur s\'est produite' })
			},

			onSuccess () {

				queryClient.invalidateQueries(['driverProfile', driver._id]);
			}
		})
	}

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

								<div key={engine._id} className="flex">

									<img src={engine.photos[0].src} alt="" className="w-20 rounded-lg aspect-ratio-square"/>

									<div className="ml-2">

										<div className="font-medium mb-1">{ engine.name }</div>

										<button onClick={() => attach(engine)} className="btn btn-primary">attachez</button>
										
									</div>

								</div>
							)) }

						</div>

					) }

					<div className="modal-action">

						<label htmlFor={modalId} className="btn btn-ghost btn-active rounded-xl">fermer</label>

					</div>

				</div>

			</div>

		</div>
	)
}

const AttachEngineAction = ({ driver }) => {

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

		<div id="licence-plate-search" className="bg-white shadow-lg rounded-xl p-4 space-y-4">

			<h4 className="first-letter:uppercase font-medium">attachez un engin</h4>

			<input

				type="text"
				className="input input-ghost w-full bg-gray-100"
				placeholder="Recherchez par matricule"
				value={input}
				onChange={e => setInput(e.target.value)}
			/>

			<button onClick={search} className={classNames("btn btn-ghost btn-block bg-stone-200", { "loading" : isLoading })}>recherchez</button>

			<ResultsModal

				modalId={modalId}
				results={results}
				driver={driver}
			/>

		</div>
	)
}

export default AttachEngineAction;