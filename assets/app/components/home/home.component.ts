import { Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Employee } from '../../models/employee';
import { EmployeeAppState } from '../../app.states';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	employees: Observable<Employee[]>;

	constructor(
		private store: Store<EmployeeAppState>
		){
		
		this.employees = this.store.select('employees');
	}

	ngOnInit() {

	}

}
