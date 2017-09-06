import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Employee } from './models/employee';
//import { AppState } from './app.states';
import { EmployeeAppState } from './app.states';
import * as EmployeeListActions from './actions/employee.list.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{ 

	employees: Observable<Employee[]>;

	constructor(
      		private employeeStore: Store<EmployeeAppState>
		){}

	ngOnInit(){
		this.employeeStore.dispatch(new EmployeeListActions.GetEmployees());
		this.employees = this.employeeStore.select('employees');
	}

}
