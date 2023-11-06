import { useState } from 'react';

import useStateRef from './useStateRef';

const useForms = ({ initInputs, errorMessages }) => {

	/**
	 * inputs state
	 * @var {Array<Mixed>}
	 */
	const [ inputs, setInputs ] = useState(initInputs);

	/**
	 * inputs validation errors state using special state hook
	 * @var {Array<Mixed>}
	 */
	const [ errors, setErrors, errorsRef ] = useStateRef({});

	/**
	 * Update the inputs state
	 * @param {HTMLDOMEvent} event
	 * @returns {Void} 
	 */
	const handleInputTextChange = (event) => {

		setInputs(prevInputs => ({

			...prevInputs,
			[event.target.name] : event.target.type === 'checkbox' ? event.target.checked : event.target.value
		}));
	}

	/**
	 * Add custom errors, in the most cases this comes from server side
	 * @param {Object} serverErrors
	 * @returns {Void} 
	 */
	const addErrors = (serverErrors) => {

		for (let input in serverErrors) {

			setErrors(prevErrors => ({

				...prevErrors,
				[input] : errorMessages[input][serverErrors[input]]
			}));
		}
	}

	/**
	 * Clear all errors
	 * @returns {Void} 
	 */
	const clearErrors = () => {

		setErrors({});
	}

	/**
	 * Check if the validation has failed
	 * @param {Array<String>} inputExceptions
	 * @returns {Boolean}
	 */
	const hasFailed = (...inputExceptions) => {

		const obj = { ...errorsRef.current };

		inputExceptions.forEach(input => {

			delete obj[input];
		});

		return Object.keys(obj).length > 0;
	}

	return {
		inputs,
		setInputs,
		handleInputTextChange,
		errors,
		errorsRef,
		clearErrors,
		addErrors,
		hasFailed,
	};
}

export default useForms;