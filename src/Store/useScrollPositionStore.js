
import { create } from "zustand";

const initState = {

	positions : {}
}

const useScrollPositionStore = create((set, get) => ({

	...initState,

	setPosition : (position) => set(state => ({ positions : { ...state.positions, ...position } })),

	reset : () => set(initState),
}));

export default useScrollPositionStore;