import {compose} from '@ngrx/core/compose';
import {combineReducers} from '@ngrx/store';

import EmployeeListReducer, * as employees from './reducers/employee.list.reducer';

export default compose(combineReducers)({
    employees: EmployeeListReducer
});