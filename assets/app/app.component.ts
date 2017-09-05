import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Employee } from './models/employee';
//import { AppState } from './app.states';
import { EmployeeAppState } from './app.states';
import * as EmployeeActions from './actions/employee.actions';
//import { EmpCountAction } from './actions/emp.count.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{ 

	employees: Observable<Employee[]>;

	constructor(
			//private store: Store<AppState>,
      		private employeeStore: Store<EmployeeAppState>
		){}

	ngOnInit(){
		this.employeeStore.dispatch(new EmployeeActions.GetEmployees());
		this.employees = this.employeeStore.select('employees');
		//this.store.dispatch(new EmpCountAction('MODIFYCOUNT',{count:4}));
	}

}
