import * as contents from '../constans';

export interface Increment {
	type: contents.INCREMENT
}

export interface Decrement {
	type: contents.DECREMENT
}

export type EnthusiasmAction = Increment | Decrement;

export const increment = ():Increment => {
	return {
		type: contents.INCREMENT
	};
};

export const decrement = ():Decrement => {
	return {
		type: contents.DECREMENT
	};
};
