import { Component, OnInit, Input } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

// import { AppState } from '../app.states';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';
// import { EmpCountAction } from '../actions/emp.count.action';
import { EmployeeAppState } from '../app.states';
import * as EmployeeActions from '../actions/employee.actions';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  
  //employees : Employee[];
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
      // private store: Store<AppState>,
      private employeeStore: Store<EmployeeAppState>
  	) {  }

  ngOnInit() {
    /*this.employeeService.getEmployees()
      .subscribe(
        (employees: Employee[]) => {
          this.employees = employees;
          //this.store.dispatch(new EmpCountAction('MODIFYCOUNT',{count:this.employees.length}));
          },
          error => console.error(error)
      ); */  
    this.resetEmployee();
    this.resetForm();
    this.employees = this.employeeStore.select('employees');
    //this.employeeStore.dispatch(new EmployeeActions.GetEmployees());
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
    this.employee._id = null;
	  this.employeeService.addEmployee(this.employee)
        .subscribe(
           (employee: Employee) => {
             console.log(employee);
             console.log("Employee is added: "+ employee.firstName+" "+employee.lastName);
             //this.employees.push(employee);
             // this.store.dispatch(new EmpCountAction('MODIFYCOUNT',{count:this.employees.length}));
             },
           error => console.error(error)
          );
    // this.employeeStore.dispatch(new EmployeeActions.AddEmployee(this.employee));
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
    this.employeeService.deleteEmployee(id)
          .subscribe(
            data => {
             console.log("Employee deleted");
             // this.employees.splice(i,1);
             // this.store.dispatch(new EmpCountAction('MODIFYCOUNT',{count:this.employees.length}));
            },
            error => console.error(error)
          );
  }

 /* showEmployee$(){
    console.log(this.employee$);
  }*/
}

