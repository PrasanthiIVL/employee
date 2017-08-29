import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from 'rxjs';

import { Employee } from '../models/employee';

@Injectable()
export class EmployeeService {

  constructor(
    private http: Http
    ) {  }

  public getEmployees(){
    return this.http.get('http://localhost:3000/api/employees')
                  .map((response:Response) => {
                    return response.json().obj
                    })
                  .catch((error:Response) => Observable.throw(error.json()));
  }

  public addEmployee(employee: Employee){
    const body = JSON.stringify(employee);
    const headers = new Headers({'Content-Type' : 'application/json'});
    return this.http.post('http://localhost:3000/api/employee',body, {headers: headers})
                  .map((response:Response) => {
                    return response.json().obj
                    })
                  .catch((error:Response) => Observable.throw(error.json()));
  }

  public modifyEmployee(employee: Employee){
    const body = JSON.stringify(employee);
    const headers = new Headers({'Content-Type' : 'application/json'});
    return this.http.put('http://localhost:3000/api/employee/'+employee._id,body, {headers: headers})
                  .map((response:Response) => {
                    return response.json().obj
                    })
                  .catch((error:Response) => Observable.throw(error.json()));
  }

  public getEmployee(id: string){
    return this.http.get('http://localhost:3000/api/employee/'+id)
                  .map((response:Response) => {
                    return response.json().obj
                    })
                  .catch((error:Response) => Observable.throw(error.json()));
  }

  public deleteEmployee(id: string){
    return this.http.delete('http://localhost:3000/api/employee/'+id)
                  .map((response:Response) => {
                    return response.json().obj
                    })
                  .catch((error:Response) => Observable.throw(error.json()));
  }

}
