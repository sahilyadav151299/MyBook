import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})

export class BookListComponent implements OnInit {
  Books:any = [] 
  constructor(private cruidApi:CrudService) { }

 //book
  ngOnInit(): void {
    this.cruidApi.getBooks().subscribe(( res: any)=>{
      this.Books = res;
    })
  }

  //delete a record/book
  delete(id:any, i:any){
    console.log(id);
    if(window.confirm("Are you sure want to delete")){
      this.cruidApi.deleteBook(id).subscribe((res:any)=>{

        if(res.status == 200){

          Swal.fire({
            icon: 'success',
            text: res.message
          })

          var reload = () => {
            return window.location.reload()
          }

          setTimeout(reload, 2000);
        }

        if(res.status == 500){
          alert(res.message)
        }
         this.Books.splice(i,1);
      })
    } 
  }

}

