import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
 
  public bestSellerList : any = [];
  public bookList : any;
  cartBookId : string[] = []
  filterStatus = false
  isData = true
  url : any

  constructor( private homeService : HomeService,
               private domSanitizer : DomSanitizer ){}

  totalLength: any;
  page: number = 1;
  
  ngOnInit(): void {
    this.homeService
    .displaySuggestedBooks()
      .subscribe( (data : any) => {

        this.totalLength = data.length;

        for(const book of data){

          if(book.book_cover != undefined){

            let TYPED_ARRAY = new Uint8Array(book.book_cover.data.data)
          
            const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
              return data + String.fromCharCode(byte);
            }, '')
            
            let base64String = btoa(STRING_CHAR);
            
            this.url = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + base64String)
          }

          const bookObj = {

            _id : book._id,
            book_name : book.book_name,
            author : book.author,
            category_name : book.category_name,
            publish_date : book.publish_date,
            image : this.url
          }

          this.url = ''
          this.bestSellerList.push(bookObj)
        }
      })
  }

  getValue(filter: any){

    if(filter === ''){
      this.filterStatus = false
    }else{
      this.homeService
      .displayBook(filter)
        .subscribe( (data : any) => {

          const arr = []

          for(const book of data){

            if(book.book_cover != undefined){
  
              let TYPED_ARRAY = new Uint8Array(book.book_cover.data.data)
            
              const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
                return data + String.fromCharCode(byte);
              }, '')
              
              let base64String = btoa(STRING_CHAR);
              
              this.url = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + base64String)
            }
  
            const bookObj = {
  
              _id : book._id,
              book_name : book.book_name,
              author : book.author,
              category_name : book.category_name,
              publish_date : book.publish_date,
              image : this.url
            }
  
            this.url = ''
            arr.push(bookObj)
          }

          this.bookList = arr
          this.totalLength = data.length;
          this.filterStatus = true
          this.isData = true
          
          if(data.length === 0){
            this.isData = false
            this.filterStatus = false
            return
          }
       }) 
    }
       
  }

  sendDataToCart(bookId : string){

    this.cartBookId.push(bookId)
    
    const flag = localStorage.getItem("flag")
    const previousData = localStorage.getItem("cartBookId")

    if(flag === "true" && this.cartBookId.length === 1 && previousData){
      
      this.cartBookId = this.cartBookId.concat(JSON.parse(previousData))
    }

    localStorage.setItem("cartBookId", JSON.stringify(this.cartBookId))

    Swal.fire({
      icon: 'success',
      text: 'Book added in cart!'
    })
  }
 
}