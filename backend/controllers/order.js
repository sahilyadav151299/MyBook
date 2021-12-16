const OrderSchema = require("../models/order")
const BookSchema = require("../models/book")
const CustomerPackage = require("../models/customer_package")
const PackageScema = require("../models/package")
const ReturnOrder = require("../models/return_order")

exports.getOrderHistory = (req, res, next) => {

    const orderDetails = []

    const customerId = req.query.customerId

    OrderSchema.find({ customerId : customerId }, "book_rented flag create_at")
        .then( orderData => {

            let counter = 0

            for(const order of orderData){

                const bookIds = order.book_rented
                const orderStatus = order.flag
                const orderDate = order.create_at
                
                for(const id of bookIds){

                    const bookId = id.bookId.toString()
                    counter = counter + 1

                    BookSchema.findById( bookId )
                        .then( bookData => {

                            const order = {

                                bookData : bookData,
                                orderStatus : orderStatus,
                                orderDate : orderDate
                            }
                            
                            orderDetails.push(order)

                            if(orderDetails.length === counter){
                                
                                res.json({ orderDetails : orderDetails })
                            }
                                
                        })
                        .catch(err => console.log(err))
                }
            }
        })
        .catch( err => console.log(err) )
} 


exports.placeOrder = (req, res, next) => {

    const customerId = req.body.customerId
    const orderData = req.body.orderData

    CustomerPackage.find({ customerId : customerId, status : true })
        .then( userPackage => {

            const activePackageId = userPackage[0].packageId

            PackageScema.findById({ _id: activePackageId }, "max_book package_name")
                .then( packData => {

                    const max_book = packData.max_book
                    const pack = packData.package_name
                    
                    OrderSchema.find({ customerId : customerId }, "flag" )
                        .then(userOrders => {

                            let placedBookCount = 0
                            let deliveredBookCount = 0

                            for(const order of userOrders){

                                if(order.flag === true)
                                    placedBookCount++
                                else
                                    deliveredBookCount++
                            }

                            // if(max_book === deliveredBookCount || max_book === placedBookCount){
                            //     res.json({ status : 406, message : `You can only order upto ${max_book} books at once with your ${pack} pack. Either reduce the books in cart or return the books before!`})
                            // }

                            const book_rented = []

                            for(const order of orderData){
                                
                                const bookId = {
                                    bookId : order.id
                                }

                                book_rented.push(bookId)
                            }

                            const newOrder = OrderSchema({
                                customerId : customerId,
                                customerPackageId : activePackageId,
                                book_rented : book_rented,
                                flag : "Placed"
                            })

                            newOrder.save(err => {
                                
                                if(err === null){
                                    res.json({ status : 200, message : "You have successfully placed the order!" })
                                }else{
                                    res.json({ errCode : 500, message : 'Internal Server Error' })
                                }
                            })

                        })
                })
        })
        .catch(err => {
            res.json({ errCode : 404, message : "You don't have any active subscription!"})
        })
}

exports.returnOrderedBooks = (req, res, next) => {

    const bookData = req.body.bookData
    const customerId = req.body.customerId
    const address = req.body.address
    const bookIds = []

    for(const book of bookData){

        const Id = {
            bookId : book.bookId
        }

        bookIds.push(Id)
    }
        

    const newReturnOrder = new ReturnOrder({

        customerId : customerId,
        return_book_Id : bookIds,
        status : 'Open',
        pickup_address : address
    })

    newReturnOrder.save()
        .then(() => res.json({ status : 200, message : 'You have successfully applied for return order!'}))
        .catch(err => res.json({ errCode : 500, message : 'Internal Server Error' })) 
}
