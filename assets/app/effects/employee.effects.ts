import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Action } from '@ngrx/store';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';


import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';
import * as EmployeeActions from '../actions/employee.actions';


@Injectable()
export class EmployeeEffects{

	constructor(
		private actions: Actions,
		private employeeService: EmployeeService 
		){}

	@Effect() get$ = this.actions
							.ofType(EmployeeActions.GET_EMPLOYEE)							
							.switchMap((action) => {return this.employeeService.getEmployee(action.payload)}) 
							.switchMap((employee:Employee) =>{
								return Observable.of({type: EmployeeActions.GET_EMPLOYEE_SUCCESS, payload:employee})
							})
							.catch(err => {
								return Observable.of({type: EmployeeActions.GET_EMPLOYEE_FAIL, payload: err})
							})

}