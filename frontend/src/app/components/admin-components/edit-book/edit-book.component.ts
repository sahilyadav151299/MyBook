import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})

export class EditBookComponent implements OnInit {

  getId:any;
  updateForm!: FormGroup;
  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private ngZone:NgZone,
    private activatedRoute : ActivatedRoute,
    private crudApi:CrudService ) { 

      this.getId = this.activatedRoute.snapshot.paramMap.get('id');

      this.crudApi.getBook(this.getId).subscribe((res:any)=>{
        this.updateForm.setValue({
          name: res['book_name'],
          author: res['author'],
          category: res['category_name'],
          publishDate: res['publish_date'],
          totalQuantity: res['total_book_quantity']
        })
      });

      this.updateForm = this.formBuilder.group({
        name:[''],
        author:[''],
        category:[''],
        publishDate:[''],
        totalQuantity: []
      })

    }

  ngOnInit(): void { }

  onUpdate():any{
    console.log(this.getId,this.updateForm.value);
    this.crudApi.updateBook(this.getId, this.updateForm.value).subscribe((res:any)=>{
      
      if(res.status == 500){
        alert(res.message)
      }

      if(res.status == 200){
        alert(res.message)

        this.ngZone.run(()=>{
          this.router.navigateByUrl('/book-list')
        })
      }
    }, (error:any)=>{
      console.log(error);
    })
  }
 
}
