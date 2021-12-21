import { FormGroup, FormControl,Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

constructor() { }
submitted = false;
success = ''

passwordForm = new FormGroup({
password : new FormControl('', [ Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[$@$!%*#?&^])(?=[^A-Z]*[A-Z]).{8,30}$/)]),
     
  })
get password(){
  return this.passwordForm.get('new_password')
}

  get f() {
    return this.passwordForm.controls;
  }
  onReset(){
    console.warn(this.passwordForm.value);
    
    this.submitted = true;

    if (this.passwordForm.invalid) {
      return;
    }

}
ngOnInit(): void {}
}
   
