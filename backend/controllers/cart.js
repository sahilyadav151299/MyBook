const BookSchema = require("../models/book")
const AddressSchema = require("../models/address")

exports.getCartData = (req, res, next) => {

    const cartBookId = JSON.parse(req.query.cartBookId)
    const customerId = JSON.parse(req.query.customerId)
    const totalBooks = cartBookId.length
    const cartBookData = []

    AddressSchema.findOne({ customerId : customerId})
        .then( address => {

            for(const id of cartBookId){

                BookSchema.findById(id)
                    .then( bookData => {
                        
                        cartBookData.push(bookData)
        
                        if(cartBookData.length === totalBooks){
                            
                            res.json({ cartBookData, address })
                        }
                    })
                    .catch(err => console.log(err))
            }
        } )
}