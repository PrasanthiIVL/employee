import { Component, OnInit, Input } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeAppState } from '../../app.states';
import * as EmployeeActions from '../../actions/employee.actions';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  
  employee: Employee;

  employees: Observable<Employee[]>;

  index: number = -1;
  emp:Employee;

  rForm: FormGroup;  
  titleAlert:string = 'This field is required';

  showModifyButton = false;
  displayModal: boolean = false;

  constructor(
  	  private employeeService: EmployeeService,
      private fb: FormBuilder,
      private employeeStore: Store<EmployeeAppState>
  	) {  }

  ngOnInit() {
    this.resetEmployee();
    this.resetForm();
    this.employees = this.employeeStore.select('employees');
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
      _id:"",
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
    this.employeeStore.dispatch(new EmployeeActions.AddEmployee(this.employee));
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
          (employee: Employee) => {
             console.log("Employee modified :"+ employee.firstName+" "+employee.lastName);
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
    this.employeeStore.dispatch(new EmployeeActions.DeleteEmployee({id:id,index:i}));
  }
}

