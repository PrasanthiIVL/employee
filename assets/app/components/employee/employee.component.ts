import { Component, OnInit, Input } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeListAppState } from '../../app.states';
import { EmployeeAppState } from '../../app.states';
import * as EmployeeListActions from '../../actions/employee.list.actions';
import * as EmployeeActions from '../../actions/employee.actions';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  
  employee: Observable<Employee>;
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
      private employeeListStore: Store<EmployeeListAppState>,
      private employeeStore: Store<EmployeeAppState>
  	) {  }

  ngOnInit() {
    this.employees = this.employeeListStore.select('employees');
    this.employee = this.employeeStore.select('employee');    
    this.employee.subscribe((employee:Employee) => {
      this.emp = employee
    })    
    this.resetForm();
    this.resetEmployee();
  }

  resetForm(){
    this.rForm = this.fb.group({
      'firstName': [this.emp.firstName, Validators.required],
      'lastName': [this.emp.lastName, Validators.required],
      'salary' : [this.emp.salary, Validators.required],
    });
  }

  resetEmployee(){
    this.employeeStore.dispatch(new EmployeeActions.ResetEmployee());
    this.emp = {
      _id: "",
      firstName: "",
      lastName: "",
      salary: 0
    }
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
    this.employeeListStore.dispatch(new EmployeeListActions.AddEmployee(this.emp));
    this.resetEmployee();
    this.resetForm();
    this.hideModal();
  }


  getEmployee(id: string, i: number): void{
    this.employeeStore.dispatch(new EmployeeActions.GetEmployee(id));
    this.employee.subscribe((employee:Employee) => {
      this.emp = employee
    })
    this.showModal();
    this.showModifyButton = true;
    this.index = i;
  }

  modifyEmployee(): void {
    this.employeeListStore.dispatch(new EmployeeListActions.ModifyEmployee({employee:this.emp,index:this.index}));
    this.showModifyButton = false;
    this.resetEmployee();
    this.resetForm();
    this.hideModal();
  }


  deleteEmployee(id: string,i:number): void{
    this.employeeListStore.dispatch(new EmployeeListActions.DeleteEmployee({id:id,index:i}));
  }
}

