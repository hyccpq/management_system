import * as contents from '../constans';
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

export interface ProductListSuccess {
	type: contents.PRODUCT_LIST_SUCCESS;
	data: {};
}

export interface ProductShowSuccess {
	type: contents.PRODUCT_SHOW_SUCCESS;
	data: {};
}

export interface UserInfoSuccess {
	type: contents.USERINFO_SUCCESS;
	data: {list: {}[], total: number};
}

export type EnthusiasmAction = LoginSuccess | LoginError | LoadingState | StatisticSuccess | UserInfoSuccess | ProductListSuccess | ProductShowSuccess;

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

export const userInfoSuccess = (data: {list: {}[], total: number}): UserInfoSuccess => {
	return {
		type: contents.USERINFO_SUCCESS,
		data
	}
}

class UserInfoRequest extends HttpRequest<UserInfoSuccess, null> {
	protected successCb = userInfoSuccess;
}

/**
 * 查询用户列表信息
 * @param pageSize 查询条目
 * @param pageNum 查询页数
 */
export const userInfoReq = (pageSize: number, pageNum: number) => {
	let requestConfig = {
		method: 'get',
		url: '/manage/user/list.do',
		params: {
			pageSize,
			pageNum
		}
	}
	let userInfoRequest: UserInfoRequest = new UserInfoRequest(requestConfig);
	return userInfoRequest.reqInf;
}

export const productListSuccess = (data: {list: {}[], total: number}): ProductListSuccess => {
	return {
		type: contents.PRODUCT_LIST_SUCCESS,
		data
	}
}

class ProductListRequest extends HttpRequest<ProductListSuccess, null> {
	protected successCb = productListSuccess;
}

/**
 * 查询产品列表
 * @param pageSize 条目数	
 * @param pageNum 页数
 */
export const productListReq = (pageSize: number, pageNum: number) => {
	let requestConfig = {
		method: 'get',
		url: '/manage/product/list.do',
		params: {
			pageSize,
			pageNum
		}
	}
	let productListRequest: ProductListRequest = new ProductListRequest(requestConfig);
	return productListRequest.reqInf;
}


export const productShowSuccess = (data: {list: {}[], total: number}): ProductShowSuccess => {
	return {
		type: contents.PRODUCT_SHOW_SUCCESS,
		data
	}
}

class ProductShowRequest extends HttpRequest<ProductShowSuccess, null> {
	protected successCb = productShowSuccess;
}

export const productShowReq = (productId: string) => {
	let requestConfig = {
		method: 'get',
		url: '/manage/product/detail.do',
		params: {
			productId
		}
	}
	let productShowRequest: ProductShowRequest = new ProductShowRequest(requestConfig);
	return productShowRequest.reqInf;
}
