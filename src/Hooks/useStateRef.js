import { useState, useRef } from 'react';

/**
 * new State hook to access the lastest state value in all javascript Events
 * @param {Mixed} initState 
 * @returns {Array}
 */
const useStateRef = (initState) => {

	/**
	 * State and set state
	 * @var {Array<Mixed>}
	 */
	const [ state, setState ] = useState(initState);

	/**
	 * State Ref to keep track of the latest state's value
	 * @var {Mixed}
	 */
	const stateRef = useRef(initState);

	/**
	 * Update the state along side with the ref value
	 * @param {Mixed} newState 
	 */
	const updateStateWithRef = (newState) => {

		stateRef.current = newState.constructor.name == 'Function' ? newState(stateRef.current) : newState;

		setState(newState);
	}

	//return the original state, special update function and the ref
	return [ state, updateStateWithRef, stateRef ];
}

export default useStateRef;