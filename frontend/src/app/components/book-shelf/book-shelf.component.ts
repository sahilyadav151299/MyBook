import { UserService } from 'src/app/services/user.service';
import { OrderDataService } from 'src/app/services/order-data.service';
import { Component, OnInit } from '@angular/core';

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

  constructor( private orderDataService : OrderDataService,
               private userService : UserService ) { }

  getData(type : any){
    this.bookType = type
  }
  
  ngOnInit() {

    this.orderDataService
      .getOrderData()
      .subscribe((returnData : any ) => {

        const data = returnData.orderDetails

        for(const order of data){

          const orderObj = {

            bookId : order.bookData._id,
            bookName : order.bookData.book_name,
            author : order.bookData.author,
            category : order.bookData.category_name,
            publishDate : order.bookData.publish_date,
            orderDate : new Date(order.orderDate).toLocaleDateString(),
            orderStatus : order.orderStatus
          }

          if(orderObj.orderStatus === 'Delivered')
            this.deliveredBookData.push(orderObj)
          
          if(orderObj.orderStatus === 'Returned')
            this.returnedBookData.push(orderObj)    
        }
    })

    this.userService
      .getAddress()
      .subscribe((res : any) => {

        if(res.errCode === 404)
          console.log(res.message)
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

    alert('Book added in cart successfully!')
  }


  onSubmit(addressFormData : any){

    const pickUpAddress = addressFormData

    this.orderDataService
      .returnBooks( this.deliveredBookData, pickUpAddress )
      .subscribe((res : any) => {

        if(res.errCode === 500)
          alert(res.message)
          
        if(res.status === 200){
          alert(res.message)

          window.location.reload()
        }
      })
  }
}
