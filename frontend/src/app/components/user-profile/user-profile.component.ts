import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup ,Validators} from '@angular/forms'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-manage',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers:[UserService]
})


export class UserProfileComponent implements OnInit { 
  
  constructor(
    private userSignupService:UserService,
    private router:ActivatedRoute,
  ){}

  //Fetch Customer data from database:
  userData : any;

  ngOnInit(){
   
   this.userSignupService.getUserById().subscribe((data : any) =>{ 
     this.userData=data  
     // console.log(data);
    })
  }

  manageprofileForm=new FormGroup({
    name:new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
    email:new FormControl('', [Validators.required, Validators.email]),
    contact:new FormControl('', [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]),
    add:new FormControl('', Validators.required),
    city:new FormControl('', Validators.required),
    state:new FormControl('', Validators.required),
    pincode:new FormControl('', [Validators.required,Validators.pattern(/[0-9\+\-\ ]/)]),
  
  })

   get name(){return this.manageprofileForm.get('name')}
   get email(){return this.manageprofileForm.get('email')}
   get contact() {return this.manageprofileForm.get('contact')}
   get add(){return this.manageprofileForm.get('add')}
   get city(){return this.manageprofileForm.get('city')}
   get state(){return this.manageprofileForm.get('state')}
   get pincode(){return this.manageprofileForm.get('pincode')}

  
  get f() {
    return this.manageprofileForm.controls;
  }

  submitted = false;
  success=' ';

  onSave(){
    
    this.submitted = true;
    // stop here if form is invalid
    if (this.manageprofileForm.invalid) {
      // alert('Form values are invalid')
      return;
    }
    
    this.success = JSON.stringify(this.manageprofileForm.value);
    //this.userSignupService.onSave(this.manageprofileForm.value).subscribe((data)=>{ 
    //this.userData=data });

    this.userSignupService.onSave(this.manageprofileForm.value)
      .subscribe((res : any)=>{ 

        if(res.errCode === 500){
          alert(res.errMessage)
        }

        if(res.status === 200){

          Swal.fire({
            icon: 'success',
            title: 'Congratulations!',
            text: res.message,
          })

          var reload = () => {
            window.location.reload()
          }
    
          setTimeout(reload, 1000)
        } 

      
      });
  }
    


  //ONclick of edit
  disabledBox= true;

  enableBox() {
    this.disabledBox = false;
  }
}
