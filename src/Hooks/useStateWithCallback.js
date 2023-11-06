import { useState, useEffect, useRef } from 'react';

const useStateWithCallback  = (initState) => {

	/**
	 *  callback ref
	 *  @var {Function}
	 */
	const callbackRef = useRef(null);

	/**
	 * current state
	 * @var {Mixed}
	 */
	const [ state, setState ] = useState(initState);

	/** 
	 * UseEffect to execute the callback once the state changes
	 * @param {Function}
	 * @returns Void
	*/
	useEffect(() => {

		if (callbackRef.current) {

			callbackRef.current(state);

			callbackRef.current = null;
		}
	}, [state]);

	/**
	 * Update the state and the callback ref
	 * @param {Mixed} newState 
	 * @param {Function} callback
	 * @returns {Void}
	 */
	const updateStateWithCallback = (newState, callback) => {

		callbackRef.current = callback;

		setState(newState);
	}

	return [ state, updateStateWithCallback, setState ];
}

export default useStateWithCallback;