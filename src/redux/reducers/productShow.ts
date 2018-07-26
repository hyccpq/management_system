import { Reducer } from 'redux';
import { EnthusiasmAction } from '../actions';
import { PRODUCT_SHOW_SUCCESS } from '../constans';

const productShow: Reducer<{}> = (state = {}, action: EnthusiasmAction) => {
	switch (action.type) {
		case PRODUCT_SHOW_SUCCESS:
			console.log(action);
			return action.data
		default:
			return state;
	}
};

export default productShow;