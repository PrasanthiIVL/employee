import { Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

// import { AppState } from '../app.states';
import { Employee } from '../models/employee';
import { EmployeeAppState } from '../app.states';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	// empCount:Observable<number>;
	employees: Observable<Employee[]>;

	constructor(
		private store: Store<EmployeeAppState>
		){

		//this.empCount = this.store.select('empCount');
		this.employees = this.store.select('employees');
	}

	ngOnInit() {

	}

}
