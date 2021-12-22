const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const multer = require('multer')
const mongoose = require("mongoose");
const { port, database, db_host } = require("./config/config");
const jsonwebtoken = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

//for passport things
//const PassportLocal = require("passport-local").Strategy;
// const PassportLocal = require("passport-local");
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require('passport-local').Strategy;


const User = require("./models/customer");
const forgotPassword = require("./routes/forgot_Password");
const orderRoutes = require("./routes/order");
const packageRoutes = require("./routes/package");
//const authRoutes = require("./routes/authentication")
const authRoutes = require("./controllers/auth");
const cartRoutes = require("./routes/cart");
const userRoutes = require("./routes/user");
const bookRoutes = require("./routes/book");
const homeRoutes = require("./routes/dashboard");

var cors = require("cors");
const packageRoutes = require("./routes/package")
const authRoutes = require("./routes/authentication")
const cartRoutes = require("./routes/cart")
const userRoutes = require("./routes/user")
const bookRoutes = require("./routes/book")
const homeRoutes = require("./routes/dashboard")
const accept_order_byAdminRoutes = require("./routes/accept_order_byAdmin");
const returnOrdersRoutes = require("./routes/returnOrders")

const cors = require('cors')

// Middlewares
app.use(express.static(__dirname + '/uploads'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );

    next();
});

//session
app.use(
    session({
        secret: process.env.secret,
        resave: false,
        saveUninitialized: true,
    })
);

//passport & session initialization
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// passport.use(new PassportLocal(User.authenticate()));

// passport.serializeUser(function(user, done) {
//     done(null, user);
// });
// passport.deserializeUser(async function(user, done) {
//     try {
//         const { _id } = user;
//         user = await User.findById(_id);
//         done(null, user);
//     } catch (err) {
//         done(err);
//     }
// });

// routes
app.use("/", forgotPassword);
app.use(authRoutes);
//app.use("/auth", authRoutes);
app.use("/home", homeRoutes);
app.use("/user", userRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);
app.use("/packages", packageRoutes);
app.use("/admin/book", bookRoutes);
// Database creation and connection
mongoose
    .connect(`${database}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Database created and connected successfully!");
        next()
    });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
    }
});

app.use(multer({ storage: storage }).single('file'));

app.use('/auth', authRoutes)
app.use('/home', homeRoutes)
app.use('/user', userRoutes)
app.use('/cart', cartRoutes)
app.use('/orders', orderRoutes)
app.use('/packages', packageRoutes)
app.use('/admin/book', bookRoutes)
app.use('/accept_order_byAdmin', accept_order_byAdminRoutes)
app.use('/returnOrders', returnOrdersRoutes)


// Database creation and connection
mongoose.connect(`${database}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database created and connected successfully!')
    })
    .then(() => {
        app.listen(port, () => {
            console.log(`serve at http://${db_host}:${port}`);
        });
    })
    .catch((err) => console.log(err))

// Error
app.use((req, res, next) => {
    // Error goes via `next()` method
    setImmediate(() => {
        next(new Error('Something went wrong'));
    });
});

app.use(function(err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});