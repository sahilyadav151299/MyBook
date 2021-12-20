const orderSchema = require('../models/order');
const CustomerSchema = require('../models/customer')
const bookSchema = require('../models/book');
const addressSchema = require('../models/address')
const { Mongoose } = require('mongoose');
// all placed orders

exports.placedorders = async(req, res) => {


    try {

        const placedorders = await orderSchema.find({ flag: "Placed" })
            // placedorders.forEach()
        var result = [];

        for (let i = 0; i < placedorders.length; i++) {
            var books = [];
            var categories = [];
            const customer_name = await CustomerSchema.findById(placedorders[i].customerId)

            const date_ob = new Date(placedorders[i].create_at)

            const date = date_ob.getDate();
            const month = date_ob.getMonth() + 1;
            const year = date_ob.getFullYear();
            const add = await addressSchema.find({ customerId: placedorders[i].customerId })
            for (let j = 0; j < placedorders[i].book_rented.length; j++) {


                const rented_book = await bookSchema.findById(placedorders[i].book_rented[j].bookId)

                books.push(rented_book.book_name)

                categories.push(rented_book.category_name)







                // result.push(newdata)



            }


            let newdata = {
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

        console.log(result)
        res.send(result)

        console.log(placedorders.length) // for testing purpose


    } catch (error) {
        console.log(error);
    }


}