import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})

export class AddBookComponent implements OnInit {
  
  image : any

  bookData : any = {
    bookName : '',
    author : '',
    category : '',
    publishDate : '',
    totalQuantity : ''
  }

  url: any; 
	msg = "";

  constructor( private crudService : CrudService,
               private router : Router,
               private ngZone : NgZone, ) { }

  ngOnInit(): void { }

  selectFile(event : any){

    if(!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image!';
      return;
    }

    var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported!";
			return;
		}

    if(event.target.files.length > 0){

      const file = event.target.files[0]
      this.image = file
    }

    var reader = new FileReader();
    
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.msg = "";
      this.url = reader.result;
    }
  }

  onSubmit(){

    const formData = new FormData();

    formData.append('file', this.image);
    formData.append('bookName', this.bookData.bookName)
    formData.append('author', this.bookData.author)
    formData.append('category', this.bookData.category)
    formData.append('publishDate', this.bookData.publishDate)
    formData.append('totalQuantity', this.bookData.totalQuantity)

    this.crudService
      .AddBook(formData)
      .subscribe((res : any) => {
        
        if(res.status === 200){
          
          Swal.fire({
            icon: 'success',
            text: res.message
          })
  
          // this.ngZone.run(()=>{
          //   this.router.navigateByUrl('/book-list')
          // })

          window.location.reload()
        }

        if(res.status === 500){
          
          Swal.fire({
            icon: 'error',
            text: res.message
          })

        }  
    })

  }
}