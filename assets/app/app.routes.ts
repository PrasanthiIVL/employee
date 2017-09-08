import { HomeComponent } from './components/home/home.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { AuthComponent } from './components/auth/auth.component';


export const AppRoutes = 
	[
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'employee',
        component: EmployeeComponent
      },
      {
        path: 'auth',
        component: AuthComponent
      },
   ]
