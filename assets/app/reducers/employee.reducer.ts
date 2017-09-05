import * as EmployeeActions from '../actions/employee.actions';
import { Employee } from '../models/employee';

export type Action = EmployeeActions.All;
export type EmployeeListState = Employee[];
const initialState: EmployeeListState = [];

export default function(state = initialState, action: Action): EmployeeListState  {
	console.log(action.type);
	switch(action.type) {
		case EmployeeActions.GET_EMPLOYEES :
			return state;

		case EmployeeActions.GET_EMPLOYEES_SUCCESS:
			console.log(action.payload);
			return action.payload;

		case EmployeeActions.GET_EMPLOYEES_FAIL:
			return { ...state, ...action.payload };

		default: return state;
	}	
}