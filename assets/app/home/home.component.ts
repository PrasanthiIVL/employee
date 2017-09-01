import { Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../app.states';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	empCount:Observable<number>;

	constructor(
		private store: Store<AppState>
		){

		this.empCount = this.store.select('empCount');
	}

	ngOnInit() {

	}

}
