import { Action } from '@ngrx/store';

export const GET_EMPLOYEE = "Employee Get";
export const GET_EMPLOYEE_SUCCESS = "Employee Get Success";
export const GET_EMPLOYEE_FAIL = "Employee Get Fail";
export const RESET_EMPLOYEE = "Employee Reset";



export class GetEmployee implements Action{
	readonly type  = GET_EMPLOYEE;
	constructor(
		public payload: string
		){}
}

export class ResetEmployee implements Action{
	readonly type = RESET_EMPLOYEE;
	constructor(){}
}
