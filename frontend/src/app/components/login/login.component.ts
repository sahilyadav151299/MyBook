import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    
    public fb: FormBuilder,
    public router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  success = '';

  logInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[$@$!%*#?&^])(?=[^A-Z]*[A-Z]).{8,30}$/)]),
  })
  get email(){return this.logInForm.get('email')}
  get password(){return this.logInForm.get('password')}

  submitted = false;

  get f() {
    return this.logInForm.controls;
  }

  onSignUp(){
    console.warn(this.logInForm.value);

    this.submitted = true;

    // stop here if form is invalid
    if (this.logInForm.invalid) {
      return;
    }

    this.success = JSON.stringify(this.logInForm.value);

    console.log(this.success);

    this.userService.login(this.logInForm.value)
      .subscribe((response) => {
      var msg = response['message'];
      if(msg == 'User email is not registered.'){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: msg,
        })
      }
      if(msg == 'Invalid Credentials'){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: msg,
        })
      }
      if(msg == 'Login Successfully'){
        Swal.fire({
          icon: 'success',
          title: 'Congratulations!!',
          text: 'You have successfully Loged in to your Account.',
        })
        localStorage.setItem('token',response['token'].toString());
      }
          console.log(response);
      });
    
  }

}
