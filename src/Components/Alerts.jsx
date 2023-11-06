import React from 'react';

import classNames from 'classnames';

import { AlertTriangle, Info } from 'react-feather';

import { modalAction, toast } from '../ComponentsUtilities/ComponentsUtilities';

import errorIllustration from '../Assets/Illustrations/error.svg';

import noDataIllustration from '../Assets/Illustrations/no-data.svg';

export const AlertDanger = ({ message, className }) => {

	return (

		<div className={classNames("flex items-center bg-red-50 text-red-500 rounded-lg p-5 py-3", className)}>

			<div>

				<AlertTriangle size={18}/>

			</div>

			<p className="ml-3 first-letter:uppercase">{ message }</p>

		</div>
	)
}

export const AlertPrimary = ({ message, className }) => {

	return (

		<div className={classNames("flex items-center bg-blue-50 text-blue-500 rounded-lg p-5 py-3", className)}>

			<div>

				<Info size={18}/>

			</div>

			<p className="ml-3 first-letter:uppercase">{ message }</p>

		</div>
	)
}

export const FetchErrorAlert = ({ tryAgain, illustrationAlert }) => {

	return (

		<div id="error-alert" className="text-center">

			<div className="flex justify-center">

				<img src={illustrationAlert || errorIllustration} alt="une erreur est survenue" className="w-full md:w-3/5 xl:w-2/5"/>

			</div>

			<p className="md:text-xl first-letter:uppercase">une erreur est survenue, <span onClick={tryAgain} className="link link-primary">réessayez</span>.</p>

		</div>
	);
}


export const NoDataAlert = ({ message, illustrationAlert }) => {

	return (

		<div id="no-data-alert" className="text-center">

			<div className="flex justify-center">

				<img src={illustrationAlert || noDataIllustration} alt="aucune donnée à afficher" className="w-full md:w-3/5 xl:w-2/5"/>

			</div>

			<p className="md:text-xl first-letter:uppercase"> { message || 'aucune donnée à afficher.' }</p>

		</div>
	)
}

export const ConfirmAlert = ({ modalId='confirm-alert', title="confirmation", text, onConfirm }) => {

	const confirm = () => {

		modalAction(modalId, 'close');

		onConfirm();
	}

	return (

		<div>

			<input type="checkbox" id={modalId} className="modal-toggle" />

			<div className="modal">

				<div className="modal-box space-y-4">

					<h2 className="font-bold first-letter:uppercase">{ title }</h2>

					<p className="py-3 text-lg first-letter:uppercase">{ text }</p>

					<div className="modal-action">

						<label htmlFor={modalId} className="btn btn-ghost btn-active rounded-xl">annuler</label>

						<button onClick={confirm} className="btn btn-primary rounded-xl">confirmer</button>

					</div>

				</div>

			</div>

		</div>
	)
}

export const PromptAlert = ({
	
	modalId='prompt-alert',
	title,
	element="input",
	type="text",
	placeholder,
	text,
	initInput='',
	onConfirm
}) => {

	const [ input, setInput ] = React.useState(initInput.toString());

	const confirm = () => {

		if (input.trim().length === 0) {

			toast({ message : 'veuillez entrer une valeur.' })

			return;
		}

		modalAction(modalId, 'close');

		onConfirm(input);
	}

	return (

		<div>

			<input type="checkbox" id={modalId} className="modal-toggle" />

			<div className="modal">

				<div className="modal-box space-y-4">

					<h2 className="font-bold first-letter:uppercase">{ title }</h2>

					{ text && <p className="text-lg first-letter:uppercase">{ text }</p> }

					<div>

						{ element === 'input' ? (

							<input

								type={type}
								name="input"
								value={input}
								onChange={e => setInput(e.target.value)}
								className="input input-ghost w-full bg-gray-100 rounded-box "
								placeholder={placeholder}
								autoComplete="off"
							/>
						) : (

							<textarea

								name="input"
								value={input}
								onChange={e => setInput(e.target.value)}
								className="textarea resize-none h-32 input-ghost w-full bg-gray-100 rounded-box "
								placeholder={placeholder}
								autoComplete="off"
							></textarea>
						) }

					</div>

					<div className="modal-action">

						<label htmlFor={modalId} className="btn btn-ghost btn-active rounded-xl">annuler</label>

						<button onClick={confirm} className="btn btn-primary rounded-xl">confirmer</button>

					</div>

				</div>

			</div>

		</div>
	)
}