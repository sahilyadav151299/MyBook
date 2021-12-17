import { UserService } from './../../services/user.service';
import { Component, OnInit, } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-signUp',
  templateUrl: './signUp.component.html',
  styleUrls: ['./signUp.component.css'],
  providers: [UserService]
})

export class SignUpComponent implements OnInit {

  constructor(
    public fb: FormBuilder,
    public router: Router,
    private userService: UserService
  ) {
    // Reactive Form
    this.signUpForm = this.fb.group({
      name:[ '', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[$@$!%*#?&^])(?=[^A-Z]*[A-Z]).{8,30}$/)]],
      confirmPassword: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]],
    },{validator: this.checkIfMatchingPasswords('password', 'confirmPassword')})
  }
  
  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
          passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true})
      }
      else {
          return passwordConfirmationInput.setErrors(null);
      }
    }
  }
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

    this.userService.register(this.signUpForm.value)
      .subscribe((response : any) => {

      if(response.errCode === 409){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.errMessage,
        })
      }

      if(response.status === 200){
        Swal.fire({
          icon: 'success',
          title: 'Congratulations!!',
          text: 'You have successfully Created your Account.',
          footer: '<a href="/login">Please click on the link to Login</a>'
        })

        var reload = () => {
          this.router.navigate(['/login']);
        }
  
        setTimeout(reload, 2000)
      }

      
    });
  }
}
