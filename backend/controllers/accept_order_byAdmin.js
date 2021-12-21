const orderSchema = require('../models/order');
const CustomerSchema = require('../models/customer')
const bookSchema = require('../models/book');
const addressSchema = require('../models/address')

// it will get information of customers ,who has placed the order... 
exports.placedorders = async(req, res) => {


    try {

        const placedorders = await orderSchema.find({ flag: "Placed" })
        var result = [];
        // placedorder.forEach()
        for (let i = 0; i < placedorders.length; i++) {
            var books = [];
            var categories = [];
            const customer_name = await CustomerSchema.findById(placedorders[i].customerId)

            const date_ob = new Date(placedorders[i].create_at)
                // date of order
            const date = date_ob.getDate();
            const month = date_ob.getMonth() + 1;
            const year = date_ob.getFullYear();
            const add = await addressSchema.find({ customerId: placedorders[i].customerId })
            for (let j = 0; j < placedorders[i].book_rented.length; j++) {


                const rented_book = await bookSchema.findById(placedorders[i].book_rented[j].bookId)

                books.push(rented_book.book_name)

                categories.push(rented_book.category_name)

            }


            let newdata = {
                id: placedorders[i]._id,
                customer: customer_name.name,
                book_rented: books,
                category: categories,
                address: add,
                create_at: date + "-" + month + "-" + year

            }

            books = [{}];
            books.push("#")
            result.push(newdata)

        }

        // console.log(result)   // for testing
        res.send(result)

        // console.log(placedorders.length) // for testing purpose


    } catch (error) {
        console.log(error);
    }


}





//                      when admin  approved the placed order                            //

// count of book_rented_quantity increased by 1

exports.do_deliver = async(req, res) => {

    const order = await orderSchema.find({ _id: req.params.id })
    for (let i = 0; i < order[0].book_rented.length; i++) {
        const book_id = order[0].book_rented[i].bookId;
        const book = await bookSchema.findById(book_id);
        await bookSchema.updateOne({ _id: book_id }, { $set: { total_book_rented: (book.total_book_rented + 1) } }).then(() => {
            res.status(200).json()
        }).catch((err) => { console.warn(err) })

        // console.log(book.book_name, " approved")  //it is for testing purpose 



    }


    // in order collection,flag will change from "placed" to "delivered"
    const flage = "Delivered";
    const obj = orderSchema.updateOne({ _id: req.params.id }, { $set: { flag: flage } }).then(() => {
        res.status(200).json()
    }).catch((err) => { console.warn(err) })


}