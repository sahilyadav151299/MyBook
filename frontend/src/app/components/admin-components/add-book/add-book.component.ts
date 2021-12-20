import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})

export class AddBookComponent implements OnInit {

  bookForm:FormGroup;
  
  constructor( private formBuilder:FormBuilder,
               private router:Router,
               private ngZone:NgZone,
               private crudApi:CrudService 
               ) { 

      this.bookForm = this.formBuilder.group({
         name: [''],
         author: [''],
         category: [''],
         publishDate: [''],
         totalQuantity: [''],
         file: ['']         
      })
  }

  ngOnInit(): void { }

    onSubmit():any{

      // const formData = new FormData();

      // console.log(this.bookForm.value)

      // Object.entries(this.bookForm.value).forEach(
      //   ([key, value]: any[]) => {
      //     formData.set(key, value);
      // })

      // console.log(formData)

      this.crudApi
        .AddBook(this.bookForm.value)
        .subscribe((res:any)=>{

          console.log(res)

          if(res.status == 500){
            alert(res.message)
          }

          if(res.status == 200){

            Swal.fire({
              icon: 'success',
              text: res.message
            })
           
            this.ngZone.run(() => this.router.navigateByUrl('/book-list'))
          }
          
        },(err : any) => {
          console.log(err)
      });
  }


  // Book image upload

	url: any; 
	msg = "";

	selectFile(event: any) {

		if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image!';
			return;
    }
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported!";
			return;
		}
		
    var reader = new FileReader();
    
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.msg = "";
      this.url = reader.result;
    }

    // if (event.target.files && event.target.files.length) {

    //     const [file] = event.target.files;

    //     this.bookForm.patchValue({
    //       ["file"]: file
    //     });    
    // }
	}
}