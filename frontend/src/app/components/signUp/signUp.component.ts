import { UserService } from './../../services/user.service';
import { Component, OnInit, } from '@angular/core';
import {FormGroup, FormControl, Validators, NgForm} from '@angular/forms';
import { NgModule } from '@angular/core';


@Component({
  selector: 'app-signUp',
  templateUrl: './signUp.component.html',
  styleUrls: ['./signUp.component.css'],
  providers: [UserService]
})
export class SignUpComponent implements OnInit {
  constructor(public userService: UserService){}
  ngOnInit(): void {
  }

  success = '';

  signUpForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[$@$!%*#?&^])(?=[^A-Z]*[A-Z]).{8,30}$/)]),
    confirmPassword: new FormControl('', Validators.required),
    contactNumber: new FormControl('', [Validators.required, Validators.min(1000000000), Validators.max(9999999999)])
  })
  get email(){return this.signUpForm.get('email')}
  get name(){return this.signUpForm.get('name')}
  get password(){return this.signUpForm.get('password')}
  get confirmPassword(){return this.signUpForm.get('confirmPassword')}
  get contactNumber(){return this.signUpForm.get('contactNumber')}

  submitted = false;

  get f() {
    return this.signUpForm.controls;
  }

  onSignUp(){
    console.warn(this.signUpForm.value);

    this.submitted = true;

    // stop here if form is invalid
    if (this.signUpForm.invalid) {
      return;
    }

    this.success = JSON.stringify(this.signUpForm.value);

    
    
  }
}
