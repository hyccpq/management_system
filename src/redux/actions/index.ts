import * as contents from '../constans';
import { Dispatch } from 'redux';
import axios from '../../util/axios';
import HttpRequest from './request.tool';

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
	type: contents.STATISTIC_SUCCESS;
	data: {};
}

export type EnthusiasmAction = LoginSuccess | LoginError | LoadingState | StatisticSuccess;

export const loadingState = (state: boolean): LoadingState => {
	return {
		type: contents.LOADING_STATE,
		state
	};
};

export const loginSuccess = (msg: string = '', data: {} = {}): LoginSuccess => {
	console.log(msg, data);
	
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

/**
 * 登录请求
 */
class LoginRequest extends HttpRequest<LoginSuccess, LoginError> {
	protected successCb = loginSuccess;
	protected errorCb = loginError;
}

/**
 * 登录提交状态改变
 * @param userName 用户名
 * @param password 密码
 */
export const login = (userName: string, password: string) => {
	let requestConfig = {
		method: 'post',
		url: '/manage/user/login.do',
		params: {
			username: userName,
			password
		}
	};
	let loginRequest: LoginRequest = new LoginRequest(requestConfig);
	return loginRequest.reqInf;
};

export const statisticSuccess = (data: {}): StatisticSuccess => {
	return {
		type: contents.STATISTIC_SUCCESS,
		data
	};
};

class StatisticRequest extends HttpRequest<StatisticSuccess, null> {
	protected successCb = statisticSuccess;
}

/**
 * 统计获取
 */
export const statistics = () => {
	let requestConfig = {
		method: 'get',
		url: '/manage/statistic/base_count.do'
	}
	let statisticRequest: StatisticRequest = new StatisticRequest(requestConfig);
	return statisticRequest.reqInf;
};
