import { Component, OnInit } from '@angular/core';
import { OrderDataService } from 'src/app/services/order-data.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit {

  orderData : any [] = []

  constructor( private orderDataService : OrderDataService ) { }

  ngOnInit() {

    this.orderDataService
      .getOrderData()
      .subscribe( (data : any ) => { 

        let counter = 0
        data = data.orderDetails

        for(const order of data){
        
          if(order.orderStatus === 'Placed'){

            const orderObj = {

              count : ++counter,
              bookId : order.bookData._id,
              bookName : order.bookData.book_name,
              author : order.bookData.author,
              category : order.bookData.category_name,
              orderDate : new Date(order.orderDate).toLocaleDateString(),
              orderStatus : order.orderStatus
            }
            this.orderData.push(orderObj)
          }
            
        }
    })
  }

}
