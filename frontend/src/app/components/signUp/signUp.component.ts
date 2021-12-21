import { UserService } from './../../services/user.service';
import { Component, OnInit, } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';

//Import For responsive alerts
import Swal from 'sweetalert2';


@Component({
  selector: 'app-signUp',
  templateUrl: './signUp.component.html',
  styleUrls: ['./signUp.component.css'],
  providers: [UserService]
})

export class SignUpComponent implements OnInit {


  //Declaring form of FormGroup Type
  signUpForm = new FormGroup({});
  constructor(
    public fb: FormBuilder,
    public router: Router,
    private userService: UserService
  ) {
    // Reactive Form
    // Form validations
    this.signUpForm = this.fb.group({
      name:[ '', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[$@$!%*#?&^])(?=[^A-Z]*[A-Z]).{8,30}$/)]],
      confirmPassword: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]],
    },{validator: this.checkIfMatchingPasswords('password', 'confirmPassword')})
  }

  //Custom Validator for password and confirm password
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

  

  //short hand index getters

  get password(){return this.signUpForm.get('password')}
  get confirmPassword(){return this.signUpForm.get('confirmPassword')}

  submitted = false;

  //For accessing form controls with ease.
  get f() {
    return this.signUpForm.controls;
  }

  //Fuction which will called after submitting signUp form
  onSignUp(){
    console.warn(this.signUpForm.value);

    this.submitted = true;

    // stop here if form is invalid
    if (this.signUpForm.invalid) {
      return;
    }

    //form value in string format
    this.success = JSON.stringify(this.signUpForm.value);

    this.userService.register(this.signUpForm.value)
      .subscribe((response : any) => {

      if(response.errCode === 409){
        //Email Already Exists
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Email is already registered`,
        })
      }

      if(response.status === 200){
        //Registered successfully
        Swal.fire({
          icon: 'success',
          title: 'Congratulations!!',
          text: 'You have successfully Created your Account.',
        })

        var reload = () => {
          this.router.navigate(['/login']);
        }
  
        setTimeout(reload, 2000)
      }

      
    });
  }
}
