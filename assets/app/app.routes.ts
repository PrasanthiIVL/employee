import { HomeComponent } from './components/home/home.component';
import { EmployeeComponent } from './components/employee/employee.component';

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
