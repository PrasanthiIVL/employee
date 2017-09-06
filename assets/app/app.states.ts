import { Employee } from './models/employee';

export interface EmployeeListAppState{
	employees: Employee[];
}

export interface EmployeeAppState{
	employee: Employee;
}

