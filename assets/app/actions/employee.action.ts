import { Action } from '@ngrx/store';

export class EmployeeAction implements Action{
	constructor(
		public type:string,
		public payload:{
			count: number
			}
		){}
}