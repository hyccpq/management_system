import { Reducer } from 'redux';
import { EnthusiasmAction } from '../actions';

const counter: Reducer<number> = (state = 0, action:EnthusiasmAction) => {
	switch (action.type) {
		case 'INCREMENT':
			return state + 1;
		case 'DECREMENT':
			return state - 1;
		default:
			return state;
	}
};

export default counter;
