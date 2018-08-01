import { Reducer } from 'redux';
import { EnthusiasmAction } from '../actions';
import { PRODUCT_CLASS_SUCCESS } from '../constans';

const categoryList: Reducer<{}> = (state = {}, action: EnthusiasmAction) => {
	switch (action.type) {
		case PRODUCT_CLASS_SUCCESS:
			console.log(action);
			return action.data
		default:
			return state;
	}
};

export default categoryList;