import { UserService } from './../../services/user.service';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(
    private router: Router
  ) { }
  submitted = false;
  success = ''

  forgotPassword = new FormGroup({
    email: new FormControl('',Validators.required)
  })
  get email(){
    return this.forgotPassword.get('email')
  }

  get f(){
     return this.forgotPassword.controls;
  }
 onSubmit(){
   this.submitted = true
   if(this.forgotPassword.invalid){
     return;
   }
   this.success = JSON.stringify(this.forgotPassword.value);
   console.log(this.success)
   alert('Link has been sent to your email')
   this.router.navigate(['/resetPassword'])
  }

  
  ngOnInit(): void {
  }

}
