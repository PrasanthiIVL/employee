import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from './employee/employee.component';

export const AppRoutes = 
	[
        {
          path: '',
          component: HomeComponent
        },
        {
          path: 'employee',
          component: EmployeeComponent
        }
     ]
