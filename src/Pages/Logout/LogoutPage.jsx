import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import useAuthStore from '../../Store/useAuthStore';

const LogoutPage = () => {

	const navigate = useNavigate();

	const logout = useAuthStore(state => state.logout);

	useEffect(() => {

		logout();

		navigate('/login', { replace : true });
	}, []);

	return null;
}

export default LogoutPage;