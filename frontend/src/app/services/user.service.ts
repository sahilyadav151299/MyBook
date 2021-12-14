import { Injectable } from '@angular/core';
import { User } from '../components/models/user.model';
import { PORT_NO } from '../util/config';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL = "http://localhost:3000/signup";


  // selectedUser: User = {
  //   name: '',
  //   email: '',
  //   password: '',
  //   confirmPassword: '',
  //   contactNumber:0
  // };

  constructor(private http : HttpClient) { }

  getUsers() {
    return this.http.get(this.baseURL)
  }

  register(userData: User){
    return this.http.post<any>(this.baseURL, userData);
  }
  
  
  changeAddress(newAddress : any){

    const data = {

      newAddress : newAddress,
      customerId : JSON.stringify('61ae03486c0db019cc97a622')
    }

    return this.http.post(`http://localhost:${PORT_NO}/user/address`, data )

  }

  getAddress(){

    const params = new HttpParams().set('customerId', JSON.stringify('61ae03486c0db019cc97a622'))
    
    return this.http.get(`http://localhost:${PORT_NO}/user/address`, {params : params} )
  }
}
