import { useState, useEffect } from 'react';

const useStateWatch = (state, callback) => {

	useEffect(() => {

		callback(state);
	}, [state]);
}

export default useStateWatch;