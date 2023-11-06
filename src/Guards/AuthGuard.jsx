import { Navigate } from 'react-router-dom';

import useAuthStore from '../Store/useAuthStore';

const AuthGuard = ({ element, required, ...rest }) => {

	const { setAuthData } = useAuthStore(state => state);

	setAuthData();

	const { isLoggedIn } = useAuthStore(state => state);

	if (required === true && !isLoggedIn) {

		return <Navigate to="/login" replace={true}/>;
	}

	return element;
}

export default AuthGuard;