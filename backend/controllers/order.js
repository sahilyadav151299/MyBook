const OrderSchema = require("../models/order")
const BookSchema = require("../models/book")

exports.getOrderHistory = (req, res, next) => {

    const orderDetails = []

    // const customerId = "61ae03486c0db019cc97a623"       // rohit
    // const customerId = "61ae03486c0db019cc97a622"       // sahil
    // const customerId = "61ae03486c0db019cc97a625"       // savita  
    const customerId = "61ae03486c0db019cc97a626"       // tushar
    // const customerId = "61ae03486c0db019cc97a624"       // vishal

    OrderSchema.find({ customerId : customerId }, "book_rented flag create_at")
        .then( odrerData => {

            for(const order of odrerData){

                const bookIds = order.book_rented
                const orderStatus = order.flag
                const orderDate = order.create_at
                
                for(const id of bookIds){

                    const bookId = id.bookId.toString()
                    
                    BookSchema.findById( bookId )
                        .then( bookData => {

                            const order = {

                                bookData : bookData,
                                orderStatus : orderStatus,
                                orderDate : orderDate
                            }

                            order.bookData = bookData

                            orderDetails.push(order)
                            
                            if(orderDetails.length === odrerData.length){
                            
                                res.json({ orderDetails : orderDetails })
                            }
                                
                        })
                        .catch(err => console.log(err))
                }
            }
        })
        .catch( err => console.log(err) )
} 