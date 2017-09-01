import { Action } from '@ngrx/store';
import { EmployeeAction } from '../actions/employee.action';

const defaultState: number = 0;

/*class ModifyCount implements Action{
	readonly type = 'MODIFYCOUNT';
	constructor (public newCount:number){};
}*/

export function empCountReducer(state: number = defaultState, action:EmployeeAction){

	console.log(action.type,state);

	switch (action.type) {
		case 'MODIFYCOUNT':
			return state = action.payload.count;
		
		default: return state;
	}
}