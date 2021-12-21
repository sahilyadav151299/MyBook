import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { OrderDataService } from 'src/app/services/order-data.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit {

  orderData : any [] = []
  url : any

  constructor( private orderDataService : OrderDataService,
               private domSanitizer : DomSanitizer ) { }

  ngOnInit() {

    this.orderDataService
      .getOrderData()
      .subscribe( (data : any ) => { 

        let counter = 0
        data = data.orderDetails
        
        for(const order of data){
        
          if(order.orderStatus === 'Placed'){

            if(order.bookData.book_cover != undefined){
           
              let TYPED_ARRAY = new Uint8Array(order.bookData.book_cover.data.data)
          
              const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
                return data + String.fromCharCode(byte);
              }, '')
              
              let base64String = btoa(STRING_CHAR);
              
              this.url = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + base64String)
            } 

            const orderObj = {

              count : ++counter,
              bookId : order.bookData._id,
              bookName : order.bookData.book_name,
              author : order.bookData.author,
              category : order.bookData.category_name,
              orderDate : new Date(order.orderDate).toLocaleDateString(),
              orderStatus : order.orderStatus,
              image : this.url
            }

            this.orderData.push(orderObj)
          }
            
        }
    })
  }

}
