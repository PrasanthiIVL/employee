import { Action } from '@ngrx/store';

export class EmpCountAction implements Action{
	constructor(
		public type:string,
		public payload:{
			count: number
			}
		){}
}