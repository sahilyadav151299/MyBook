// const CustomerSchema = require("../models/customer");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// exports.signup = (req, res, next) => {
//   const name = req.body.name;
//   const email = req.body.email;
//   const password = req.body.password;
//   const contact = req.body.contactNumber;

//   CustomerSchema.findOne({ email: email })

//     .then((user) => {
//       if (user) {
//         res.json({ errCode: 409, errMessage: "Email Already Exists!" });
//       } else {
//         bcrypt
//           .hash(password, 12)
//           .then((hashedPw) => {
//             const user = new CustomerSchema({
//               name: name,
//               email: email,
//               encry_password: hashedPw,
//               contact: contact,
//             });

//             user.save();

//             res.json({ status: 200, message: "User Registered Successfully!" });
//           })
//           .catch((err) => console.log(err));
//       }
//     })
//     .catch((err) => console.log(err));
// };

// exports.login = (req, res, next) => {
//   const email = req.body.email;
//   const password = req.body.password;

//   let loadedUser;

//   CustomerSchema.findOne({ email: email })
//     .then((user) => {
//       if (!user) {
//         res.json({ errCode: 422, errMessage: "Email Couldn't Be Found!" });
//       } else {
//         loadedUser = user;

//         bcrypt
//           .compare(password, user.encry_password)
//           .then((isEqual) => {
//             if (!isEqual) {
//               res.json({ errCode: 401, errMessage: "Wrong password!" });
//             } else {
//               const token = jwt.sign(
//                 {
//                   userId: loadedUser._id,
//                   name: loadedUser.name,
//                   auth: true,
//                   role: loadedUser.role,
//                 },
//                 "thisisthesupersecretkey",
//                 { expiresIn: "1h" }
//               );

//               res.json({
//                 status: 200,
//                 userToken: token,
//                 message: "You have successfully logged in!",
//               });
//             }
//           })
//           .catch((err) => console.log(err));
//       }
//     })
//     .catch((err) => console.log(err));
// };

// exports.changePassword = async (req, res, next) => {
//   const body = req.body;
//   const userData = body.data;

//   const customerId = body.id;
//   const oldPass = userData.oldPass;
//   const newPass = userData.newPass;
//   const confirmNewPass = userData.confirmNewPass;

//   CustomerSchema.findById(customerId, (err, user) => {
//     if (user) {
//       var hash = user.encry_password;

//       bcrypt
//         .compare(oldPass, hash)
//         .then((isEqual) => {
//           if (isEqual) {
//             if (oldPass == newPass) {
//               //Old password and New password is same
//               res.json({
//                 errCode: 422,
//                 errMessage: "Old Password can not be same as New Password",
//               });
//             } else {
//               //Password Match
//               if (newPass == confirmNewPass) {
//                 bcrypt.hash(newPass, 12, function (err, hash) {
//                   user.encry_password = hash;
//                   user.save(function (err, hash) {
//                     if (err) return console.error(err);
//                     res.json({
//                       status: 200,
//                       message: "Password Upated Successfully.",
//                     });
//                   });
//                 });
//               } else {
//                 //confirmPassword and Confirm New password don't match
//                 res.json({
//                   errCode: 403,
//                   errMessage:
//                     "New Password and New confirm password don't match",
//                 });
//               }
//             }
//           } else {
//             //Password don't match
//             res.json({
//               errCode: 401,
//               errMessage: "Please enter correct password.",
//             });
//           }
//         })
//         .catch((err) => console.log(err));
//     }
//   });
// };
