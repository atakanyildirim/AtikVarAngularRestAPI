import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient) {}

  /**
   * Have the user logged in the system?
   * @returns boolean
   */
  public isLogged():boolean {
    if(localStorage.getItem("isLogged")=="true")
      return true;
    else
      return false;
  }

  /**
   * User can login the system with userName and password
   * @param {string,string} - username and password
   * @returns boolean
   */
  public logIn(username:string, password:string){
    var headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json"
    });
    return this.http.post<any>('http://localhost:3003/login', {username:username, password: password},{headers: headers});
  }
}
