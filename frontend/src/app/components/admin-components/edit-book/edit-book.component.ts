import { Component, NgZone, OnInit, Sanitizer } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})

export class EditBookComponent implements OnInit {

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
  bookId : any

  constructor( private crudService : CrudService,
               private router : Router,
               private ngZone : NgZone,
               private activatedRoute : ActivatedRoute,
               private domSanitizer : DomSanitizer ) { }

   ngOnInit(): void { 

    this.bookId = this.activatedRoute.snapshot.paramMap.get('id');

    this.crudService
      .getBook(this.bookId)
      .subscribe((res : any) => {

        this.bookData.bookName = res.book_name
        this.bookData.author = res.author
        this.bookData.category = res.category_name
        this.bookData.publishDate = res.publish_date
        this.bookData.totalQuantity = res.total_book_quantity

        let TYPED_ARRAY = new Uint8Array(res.book_cover.data.data)
        
        const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
          return data + String.fromCharCode(byte);
        }, '')
         
        let base64String = btoa(STRING_CHAR);
        
        this.url = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + base64String)
      })
  }

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

    

    if(this.image === undefined){

      formData.append('bookName', this.bookData.bookName)
      formData.append('author', this.bookData.author)
      formData.append('category', this.bookData.category)
      formData.append('publishDate', this.bookData.publishDate)
      formData.append('totalQuantity', this.bookData.totalQuantity)

    }else{
      
      formData.append('file', this.image);
      formData.append('bookName', this.bookData.bookName)
      formData.append('author', this.bookData.author)
      formData.append('category', this.bookData.category)
      formData.append('publishDate', this.bookData.publishDate)
      formData.append('totalQuantity', this.bookData.totalQuantity)
      
    }
    

    this.crudService
      .updateBook(formData, this.bookId)
      .subscribe((res : any) => {
        
        if(res.status === 200){
          
          Swal.fire({
            icon: 'success',
            text: res.message
          })
  
          this.ngZone.run(()=>{
            this.router.navigateByUrl('/book-list')
          })
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
