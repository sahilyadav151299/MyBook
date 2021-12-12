import { Injectable } from '@angular/core';
import { User } from '../components/models/user.model';
import { HttpClient } from '@angular/common/http';
import { PORT_NO } from '../util/config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser: User = {
    name: '',
    email: '',
    password: '',
    confirmPassword:'',
    contactNumber:0
  };

  constructor(private http : HttpClient) { }

  changeAddress(newAddress : any){

    const data = {

      newAddress : newAddress,
      customerId : JSON.stringify('61ae03486c0db019cc97a622')
    }

    return this.http.post(`http://localhost:${PORT_NO}/user/address`, data )

  }

}
