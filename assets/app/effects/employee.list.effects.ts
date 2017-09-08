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
						.switchMap((action) => {
							// console.log("calling add route: "+ action.payload.firstName);
							return this.employeeService.addEmployee(action.payload)
								.switchMap( (employee:Employee) => {
									// console.log("got Result " + employee);
									return Observable.of({type: EmployeeListActions.ADD_EMPLOYEE_SUCCESS, payload: employee})
								})
								.catch( err => {
									// console.log("got error: "+ err);
									return Observable.of({type: EmployeeListActions.ADD_EMPLOYEE_FAIL, payload: err})
								});
						}) 
						

	@Effect() delete$ = this.actions
							.ofType(EmployeeListActions.DELETE_EMPLOYEE)
							.switchMap((action) => {
								this.index = action.payload.index;
								return this.employeeService.deleteEmployee(action.payload.id)								
								.switchMap(res => {
									return Observable.of({type: EmployeeListActions.DELETE_EMPLOYEE_SUCCESS, payload:{result:res, index:this.index}})
								})
								.catch(err => {
									return Observable.of({type: EmployeeListActions.DELETE_EMPLOYEE_FAIL, payload:err})
								})
							})

	@Effect() modify$ = this.actions
								.ofType(EmployeeListActions.MODIFY_EMPLOYEE)
								.switchMap( (action) =>{
									this.index = action.payload.index;
									return this.employeeService.modifyEmployee(action.payload.employee)
									.switchMap((employee:Employee) => {
										return Observable.of({type: EmployeeListActions.MODIFY_EMPLOYEE_SUCCESS, payload: {employee: employee, index: this.index}})
									})
									.catch(err => {
										return Observable.of({type: EmployeeListActions.MODIFY_EMPLOYEE_FAIL, payload: err})
									})
								})
}