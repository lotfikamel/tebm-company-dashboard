import React from "react";

import { useLocation } from "react-router-dom";

import { debounce } from 'lodash';

import useScrollPositionStore from "../Store/useScrollPositionStore";

const useRestoreScroll = () => {

	const ELEMENT_SCROLLER_ID = '#scroller';

	const location = useLocation();

	const positions = useScrollPositionStore(state => state.positions);

	const setPosition = useScrollPositionStore(state => state.setPosition);

	const saveScrollPosition = debounce((event) => {
	
		setPosition({

			[location.pathname] : event.target.scrollTop
		});
	}, 500);

	const restoreRoutePosition = () => {

		const routePosition = positions[location.pathname];

		if (routePosition) {

			const scroller = document.querySelector(ELEMENT_SCROLLER_ID);

			scroller.scrollTo(0, routePosition);
		}
	}

	React.useLayoutEffect(() => {

		const scroller = document.querySelector(ELEMENT_SCROLLER_ID);

		restoreRoutePosition();

		scroller.addEventListener('scroll', saveScrollPosition);

		return () => {

			scroller.removeEventListener('scroll', saveScrollPosition);
		}
	}, [location]);
}

export default useRestoreScroll;