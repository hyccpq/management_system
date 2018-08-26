import { Reducer } from 'redux';
import { EnthusiasmAction } from '../actions';
import { ORDER_LIST_SUCCESS } from '../constans';

const userInfoList: Reducer<{}> = (state = {}, action: EnthusiasmAction) => {
	switch (action.type) {
		case ORDER_LIST_SUCCESS:
			console.warn(action);
			return action.data
		default:
			return state;
	}
};

export default userInfoList;