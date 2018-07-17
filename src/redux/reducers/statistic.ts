import { Reducer } from 'redux';
import { EnthusiasmAction } from '../actions';
import { STATISTIC_SUCCESS } from '../constans';

const statistic: Reducer<{}> = (state: {} = {}, action:EnthusiasmAction) => {
	switch (action.type) {
		case STATISTIC_SUCCESS:
			console.log(action.data);
			
			return  action.data;
		default:
			return state;
	}
};

export default statistic;
