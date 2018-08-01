import { combineReducers, Reducer } from 'redux';
import user from './user';
import loadState from './loading';
import statistic from './statistic';
import userInfoList from './userInfo';
import productList from './productList';
import productShow from './productShow';
import categoryList from './categoryList';  

export interface AppState {
	user: {};
    loadState: boolean;
    statistic: {};
    userInfoList: {};
    productList: {};
    productShow: {};
    categoryList: {};
}

export const reducers: Reducer<AppState> = combineReducers<AppState>({
	user,
    loadState,
    statistic,
    userInfoList,
    productList,
    productShow,
    categoryList
});
