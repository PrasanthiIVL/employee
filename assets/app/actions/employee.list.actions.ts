import { Action } from '@ngrx/store';
import { Employee } from '../models/employee';

export const GET_EMPLOYEES = "Employee Get All";
export const GET_EMPLOYEES_SUCCESS = "Employee Get All Success";
export const GET_EMPLOYEES_FAIL = "Employee Get All Fail";

export const ADD_EMPLOYEE = "Employee Add";
export const ADD_EMPLOYEE_SUCCESS = "Employee Add Success";
export const ADD_EMPLOYEE_FAIL = "Employee Add Fail";

export const DELETE_EMPLOYEE = "Employee Delete";
export const DELETE_EMPLOYEE_SUCCESS = "Employee Delete Success";
export const DELETE_EMPLOYEE_FAIL = "Employee Delete Fail";

export const MODIFY_EMPLOYEE = "Employee Modify";
export const MODIFY_EMPLOYEE_SUCCESS = "Employee Modify Success";
export const MODIFY_EMPLOYEE_FAIL = "Employee Modify Fail";

export class GetEmployees implements Action {
	readonly type = GET_EMPLOYEES;
	constructor(){}
}

export class AddEmployee implements Action {
	readonly type = ADD_EMPLOYEE;
	constructor(
		public payload: Employee
		){}
}

export class DeleteEmployee implements Action{
	readonly type = DELETE_EMPLOYEE;
	constructor(
		public payload: {
				id: string,
				index: number
			}
		){}
}


export class ModifyEmployee implements Action{
	readonly type = MODIFY_EMPLOYEE;
	constructor(
		public payload:{
				employee: Employee,
				index: number
			}
		){ }
}
