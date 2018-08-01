import { Reducer } from 'redux';
import { EnthusiasmAction } from '../actions';
import { LOGIN_SUCCESS, LOGIN_ERROR } from '../constans';

const user: Reducer<{}> = (state = {}, action: EnthusiasmAction) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
			window.localStorage.setItem('userInfo', JSON.stringify(action));
			return {
				msg: action.msg,
				user: action.data,
				success: true
			};

		case LOGIN_ERROR:
			return {
				msg: action.msg,
				success: false
			};

		default:
			return state;
	}
};

export default user;
