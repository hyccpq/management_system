import * as contents from '../constans';
import { Dispatch } from 'redux';
import axios from '../../util/axios';

export interface LoginSuccess {
	msg: string;
	type: contents.LOGIN_SUCCESS;
	data: {};
}

export interface LoginFail {
	type: contents.LOGIN_FAIL;
	msg: string;
}

export interface LoginError {
	type: contents.LOGIN_ERROR;
	msg: string;
}

export type EnthusiasmAction = LoginSuccess | LoginFail | LoginError;

export const loginSuccess = (msg: string = '', data: {} = {}): LoginSuccess => {
	return {
		msg,
		type: contents.LOGIN_SUCCESS,
		data
	};
};

export const loginError = (msg: string): LoginError => {
	return {
		type: contents.LOGIN_ERROR,
		msg
	};
};

export const loginFail = (msg: string): LoginFail => {
	return {
		type: contents.LOGIN_FAIL,
		msg
	};
};

export const login = (userName: string, password: string) => {
	console.log(userName, password)
	return async (dispatch: Dispatch<EnthusiasmAction>) => {
		try {
			let res = await axios({
				method: 'post',
				url: '/manage/user/login.do',
				params: {
					username: userName,
					password
				}
			});
			
			if (res.data.status === 0) {
				dispatch(loginSuccess(res.data.msg, res.data));
			} else {
				dispatch(loginFail(res.data.msg));
			}
		} catch (error) {
			dispatch(loginError(error.toString()));
		}
	};
};
