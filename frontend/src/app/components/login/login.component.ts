import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, NgForm} from '@angular/forms';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private userService : UserService,
               private router: Router ) { }

  ngOnInit() {
  }

  success = '';
  //reactive form with validations
  logInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[$@$!%*#?&^])(?=[^A-Z]*[A-Z]).{8,30}$/)]),
  })

  //short hand index getters
  get email(){return this.logInForm.get('email')}
  get password(){return this.logInForm.get('password')}

  submitted = false;

  //For accessing form controls with ease.
  get f() {
    return this.logInForm.controls;
  }

  //Fuction which will called after submitting login form
  onLogin(){
    
    this.submitted = true;

    // stop here if form is invalid
    if (this.logInForm.invalid) {
      return;
    }

    //form value in success variable
    this.success = this.logInForm.value

    this.userService.authenticateUser(this.success).subscribe((res : any) => {

        if(res.errCode === 422){

          //Email not found
          Swal.fire({
            icon: 'error',
            title: 'Oops !',
            text: res.errMessage,
            footer: '<a href="/signup">Please click on the link to signup</a>'
          })
        }

        if(res.errCode === 401){

          //Wrong password
          Swal.fire({
            icon: 'error',
            title: 'Oops !',
            text: res.errMessage,
            footer: '<a href="/">Forget Password</a>'
          })
        }
        
        if(res.status === 200){

          //Login Successfully
          Swal.fire({
            icon: 'success',
            title: 'Congratulations!!',
            text: res.message
          })
          
          const userToken = jwt_decode(JSON.stringify(res.userToken));
          console.log(userToken)
      
          localStorage.setItem('userToken', JSON.stringify(userToken))

          var reload = () => {
            window.location.href = './index.html'
          }
  
          setTimeout(reload, 2000)
        }
      })
  }
}
