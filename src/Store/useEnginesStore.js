import { create } from "zustand";

const initState = {

	filters : {

		engineType : '',

		ownershipType : '',

		status : '',

		year : ''
	}
}

const useEnginesStore = create((set, get) => ({

	...initState,

	setFilter : (filter) => set(state => ({ filters : { ...state.filters, ...filter } })),

	reset : () => set(initState),
}));

export default useEnginesStore