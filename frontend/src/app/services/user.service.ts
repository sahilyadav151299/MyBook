import { Injectable } from '@angular/core';
import { User } from '../components/models/user.model';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  // selectedUser: User = {
  //   name: '',
  //   email: '',
  //   password: '',
  //   confirmPassword:'',
  //   contactNumber:0
  // };
  baseURL = "http://localhost:3000/signup";
  // headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(this.baseURL)
  }

   //register user

  // addUser(name: string, email: string, password: string, confirmPassword: string, contactNumber: number): Observable<any> {
  //   var formData: any = new FormData();
  //   formData.append("name", name);
  //   formData.append("email", email);
  //   formData.append("password", password);
  //   formData.append("confirmPassword", confirmPassword);
  //   formData.append("contactNumber", contactNumber);

    

  //   return this.http.post<User>(`${this.baseURL}signup`, formData, {
  //     reportProgress: true,
  //     observe: 'events'
  //   },)
  // }

  //   // Error handling 
  //   errorMgmt(error: HttpErrorResponse) {
  //     let errorMessage = '';
  //     if (error.error instanceof ErrorEvent) {
  //       // Get client-side error
  //       errorMessage = error.error.message;
  //     } else {
  //       // Get server-side error
  //       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //     }
  //     console.log(errorMessage);
  //     return throwError(errorMessage);
  //   }


  register(userData: User){
    return this.http.post<any>(this.baseURL, userData);
  }

}
