import { Injectable } from '@angular/core';
import { User } from '../components/models/user.model';

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
  constructor() { }
}
