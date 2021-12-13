import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, NgForm} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private userService : UserService  ) { }

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
    
  }

}
