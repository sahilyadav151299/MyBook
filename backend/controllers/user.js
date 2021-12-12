const AddressModel = require("../models/address")

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