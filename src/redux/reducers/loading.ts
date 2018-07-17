import { Reducer } from "redux";
import { EnthusiasmAction } from "../actions";
import { LOADING_STATE } from "../constans";

const loading: Reducer<boolean> = (state = false, action:EnthusiasmAction) => {
	switch (action.type) {
		case LOADING_STATE: 
			return action.state;

		default:
			return state;
	}
};

export default loading;