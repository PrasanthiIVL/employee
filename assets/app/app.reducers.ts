import {compose} from '@ngrx/core/compose';
import {combineReducers} from '@ngrx/store';

import EmployeeListReducer, * as employees from './reducers/employee.list.reducer';
import EmployeeReducer from './reducers/employee.reducer';

export default compose(combineReducers)({
    employees: EmployeeListReducer,
    employee: EmployeeReducer
});