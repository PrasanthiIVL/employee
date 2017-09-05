import * as EmployeeActions from '../actions/employee.actions';
import { Employee } from '../models/employee';

export type Action = EmployeeActions.All;

export function employeeReducer(state: Employee, action: Action) {
	
	switch(action.type) {

		case EmployeeActions.GET_EMPLOYEES :
			return state;

		case EmployeeActions.GET_EMPLOYEES_SUCCESS:
			return { ...state, ...action.payload  };

		case EmployeeActions.GET_EMPLOYEES_FAIL:
			return { ...state, ...action.payload };

		default: return state;
	}	
}