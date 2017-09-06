import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Action } from '@ngrx/store';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

import * as EmployeeActions from '../actions/employee.actions';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';

@Injectable()
export class EmployeeEffects{

	constructor(
		private actions: Actions,
		private employeeService: EmployeeService 
		){}

	index: number;

	@Effect() get$ = this.actions
		.ofType(EmployeeActions.GET_EMPLOYEES)
		.switchMap(() => { return this.employeeService.getEmployees() })
		.switchMap(res => {
			return Observable.of({type: EmployeeActions.GET_EMPLOYEES_SUCCESS, payload: res });
		})
		.catch(err => {
			return Observable.of({type: EmployeeActions.GET_EMPLOYEES_FAIL, payload: err });
		});


	@Effect() add$ = this.actions
						.ofType(EmployeeActions.ADD_EMPLOYEE)
						.switchMap((action) => {return this.employeeService.addEmployee(action.payload)}) 
						.switchMap( (employee:Employee) => {
							return Observable.of({type: EmployeeActions.ADD_EMPLOYEE_SUCCESS, payload: employee})
						})
						.catch( err => {
							return Observable.of({type: EmployeeActions.ADD_EMPLOYEE_FAIL, payload: err})
						});

	@Effect() delete$ = this.actions
							.ofType(EmployeeActions.DELETE_EMPLOYEE)
							.switchMap((action) => {
								this.index = action.payload.index;
								return this.employeeService.deleteEmployee(action.payload.id)
							})
							.switchMap(res => {
								return Observable.of({type: EmployeeActions.DELETE_EMPLOYEE_SUCCESS, payload:{result:res, index:this.index}})
							})
							.catch(err => {
								return Observable.of({type: EmployeeActions.DELETE_EMPLOYEE_FAIL, payload:err})
							})
}