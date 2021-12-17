import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
 
  public bestSellerList : any;
  public bookList : any;
  cartBookId : string[] = []
  filterStatus = false
  isData = true

  constructor( private homeService : HomeService ){}

  totalLength: any;
  page: number = 1;
  
  ngOnInit(): void {
    this.homeService
    .displaySuggestedBooks()
      .subscribe( (data : any) => {

        this.bestSellerList = data;
        this.totalLength = data.length;
      })
  }

  getValue(filter: any){

    if(filter === ''){
      this.filterStatus = false
    }else{
      this.homeService
      .displayBook(filter)
        .subscribe( (data : any) => {
          this.bookList = data;
          this.totalLength = data.length;
          this.filterStatus = true
          this.isData = true
          
          if(data.length === 0){
            this.isData = false
            // this.filterStatus = false
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