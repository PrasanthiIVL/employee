import { Action } from '@ngrx/store';

import { Employee } from '../models/employee';
import * as EmployeeActions from '../actions/employee.actions';

const initialState:Employee = null;

export default function(state = initialState, action: Action): Employee {

	switch(action.type) {
		case EmployeeActions.GET_EMPLOYEE:
			console.log(action.type);
			return state;

		case EmployeeActions.GET_EMPLOYEE_SUCCESS:
			console.log(action.type);
			return action.payload;

		case EmployeeActions.GET_EMPLOYEE_FAIL:
			console.log(action.type);
			console.log(action.payload);
			return initialState;

		case EmployeeActions.RESET_EMPLOYEE:
			console.log(action.type);
			return initialState;

		default:
			return state;
	}
}