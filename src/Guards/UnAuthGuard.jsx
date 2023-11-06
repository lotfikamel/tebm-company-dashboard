import { Navigate } from 'react-router-dom';

import useAuthStore from '../Store/useAuthStore';

const UnAuthGuard = ({ element, ...rest }) => {

	const { setAuthData } = useAuthStore(state => state);

	setAuthData();

	const { isLoggedIn } = useAuthStore(state => state);

	if (isLoggedIn) {

		return <Navigate to="/" replace={true}/>
	}

	return element;
}

export default UnAuthGuard;