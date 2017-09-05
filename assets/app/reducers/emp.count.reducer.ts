import { Action } from '@ngrx/store';
import { EmpCountAction } from '../actions/emp.count.action';

const defaultState: number = 0;

/*class ModifyCount implements Action{
	readonly type = 'MODIFYCOUNT';
	constructor (public newCount:number){};
}*/

export function empCountReducer(state: number = defaultState, action:EmpCountAction){

	switch (action.type) {
		case 'MODIFYCOUNT':
			return state = action.payload.count;
		
		default: return state;
	}
}