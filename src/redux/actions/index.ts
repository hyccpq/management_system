import * as contents from '../constans';
import { Dispatch } from 'redux';
import axios from '../../util/axios';

export interface LoginSuccess {
	msg: string;
	type: contents.LOGIN_SUCCESS;
	data: {};
}

export interface LoginError {
	type: contents.LOGIN_ERROR;
	msg: string;
}

export interface LoadingState {
	type: contents.LOADING_STATE;
	state: boolean;
}

export interface StatisticSuccess {
	type: contents.STATISTIC_SUCCESS,
	data: {}
}

export type EnthusiasmAction = LoginSuccess | LoginError | LoadingState | StatisticSuccess;

export const loadingState = (state: boolean): LoadingState => {
	return {
		type: contents.LOADING_STATE,
		state
	}
}

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

const computedLoadState = (dispatch: Dispatch<EnthusiasmAction>) => (loadState:boolean) => dispatch(loadingState(loadState))

/**
 * 登录提交状态改变
 * @param userName 用户名
 * @param password 密码
 */
export const login = (userName: string, password: string) => {
	return async (dispatch: Dispatch<EnthusiasmAction>) => {
		try {
			let res = await axios(
				computedLoadState(dispatch)
			)({
				method: 'post',
				url: '/manage/user/login.do',
				params: {
					username: userName,
					password
				}
			});
			console.log(res);
			
			if (res.data.status === 0) {
				dispatch(loginSuccess(res.data.msg, res.data));
			} else {
				throw res.data.msg
			}
		} catch (error) {
			console.log(error);
			
			dispatch(loginError(error.toString()));
		}
	};
};

export const statisticSuccess = (data: {}): StatisticSuccess => {
	return {
		type: contents.STATISTIC_SUCCESS,
		data
	}
}

/**
 * 统计获取
 */
export const statistics = () => {
	return async (dispatch: Dispatch<EnthusiasmAction>) => {
		try {
			let res = await axios(
				computedLoadState(dispatch)
			)({
				method: 'get',
				url: '/manage/statistic/base_count.do'
			});

			if(res.data.status === 0) {
				dispatch(statisticSuccess(res.data.data))
			} else {
				throw res.data.msg
			}
		} catch (error) {
			console.log(error);
		}
	}
}
