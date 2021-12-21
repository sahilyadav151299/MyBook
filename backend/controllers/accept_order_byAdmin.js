const orderSchema = require('../models/order');
const CustomerSchema = require('../models/customer')
const bookSchema = require('../models/book');
const addressSchema = require('../models/address')

// all placed orders

exports.placedorders = async(req, res) => {


    try {

        const openorders = await orderSchema.find({ flag: "Placed" })
    
        var result = [];


        for (let i = 0; i < openorders.length; i++) {

            let rented_book = []

            const customer_name = await CustomerSchema.findById(openorders[i].customerId)

            for (let j = 0; j < openorders[i].book_rented.length; j++) {

                const book = await bookSchema.findById(openorders[i].book_rented[j].bookId)
                rented_book.push(book)
            }

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
                orderId : openorders[i]._id
            }

            result.push(newdata)
        }
        res.send(result)
    } catch (error) {
        console.log(error);
    }
}    

// //                      when admin  approved the placed order                            //

exports.do_deliver = async(req, res) => {


    const order = await orderSchema.find({ _id: req.params.id })

    for (let i = 0; i < order[0].book_rented.length; i++) {

        const book_id = order[0].book_rented[i].bookId;

        const book = await bookSchema.findById(book_id);

         await bookSchema.updateOne({ _id: book_id }, { $set: { total_book_rented: (book.total_book_rented + 1) } }).then(() => {
             res.status(200).json()
         }).catch((err) => { console.warn(err) })
    }


    // res.send(order[0].book_rented[0].bookId)

    const flage = "Delivered";
    orderSchema.updateOne({ _id: req.params.id }, { $set: { flag: flage } }).then(() => {
            res.status(200).json()
        }).catch((err) => { console.warn(err) })

}
