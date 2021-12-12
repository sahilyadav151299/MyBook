import { Component, OnInit } from '@angular/core';
import { OrderDataService } from 'src/app/services/order-data.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit {

  orderData : any [] = []
  cartBookId : string[] = []

  constructor( private orderDataService : OrderDataService ) { }

  ngOnInit() {

    this.orderDataService
      .getOrderData()
      .subscribe( (data : any ) => { 

        let counter = 0
        data = data.orderDetails

        for(const order of data){

          const orderObj = {

            count : ++counter,
            bookId : order.bookData._id,
            bookName : order.bookData.book_name,
            author : order.bookData.author,
            category : order.bookData.category_name,
            orderDate : new Date(order.orderDate).toLocaleDateString(),
            orderStatus : order.orderStatus ? 'Placed' : 'Delivered'
          }

          this.orderData.push(orderObj)
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

}
