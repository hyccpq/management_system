import { Reducer } from 'redux';
import { EnthusiasmAction } from '../actions';
import { PRODUCT_LIST_SUCCESS } from '../constans';

const productList: Reducer<{}> = (state = {}, action: EnthusiasmAction) => {
	switch (action.type) {
		case PRODUCT_LIST_SUCCESS:
			console.log(action);
			return action.data
		default:
			return state;
	}
};

export default productList;