import { LoginSuccess, LoginError } from './';
import HttpRequest from './request.tool';
import * as contents from '../constans';


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