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

	@Effect() update$ = this.actions
		.ofType(EmployeeActions.GET_EMPLOYEES)
		.switchMap(() => { return this.employeeService.getEmployees() })
		.switchMap(res => {
			return Observable.of({type: EmployeeActions.GET_EMPLOYEES_SUCCESS, payload: res });
		});

}