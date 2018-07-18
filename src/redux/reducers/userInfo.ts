import { Reducer } from 'redux';
import { EnthusiasmAction } from '../actions';
import { USERINFO_SUCCESS } from '../constans';

const userInfoList: Reducer<{}> = (state = {}, action: EnthusiasmAction) => {
	switch (action.type) {
		case USERINFO_SUCCESS:
			console.log(action);
			return {
				user: action.data,
				success: true
			};

		default:
			return state;
	}
};

export default userInfoList;