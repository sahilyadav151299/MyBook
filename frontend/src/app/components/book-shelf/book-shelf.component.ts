import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
import { OrderDataService } from 'src/app/services/order-data.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-shelf',
  templateUrl: './book-shelf.component.html',
  styleUrls: ['./book-shelf.component.css']
})
export class BookShelfComponent implements OnInit {

  deliveredBookData : any [] = []
  returnedBookData : any [] = []
  cartBookId : string[] = []
  bookType = 'd'
  disabledBox = false
  
  custAddress = {
    id: '',
    address : '',
    city: '',
    state: '',
    pincode: ''
  }

  url : any

  constructor( private orderDataService : OrderDataService,
               private userService : UserService,
               private domSanitizer : DomSanitizer ) { }

  getData(type : any){
    this.bookType = type
  }
  
  ngOnInit() {

    this.orderDataService
      .getOrderData()
      .subscribe((returnData : any ) => {

        const data = returnData.orderDetails

        for(const order of data){

          if(order.bookData.book_cover != undefined){

            let TYPED_ARRAY = new Uint8Array(order.bookData.book_cover.data.data)
          
            const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
              return data + String.fromCharCode(byte);
            }, '')
            
            let base64String = btoa(STRING_CHAR);
            
            this.url = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + base64String)
          }

          const orderObj = {

            orderId : order.orderId,
            bookId : order.bookData._id,
            bookName : order.bookData.book_name,
            author : order.bookData.author,
            category : order.bookData.category_name,
            publishDate : order.bookData.publish_date,
            orderDate : new Date(order.orderDate).toLocaleDateString(),
            orderStatus : order.orderStatus,
            image : this.url
          }

          if(orderObj.orderStatus === 'Delivered')
            this.deliveredBookData.push(orderObj)
          
          if(orderObj.orderStatus === 'Returned')
            this.returnedBookData.push(orderObj)  
            
          this.url = ''  
        }
    })

    this.userService
      .getAddress()
      .subscribe((res : any) => {

        if(res.errCode === 404)
          alert(res.message)
        else{
          this.custAddress.id = res.address._id
          this.custAddress.address = res.address.address
          this.custAddress.city = res.address.city
          this.custAddress.state = res.address.state
          this.custAddress.pincode = res.address.pincode

          if(res.status.length > 0){
            if(res.status[0].status === 'Open')
              this.disabledBox = true
          }
        }
    }) 
    
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


  onSubmit(addressFormData : any){

    const pickUpAddress = addressFormData

    console.log(this.deliveredBookData)

    const newReduceData = []

    for(const book of this.deliveredBookData){
      
      const obj = {
        author : book.author,
        bookId : book.bookId,
        bookName : book.bookName,
        category : book.category,
        orderDate : book.orderDate,
        orderId : book.orderId,
        orderStatus : book.orderStatus,
        publishDate : book.publishDate
      }

      newReduceData.push(obj)
    }

    this.orderDataService
      .returnBooks( newReduceData, pickUpAddress )
      .subscribe((res : any) => {

        if(res.errCode === 500)
          alert(res.message)
          
        if(res.status === 200){

          Swal.fire({
            icon: 'success',
            text: res.message
          })
          
          // After 1 seconds it will automatically reload the page
          var reload = function(){
            return window.location.reload();
          }

          setTimeout(reload, 2000);
        }
      })
  }
}
