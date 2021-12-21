const returnOrderSchema = require('../models/return_order');

const CustomerSchema = require('../models/customer')

const bookSchema = require('../models/book');

const addressSchema = require('../models/address')

const { Mongoose } = require('mongoose');

//                working part               //




exports.openReturnOrders = async (req, res) => {


    try {

        const returnorders = await returnOrderSchema.find({ status: "Open" })
        // returnorders.forEach()
        var result = [];
        
        for (let i = 0; i < returnorders.length; i++) {

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


        console.log(returnorders.length)
        // console.log(returnorders[0].book_rented[0].bookId)


    } catch (error) {

        console.log(error);
    }
}

