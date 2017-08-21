import { Injectable } from '@angular/core';
import { Employee } from './employee';

@Injectable()
export class EmployeeService {

  employees: Employee[];

  constructor() { 
  	this.employees = [
  		new Employee("ABC", "DEF", 20000),
  		new Employee("abc", "def", 20500)
  	];
  }

  public getEmployees(): Promise<Employee[]>{
  	return Promise.resolve(this.employees);
  }

  public addEmployee(employee: Employee): void {
    this.employees.push(employee);
  }

  public deleteEmployee(i: number):void{
    this.employees.splice(i,1);
  }

  public getEmployee(i:number): Employee{
    return this.employees[i];
  }

  public modifyEmployee(employee:Employee, i:number){
    this.employees[i] = employee;
  }

}
