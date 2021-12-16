import { Injectable } from '@angular/core';
import { User } from '../components/models/user.model';
import { PORT_NO } from '../util/config';
import { userToken } from '../util/config';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  register(userData: User){

    return this.http.post<any>(`http://localhost:${PORT_NO}/auth/signup`, userData);
  }

  authenticateUser(credentials : any){

    return this.http.post(`http://localhost:${PORT_NO}/auth/login`, credentials)
  }
  
  changeAddress(newAddress : any){

    const data = {

      newAddress : newAddress,
      customerId : userToken.userId
    }

    return this.http.post(`http://localhost:${PORT_NO}/user/address`, data )

  }

  getAddress(){

    const params = new HttpParams().set('customerId', userToken.userId)
    
    return this.http.get(`http://localhost:${PORT_NO}/user/address`, {params : params} )
  }
}
