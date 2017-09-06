import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Action } from '@ngrx/store';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

import * as EmployeeListActions from '../actions/employee.list.actions';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';

@Injectable()
export class EmployeeListEffects{

	constructor(
		private actions: Actions,
		private employeeService: EmployeeService 
		){}

	index: number;

	@Effect() get$ = this.actions
		.ofType(EmployeeListActions.GET_EMPLOYEES)
		.switchMap(() => { return this.employeeService.getEmployees() })
		.switchMap(res => {
			return Observable.of({type: EmployeeListActions.GET_EMPLOYEES_SUCCESS, payload: res });
		})
		.catch(err => {
			return Observable.of({type: EmployeeListActions.GET_EMPLOYEES_FAIL, payload: err });
		});


	@Effect() add$ = this.actions
						.ofType(EmployeeListActions.ADD_EMPLOYEE)
						.switchMap((action) => {return this.employeeService.addEmployee(action.payload)}) 
						.switchMap( (employee:Employee) => {
							return Observable.of({type: EmployeeListActions.ADD_EMPLOYEE_SUCCESS, payload: employee})
						})
						.catch( err => {
							return Observable.of({type: EmployeeListActions.ADD_EMPLOYEE_FAIL, payload: err})
						});

	@Effect() delete$ = this.actions
							.ofType(EmployeeListActions.DELETE_EMPLOYEE)
							.switchMap((action) => {
								this.index = action.payload.index;
								return this.employeeService.deleteEmployee(action.payload.id)
							})
							.switchMap(res => {
								return Observable.of({type: EmployeeListActions.DELETE_EMPLOYEE_SUCCESS, payload:{result:res, index:this.index}})
							})
							.catch(err => {
								return Observable.of({type: EmployeeListActions.DELETE_EMPLOYEE_FAIL, payload:err})
							})
}