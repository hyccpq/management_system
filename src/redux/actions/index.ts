import * as contents from '../constans';

export interface CategorySuccess {
	type: contents.PRODUCT_CLASS_SUCCESS;
	data: {}
}

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

export interface OrderListSuccess {
	type: contents.ORDER_LIST_SUCCESS;
	data: {};
}

export type EnthusiasmAction = LoginSuccess | 
								LoginError | 
								LoadingState | 
								StatisticSuccess | 
								UserInfoSuccess | 
								ProductListSuccess | 
								ProductShowSuccess |
								CategorySuccess|
								OrderListSuccess;

export const loadingState = (state: boolean): LoadingState => {
	return {
		type: contents.LOADING_STATE,
		state
	};
};