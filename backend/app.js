const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const { port, database, db_host } = require("./config/config");

const orderRoutes = require("./routes/order");
const packageRoutes = require("./routes/package")
const authRoutes = require("./routes/authentication")
const cartRoutes = require("./routes/cart")
const userRoutes = require("./routes/user")
const bookRoutes = require("./routes/book")
const homeRoutes = require("./routes/dashboard")
const accept_order_byAdminRoutes = require("./routes/accept_order_byAdmin");
const returnOrdersRoutes = require("./routes/returnOrders")


var cors = require('cors')

// Middlewares
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

    next()
});


// routes

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