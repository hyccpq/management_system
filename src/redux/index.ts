import { combineReducers, Reducer } from 'redux';

import user from './reducers/user';
import loadState from './reducers/loading';
import statistic from './reducers/statistic';
import userInfoList from './reducers/userInfo';

export interface AppState {
	user: {};
    loadState: boolean;
    statistic: {};
    userInfoList: {};
}

export const reducers: Reducer<AppState> = combineReducers<AppState>({
	user,
    loadState,
    statistic,
    userInfoList
});
