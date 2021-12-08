import { Component, OnInit, Pipe } from '@angular/core';
import { OrderDataService } from 'src/app/services/order-data.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit {

  orderData : any [] = []

  constructor( private orderDataService : OrderDataService ) { }

  fetchOrderData(){

    this.orderDataService
      .getOrderData()
      .subscribe( (data : any ) => { 

        let counter = 0
        data = data.orderDetails
        
        for(const order of data){

          const orderObj = {

            count : ++counter,
            bookName : order.bookData.book_name,
            author : order.bookData.author,
            category : order.bookData.category_name,
            orderDate : new Date(order.orderDate).toLocaleDateString(),
            orderStatus : order.orderStatus ? 'Placed' : 'Delivered'
          }

          this.orderData.push(orderObj)
        }

        console.log(this.orderData)
    })
  }

  ngOnInit() {
  }

}
