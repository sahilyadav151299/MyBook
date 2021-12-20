const orderSchema = require('../models/order');
const CustomerSchema = require('../models/customer')
const bookSchema = require('../models/book');
const addressSchema = require('../models/address')
const { Mongoose } = require('mongoose');
//                                 working part                                       //

exports.openOrders = async(req, res) => {


    try {

        const openorders = await orderSchema.find({ flag: "Placed" })
            // openorders.forEach()
        var result = [];
        for (let i = 0; i < openorders.length; i++) {

            const customer_name = await CustomerSchema.findById(openorders[i].customerId)
            for (let j = 0; j < openorders[i].book_rented.length; j++) {


                const rented_book = await bookSchema.findById(openorders[i].book_rented[j].bookId)
                const date_ob = new Date(openorders[i].create_at)

                const add = await addressSchema.find({ customerId: openorders[i].customerId })

                const date = date_ob.getDate();
                const month = date_ob.getMonth() + 1;
                const year = date_ob.getFullYear();

                let newdata = {
                    customer: customer_name.name,
                    book_rented: rented_book,
                    address: add,
                    create_at: date + "-" + month + "-" + year,
                }

                result.push(newdata)
            }

            
        }
        res.send(result)

        console.log(openorders.length)
            // console.log(openorders[0].book_rented[0].bookId)


    } catch (error) {
        console.log(error);
    }


}


// not working code   //
// exports.openOrders = async(req, res) => {

//     let matchObj = {}
//     if (req.query.bookId) {
//         matchObj['bookId'] = Mongoose.Types.ObjectId(req.query.bookId);
//     }
//     let arg = {
//         query: [{
//                 $match: {...matchObj },
//             },
//             {
//                 $lookup: {
//                     from: "bookSchema",
//                     localField: "bookId",
//                     foreignField: "_id",
//                     as: "book"


//                 },

//             },
//             { $unwind: "$book" },
//             {
//                 $lookup: {
//                     from: "CustomerSchema",
//                     localField: "customerId",
//                     foreignField: "_id",
//                     as: "customer"


//                 }
//             },
//             { $unwind: "$book" },
//             {
//                 $project: {
//                     bookname: "$book.book_name",
//                     customerName: "$customer.name",
//                     flag: 1,
//                     create_at: 1,

//                 }
//             }

//         ]

//     }



// }

// exports.openOrders = async(req, res) => {
//     var customerdata = [];
//     var customer = [];
//     await orderSchema.find({
//             flag: "Placed"
//         }).then(data => {
//             console.log("placed orders")
//                 // console.log(data)
//                 // res.send(data)
//             data.map((d, k) => {
//                 customer.push(data[0].book_rented[0].bookId);
//                 // customerdata.push(d.customerId)


//             })



//             bookSchema.find({ bookId: { $in: customer } })
//                 .then(data => {
//                     console.log("customer in order")
//                     console.log(data);
//                     // res.send(data)
//                     res.json({
//                         customerId: data[0].customerId,
//                         result: data
//                     })

//                 })
//                 .catch(error => {
//                     console.log(error)

//                 })



//             CustomerSchema.find({ customerId: { $in: customerdata } })
//                 .then(data => {
//                     console.log("customer in order")
//                     console.log(data);
//                     // res.send(data)
//                     // res.json({
//                     //     customerId: data[0].customerId,
//                     //     result: data
//                     // })

//                 })
//                 .catch(error => {
//                     console.log(error)

//                 })


//         })
//         .catch(error => {
//             console.log(error);
//         })
// }