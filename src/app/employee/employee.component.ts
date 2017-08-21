import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  @Input() employees : Employee[];
  employee: Employee;
  showModifyButton = false;
  index = -1;

  constructor(
  	  private employeeService: EmployeeService
  	) { }

  ngOnInit() {
  	this.employeeService.getEmployees()
      .then(employees => this.employees = employees);

    this.employee = {
      firstName: "",
      lastName : "",
      salary : 0
    };
  }

  addEmployee(): void {
  	  this.employeeService.addEmployee(this.employee);
      this.employee = {
        firstName: "",
        lastName : "",
        salary : 0
      };
    }

  deleteEmployee(i:number): void{
    this.employeeService.deleteEmployee(i);
  }

  getEmployee(i:number): void{
      this.employee = this.employeeService.getEmployee(i);
      this.showModifyButton = true;
      this.index = i;
    }

  modifyEmployee(){
     this.employeeService.modifyEmployee(this.employee,this.index);
     this.employee = {
        firstName: "",
        lastName : "",
        salary : 0
      };
     this.showModifyButton = false;
     this.index = -1;
  }
}
