import { create } from "zustand";

const initState = {

	filters : {

		engineType : '',

		status : '',

		type : ''
	}
}

const useDriversStore = create((set, get) => ({

	...initState,

	setFilter : (filter) => set(state => ({ filters : { ...state.filters, ...filter } })),

	reset : () => set(initState),
}));

export default useDriversStore