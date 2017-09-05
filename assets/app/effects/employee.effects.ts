import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

import * as EmployeeActions from '../actions/employee.actions';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';
export type Action = EmployeeActions.All;

@Injectable()
export class EmployeeEffects{

	constructor(
		private actions: Actions,
		private employeeService: EmployeeService 
		){}


	@Effect()
	getEmployees: Observable<Action> = this.actions.ofType(EmployeeActions.GET_EMPLOYEES)
											.map((action:EmployeeActions.GetEmployees) => this.employeeService.getEmployees)
											.map(
												employees => {
													return new EmployeeActions.GetEmployeesSuccess(employees);
												})
											.catch(err => {
												return new EmployeeActions.GetEmployeesFail({error: err.message})
											})

}