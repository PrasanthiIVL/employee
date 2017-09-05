import { Employee } from './models/employee';
import EmployeeListReducer, * as employees from './reducers/employee.reducer';
import {compose} from '@ngrx/core/compose';
import {combineReducers} from '@ngrx/store';

export class AppState{
	empCount: number;
}

export interface EmployeeAppState{
	employees: employees.EmployeeListState;
}

export default compose(combineReducers)({
    employees: EmployeeListReducer
});