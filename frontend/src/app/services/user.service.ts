import { Injectable } from '@angular/core';
import { User } from '../components/models/user.model';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseURL = "http://localhost:3000/";


  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(this.baseURL)
  }

  register(userData: User){
    return this.http.post<any>(this.baseURL +'signup', userData);
  }

  login(userData: User){
    return this.http.post<any>(this.baseURL+'login', userData);
  }

}
