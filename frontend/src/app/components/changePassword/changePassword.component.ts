import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-changePassword',
  templateUrl: './changePassword.component.html',
  styleUrls: ['./changePassword.component.css']
})
export class ChangePasswordComponent implements OnInit {

  //Declaring changeForm
  changeForm = new FormGroup({})
  constructor(
    public fb: FormBuilder,
    public router: Router,
    private userService: UserService
  ) {
    // Reactive Form with validations
    this.changeForm = this.fb.group({
      oldPass: ['', [Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[$@$!%*#?&^])(?=[^A-Z]*[A-Z]).{8,30}$/)]],
      newPass: ['', [Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[$@$!%*#?&^])(?=[^A-Z]*[A-Z]).{8,30}$/)]],
      confirmNewPass: ['', Validators.required],
    },{validator: this.checkIfMatchingPasswords('newPass', 'confirmNewPass')})
  }
  
  //custom validator for new password and confirm new password
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

  Error = false;
  Errmsg = '';
  updated = false;
  msg = '';


  get newPass(){return this.changeForm.get('password')}
  get confirmNewPass(){return this.changeForm.get('confirmPassword')}

  submitted = false;

  get f() {
    return this.changeForm.controls;
  }

  onSubmit(){
    console.warn(this.changeForm.value);

    this.submitted = true;

    // stop here if form is invalid
    if (this.changeForm.invalid) {
      return;
    }

    this.success = JSON.stringify(this.changeForm.value);


    this.userService.changePassword(this.changeForm.value)
      .subscribe((response : any)=>{

        if(response.errCode === 422){

          //New Password is same as Old Password
          // Swal.fire({
          //       icon: 'error',
          //       title: 'Oops...',
          //       text: response.errMessage,
          //     })
          this.Error = true;
          this.updated = false;
          this.Errmsg = 'New Password can not be same as Old Password' ;
        }

        if(response.errCode === 401){

          //password is wrong
          // Swal.fire({
          //       icon: 'error',
          //       title: 'Oops...',
          //       text: response.errMessage,
          //     })
          this.Error = true;
          this.updated = false;
          this.Errmsg = 'Please enter the correct password' ;
        }

        if(response.status === 200){

          //Updated Successfully.
          // Swal.fire({
          //   icon: 'success',
          //   title: 'Congratulations!!',
          //   text: 'Password Changed Succefully',
          // })
          this.Error = false;
          this.updated = true;
          this.msg = 'Password Updated Successfully' ;
              var reload = () => {
                this.router.navigate(['/dashboard']);
              }
        
              setTimeout(reload, 2000)
          }
      })


  }


}
