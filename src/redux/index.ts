import { combineReducers, Reducer } from 'redux';

import user from './reducers/user';
import loadState from './reducers/loading';
import statistic from './reducers/statistic';

export interface AppState {
	user: {};
    loadState: boolean;
    statistic: {};
}

export const reducers: Reducer<AppState> = combineReducers<AppState>({
	user,
    loadState,
    statistic
});
