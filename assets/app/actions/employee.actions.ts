import { Action } from '@ngrx/store';
import { Employee } from '../models/employee';

export const GET_EMPLOYEES = "Employee Get All";
export const GET_EMPLOYEES_SUCCESS = "Employee Get All Success";
export const GET_EMPLOYEES_FAIL = "Employee Get All Fail";

export class GetEmployees implements Action {
	readonly type = GET_EMPLOYEES;
	constructor(){}
}

export class GetEmployeesSuccess implements Action {
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
}

export type All
= GetEmployees
| GetEmployeesSuccess
| GetEmployeesFail;