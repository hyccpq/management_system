import { combineReducers, Reducer } from 'redux'

import user from './reducers/user'

export interface AppState {
    user: {};
}

export const reducers: Reducer<AppState> =  combineReducers<AppState>({
    user
})