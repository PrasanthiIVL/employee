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
    return this.http.get('http://localhost:3000/api/employee')
                  .map((response:Response) => {
                    return response.json().obj
                    })
                  .catch((error:Response) => Observable.throw(error.json()));
  }

  public addEmployee(employee: Employee){
    const body = JSON.stringify(employee);
    const token = localStorage.getItem('token')
                        ? '?token='+localStorage.getItem('token') 
                        : '';
    const headers = new Headers({'Content-Type' : 'application/json'});
    return this.http.post('http://localhost:3000/api/employee'+token,body, {headers: headers})
                  .map((response:Response) => {
                    return response.json().obj
                    })
                  .catch((error:Response) => Observable.throw(error.json()));
  }

  public modifyEmployee(employee: Employee){
    const body = JSON.stringify(employee);
    const headers = new Headers({'Content-Type' : 'application/json'});
    const token = localStorage.getItem('token')
                        ? '?token='+localStorage.getItem('token') 
                        : '';

    return this.http.put('http://localhost:3000/api/employee/'+employee._id+token,body, {headers: headers})
                  .map((response:Response) => {
                    return response.json().obj
                    })
                  .catch((error:Response) => Observable.throw(error.json()));
  }

  public getEmployee(id: string){

    /*const token = localStorage.getItem('token')
                        ? '?token='+localStorage.getItem('token') 
                        : '';*/

    return this.http.get('http://localhost:3000/api/employee/'+id)
                  .map((response:Response) => {
                    return response.json().obj
                    })
                  .catch((error:Response) => Observable.throw(error.json()));
  }

  public deleteEmployee(id: string){


    const token = localStorage.getItem('token')
                        ? '?token='+localStorage.getItem('token') 
                        : '';

    return this.http.delete('http://localhost:3000/api/employee/'+id+token)
                  .map((response:Response) => {
                    return response.json().obj
                    })
                  .catch((error:Response) => Observable.throw(error.json()));
  }

}
