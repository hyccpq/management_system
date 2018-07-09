import { Reducer } from "redux";
import { EnthusiasmAction } from "../actions";

const user: Reducer<string> = (state = 'kalec', action:EnthusiasmAction) => {
	switch (action.type) {
		
		default:
			return state;
	}
};

export default user;