import { create } from "zustand";

const initState = {

	filters : {

		engineType : '',

		status : '',
	}
}

const useTransportRidesStore = create((set, get) => ({

	...initState,

	setFilter : (filter) => set(state => ({ filters : { ...state.filters, ...filter } })),

	reset : () => set(initState),
}));

export default useTransportRidesStore