import { Action } from '@ngrx/store';
import { EmpCountAction } from '../actions/emp.count.action';

const defaultState: number = 0;

export default function (state: number = defaultState, action:EmpCountAction): number{
	console.log(action.type);

	switch (action.type) {
		case 'MODIFYCOUNT':
			return state = action.payload.count;
		
		default: return state;
	}
}
