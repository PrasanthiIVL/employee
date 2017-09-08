import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user';

@Injectable()
export class AuthService {

  constructor(
    private http: Http
    ) {  }


  public addUser(user: User){
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type' : 'application/json'});
    return this.http.post('http://localhost:3000/api/auth/signup',body, {headers: headers})
                  .map((response:Response) => {
                    return response.json().obj
                    })
                  .catch((error:Response) => Observable.throw(error.json()));
  }

  public signin(user: User){
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type' : 'application/json'});
    return this.http.post('http://localhost:3000/api/auth/signin',body, {headers: headers})
                  .map((response:Response) => {
                    //console.log(response.json().obj);
                    return response.json().obj;
                    })
                  .catch((error:Response) => Observable.throw(error.json()));
  }


}