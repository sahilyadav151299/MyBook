const Package = require("../models/package")
const CustomerPackage = require("../models/customer_package")

exports.getPackage = (req, res, next) => {

    Package.find()
        .then( packageData => {
            
            res.json({ packageData : packageData })
        })
        .catch(err => console.log(err))
}

exports.buyPackage = (req, res, next) => {

    const packageId = req.body.packageId
    const customerId = req.body.customerId

    const newCustomerPackage = new CustomerPackage ({

        customerId : customerId,
        packageId : packageId,
        status : true
    })

    newCustomerPackage.save()
        .then( () => {
            res.json({ status : 200 ,message : "You have a subsciption now!" })
        })
        .catch( err => {
            res.json({ errCode : 500, message : "Internal Server Error" })
        })  
}
