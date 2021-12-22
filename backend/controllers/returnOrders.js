const returnOrderSchema = require('../models/return_order');
const CustomerSchema = require('../models/customer')
const bookSchema = require('../models/book');
const addressSchema = require('../models/address')
const orderSchema = require('../models/order')
const { Mongoose } = require('mongoose');

//get return orders data.
exports.openReturnOrders = async (req, res) => {


    try {

        const returnorders = await returnOrderSchema.find({ status: "Open" })
        // returnorders.forEach()
        var result = [];
        
        for (let i = 0; i < returnorders.length; i++) {
            Books =[];
            const customer_name = await CustomerSchema.findById(returnorders[i].customerId)
            
            const add = await addressSchema.find({customerId:returnorders[i].customerId})

            let bookIds = []

            for (let j = 0; j < returnorders[i].return_book_Id.length; j++) {

              const id = await bookSchema.findById(returnorders[i].return_book_Id[j].bookId)
              bookIds.push(id)

            }

            const date_ob = new Date(returnorders[i].create_at)

              const date = date_ob.getDate();
              const month = date_ob.getMonth() + 1;
              const year = date_ob.getFullYear();

              let newdata = {

                customer: customer_name.name,
                address:add, 
                book_rented: bookIds,
                create_at: date + "-" + month + "-" + year,
                returnOrderId : returnorders[i]._id
              }
              
              result.push(newdata)

        }
        res.send(result)

        // console.log(returnorders[0].book_rented[0].bookId)


    } catch (error) {

        console.log(error);
    }
}

exports.returnOrderApprove = async(req, res) => {
    
        const order = await returnOrderSchema.find({ _id: req.params.id })
    
        for (let i = 0; i < order[0].return_book_Id.length; i++) {

            const book_id = order[0].return_book_Id[i].bookId;
            const order_id = order[0].return_order_Id[i].orderId;
            
            const book = await bookSchema.findById(book_id);

            await bookSchema.updateOne({ _id: book_id }, { $set: { total_book_rented: (book.total_book_rented - 1) } }).then(() => {

                res.status(200).json()
            }).catch((err) => { console.warn(err) })
    
            await orderSchema.updateOne({ _id: order_id }, { $set: { flag : 'Returned'} })
                .then(() => {

                    res.status(200).json()
                }).catch((err) => { console.warn(err) })

        }

        const flage = "Closed";

        returnOrderSchema.updateOne({ _id: req.params.id }, { $set: { status : flage } })
            .then(() => {
                res.status(200).json()
            }).catch((err) => { console.warn(err) })
}
