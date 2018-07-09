import { combineReducers, Reducer } from 'redux'

import counter from './reducers/counter'
import user from './reducers/user'

export interface AppState {
    counter: number;
    user: string;
}

export const reducers: Reducer<AppState> =  combineReducers<AppState>({
    counter,
    user
})