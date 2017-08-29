import { Component, OnInit, Input } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  
  employees : Employee[];
  employee: Employee;

  index: number = -1;
  emp:Employee;

  rForm: FormGroup;  
  titleAlert:string = 'This field is required';

  showModifyButton = false;
  displayModal: boolean = false;

  constructor(
  	  private employeeService: EmployeeService,
      private fb: FormBuilder
  	) {  }

  ngOnInit() {
    this.employeeService.getEmployees()
      .subscribe(
        (employees: Employee[]) => {
          this.employees = employees;
          },
          error => console.error(error)
      );   
    this.resetEmployee();
    this.resetForm();
  }

  resetForm(){
    this.rForm = this.fb.group({
      'firstName': [this.employee.firstName, Validators.required],
      'lastName': [this.employee.lastName, Validators.required],
      'salary' : [this.employee.salary, Validators.required],
    });
  }

  resetEmployee(){
    this.employee = {
      firstName: "",
      lastName : "",
      salary : 0
    };
  }

  showModal() {
    this.displayModal = true;
  }

  hideModal() {
    this.displayModal = false;    
  }

  cancelOperation() {
    this.resetEmployee();
    this.resetForm();
    this.hideModal();
  }

  getAddEmployeeForm(){
    this.showModal();
    this.showModifyButton = false;
  }

  addEmployee(): void {
	  this.employeeService.addEmployee(this.employee)
        .subscribe(
           (employee: Employee) => {
             console.log("Employee is added: "+ employee.firstName+" "+employee.lastName);
             this.employees.push(employee);
             },
           error => console.error(error)
          );
    this.resetEmployee();
    this.resetForm();
    this.hideModal();
  }


  getEmployee(id: string, i: number): void{
    this.employeeService.getEmployee(id)
        .subscribe(
          (employee: Employee) => {
            this.employee = employee;
            },
           error => console.error(error)
        );
    this.showModal();
    this.showModifyButton = true;
    this.index = i;
  }

  modifyEmployee(): void {
    this.emp = this.employee;
    this.employeeService.modifyEmployee(this.employee)
        .subscribe(
          data => {
             console.log("Employee modified");
             this.employees[this.index] = this.emp;
           },
           error => console.error(error)
        );
    this.showModifyButton = false;
    this.resetEmployee();
    this.resetForm();
    this.hideModal();
  }


  deleteEmployee(id: string,i:number): void{
    this.employeeService.deleteEmployee(id)
          .subscribe(
            data => {
             console.log("Employee deleted");
             this.employees.splice(i,1);
            },
            error => console.error(error)
          );
  }
}
