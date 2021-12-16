const AddressModel = require("../models/address")
const ReturnOrders = require("../models/return_order")
const CustomerModel = require("../models/customer")

exports.changeAddres = (req, res, next) => {

    const customerId = req.body.customerId
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

    const customerId = req.query.customerId

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


exports.getUserProfile = (req, res, next) => {

    const customerId = req.query.customerId

    CustomerModel.findById({ _id : customerId })
    .then( customer =>{

          AddressModel.findOne({ customerId : customerId })
            .then( address => {

                    return res.json({customer, address}) 
            })
    })
    .catch( err => console.log(err) );
}

exports.updateProfile = (req, res, next) => {

    const body = req.body
    const userData = body.data

    const customerId = body.id
    const name = userData.name
    const contact = userData.contact
    const address = userData.add
    const city = userData.city
    const state = userData.state
    const pincode = userData.pincode

    CustomerModel.findByIdAndUpdate( customerId, { name : name, contact, contact } )
        .then( () => {
            
            AddressModel.findOneAndUpdate( { customerId : customerId }, { address, city, state, pincode } )
                .then( () => {
                    
                    res.json({ status : 200, message : 'Profile Updated Successfully!' })
                })
                .catch(err => res.json({ errCode : 500, errMessage : 'Error In Updating Address!' }))
        } )
        .catch( err => res.json({ errCode : 500, errMessage : 'Error In Updating User Details!' }) )
}