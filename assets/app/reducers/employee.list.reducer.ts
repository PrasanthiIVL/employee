import * as EmployeeListActions from '../actions/employee.list.actions';
import { Employee } from '../models/employee';
import { Action } from '@ngrx/store';

export type EmployeeListState = Employee[];
const initialState: EmployeeListState = null;

export default function(state = initialState, action: Action): EmployeeListState  {
	
	switch(action.type) {
		case EmployeeListActions.GET_EMPLOYEES :
			console.log(action.type);
			return state;

		case EmployeeListActions.GET_EMPLOYEES_SUCCESS:
			console.log(action.type);
			console.log(action.payload);
			return action.payload;

		case EmployeeListActions.GET_EMPLOYEES_FAIL:{
			console.log(action.type);
			console.log(action.payload);
			return state;
		}

		case EmployeeListActions.ADD_EMPLOYEE:
			console.log(action.type);
			return state;
		
		case EmployeeListActions.ADD_EMPLOYEE_SUCCESS:
			console.log(action.type);
			return state.concat(action.payload);

		case EmployeeListActions.ADD_EMPLOYEE_FAIL:
			console.log(action.type);
			console.log(action.payload);
			return state;

		case EmployeeListActions.DELETE_EMPLOYEE:
			console.log(action.type);
			return state;

		case EmployeeListActions.DELETE_EMPLOYEE_SUCCESS:
			console.log(action.type);
			console.log(action.payload.result);
			let newState:EmployeeListState = state;
			newState.splice(action.payload.index,1)
			return newState;

		case EmployeeListActions.DELETE_EMPLOYEE_FAIL:
			console.log(action.type);
			console.log(action.payload);
			return state;

		default: 
			return state;
	}	
}