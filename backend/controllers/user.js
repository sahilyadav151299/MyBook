const AddressModel = require("../models/address")
const ReturnOrders = require("../models/return_order")

exports.changeAddres = (req, res, next) => {

    const customerId = JSON.parse(req.body.customerId)
    const newAddress = req.body.newAddress

    AddressModel.findOneAndUpdate( { customerId : customerId },
        { address : newAddress.address ,
          city : newAddress.city,
          state : newAddress.state,
          pincode : newAddress.pincode,
          create_at : new Date() } )
        .then( () => {
            res.json({ status : 200 ,message : "Address updated successfully!" })
        })
        .catch( err => {
            res.json({ errCode : 500, message : "Internal Server Error" })
        })  

}

exports.getAddress = (req, res, next) => {

    const customerId = JSON.parse(req.query.customerId)

    AddressModel.findOne({ customerId : customerId })
        .then( address => {

            ReturnOrders.find({ customerId : customerId, status : 'Open' })
                .then(returnOrder => {

                    if(returnOrder){
                        res.json({ address : address, status : returnOrder })    
                    }else{
                        res.json({ address : address })
                    }
                })
        })
        .catch(err => {
            res.json({ errCode : 404, message : 'Address Not Found'})
        })

}