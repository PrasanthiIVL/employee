import * as EmployeeActions from '../actions/employee.actions';
import { Employee } from '../models/employee';
import { Action } from '@ngrx/store';

export type EmployeeListState = Employee[];
const initialState: EmployeeListState = null;

export default function(state = initialState, action: Action): EmployeeListState  {
	console.log(action.type);
	
	switch(action.type) {
		case EmployeeActions.GET_EMPLOYEES :
			return state;

		case EmployeeActions.GET_EMPLOYEES_SUCCESS:
			console.log(action.payload);
			return action.payload;

		case EmployeeActions.GET_EMPLOYEES_FAIL:{
			console.log(action.payload);
			return state;
		}

		case EmployeeActions.ADD_EMPLOYEE:
			return state;
		

		case EmployeeActions.ADD_EMPLOYEE_SUCCESS:
			return state.concat(action.payload);

		case EmployeeActions.ADD_EMPLOYEE_FAIL:
			console.log(action.payload);
			return state;

		case EmployeeActions.DELETE_EMPLOYEE:
			return state;

		case EmployeeActions.DELETE_EMPLOYEE_SUCCESS:
			console.log(action.payload.result);
			let newState:EmployeeListState = state;
			newState.splice(action.payload.index,1)
			return newState;

		case EmployeeActions.DELETE_EMPLOYEE_FAIL:
			console.log(action.payload);
			return state;

		default: return state;
	}	
}