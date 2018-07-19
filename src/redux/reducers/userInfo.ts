import { Reducer } from 'redux';
import { EnthusiasmAction } from '../actions';
import { USERINFO_SUCCESS } from '../constans';

const userInfoList: Reducer<{}> = (state = {}, action: EnthusiasmAction) => {
	switch (action.type) {
		case USERINFO_SUCCESS:
			console.log(action);
			return action.data
		default:
			return state;
	}
};

export default userInfoList;