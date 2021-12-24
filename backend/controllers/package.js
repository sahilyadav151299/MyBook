const Package = require("../models/package")
const CustomerPackage = require("../models/customer_package")
const mongoose = require('mongoose')

exports.getPackage = (req, res, next) => {

    const customerId = mongoose.Types.ObjectId(req.query.customerId)
    let totalPack = 0

    Package.find()
        .then(packageData => {

            CustomerPackage.find({ customerId: customerId })
                .then(userPackData => {

                    totalPack = userPackData.length
                    const userAllPackData = []

                    for (const pack of userPackData) {

                        Package.findById({ _id: pack.packageId })
                            .then(packDeatails => {

                                const userPack = {
                                    packData: packDeatails,
                                    status: pack.status === true ? 'Active' : 'Expired',
                                    buyAt: new Date(pack.create_at).toLocaleDateString(),
                                    packId: pack._id
                                }

                                userAllPackData.push(userPack)

                                if (totalPack == userAllPackData.length) {
                                    res.json({ packageData: packageData, userAllPackData: userAllPackData })
                                }
                            })
                            .catch(err => console.log(err))
                    }
                })
                .then(() => {

                    if (totalPack == 0) {
                        res.json({ packageData: packageData, userAllPackData: [] })
                    }
                })
        })
        .catch(err => console.log(err))
}

exports.buyPackage = (req, res, next) => {

    const packageId = req.body.packageId
    const customerId = req.body.customerId

    CustomerPackage.find({ customerId: customerId, status: true })
        .then(pack => {

            if (pack.length >= 1) {
                res.json({ status: 409, message: 'You already have an active subsciption!' })
                return
            }

            const newCustomerPackage = new CustomerPackage({

                customerId: customerId,
                packageId: packageId,
                status: true
            })

            newCustomerPackage.save()
                .then(() => {
                    res.json({ status: 200, message: "You have a subsciption now!" })
                })
                .catch(err => {
                    res.json({ errCode: 500, message: "Internal Server Error" })
                })
        })
        .catch(err => console.log(err))
}

exports.updateUserPack = (req, res, next) => {

    const packId = req.body.id

    CustomerPackage.findByIdAndUpdate(packId, { status: false })
        .then(() => {

            CustomerPackage.find({ customerId: customerId })
                .then(userPackData => {

                    totalPack = userPackData.length
                    const userAllPackData = []

                    for (const pack of userPackData) {

                        Package.findById({ _id: pack.packageId })
                            .then(packDeatails => {

                                const userPack = {
                                    packData: packDeatails,
                                    status: pack.status === true ? 'Active' : 'Expired',
                                    buyAt: new Date(pack.create_at).toLocaleDateString(),
                                    packId: pack._id
                                }

                                userAllPackData.push(userPack)

                                if (totalPack == userAllPackData.length) {
                                    res.json({ userAllPackData: userAllPackData })
                                }
                            })
                            .catch(err => res.json({ errCode: 500, errMessage: 'Error In Updating Status!' }))
                    }
                })
                .catch(err => res.json({ errCode: 500, errMessage: 'Error In Updating Status!' }))
        })
        .catch(err => res.json({ errCode: 500, errMessage: 'Error In Updating Status!' }))
}