import { create } from "zustand";

import { TRANSPORT_RIDE_STATUS } from "../Constants/Constants";

const initState = {

	filters : {

		engineType : '',

		type : '',

		status : TRANSPORT_RIDE_STATUS.WAITING,
	}
}

const useTransportRidesStore = create((set, get) => ({

	...initState,

	setFilter : (filter) => set(state => ({ filters : { ...state.filters, ...filter } })),

	reset : () => set(initState),
}));

export default useTransportRidesStore