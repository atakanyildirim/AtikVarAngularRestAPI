import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../register/register.component';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) {}

   /**
   * Add a new company
   * @param {string,string} - username and password
   * @returns boolean
   */
  public addCompany(registerForm:RegisterForm){
    var headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json"
    });
    return this.http.post<any>('http://localhost:3003/user', registerForm,{headers: headers});
  }
}
