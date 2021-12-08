const Package = require("../models/package")

exports.getPackage = (req, res, next) => {

    Package.find()
        .then( packageData => {
            
            res.json({ package : packageData })
        })
        .catch(err => console.log(err))
}