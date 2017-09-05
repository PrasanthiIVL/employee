import { Action } from '@ngrx/store';
import { Employee } from '../models/employee';

export const GET_EMPLOYEES = "Employee Get All";
export const GET_EMPLOYEES_SUCCESS = "Employee Get All Success";
export const GET_EMPLOYEES_FAIL = "Employee Get All Fail";

export const ADD_EMPLOYEE = "Employee Add";
export const ADD_EMPLOYEE_SUCCESS = "Employee Add Success";
export const ADD_EMPLOYEE_FAIL = "Employee Add Fail";

export class GetEmployees implements Action {
	readonly type = GET_EMPLOYEES;
	constructor(){}
}

/*export class GetEmployeesSuccess implements Action {
	readonly type = GET_EMPLOYEES_SUCCESS;
	constructor(
		public payload: Employee[]
		){}
}

export class GetEmployeesFail implements Action{
	readonly type = GET_EMPLOYEES_FAIL;
	constructor(
		public payload: any
		){}
}*/

export class AddEmployee implements Action {
	readonly type = ADD_EMPLOYEE;
	constructor(
		public payload: Employee
		){}
}

/*export class AddEmployeeSuccess implements Action {
	readonly type = ADD_EMPLOYEE_SUCCESS;
	constructor(
		public payload: Employee
		){}
}

export class AddEmployeeFail implements Action {
	readonly type = ADD_EMPLOYEE_FAIL;
	constructor(
		public payload: any
		){}
}*/

export type All
= GetEmployees
| AddEmployee;
// | GetEmployeesSuccess
// | GetEmployeesFail
// | AddEmployeeSuccess
// | AddEmployeeFail;