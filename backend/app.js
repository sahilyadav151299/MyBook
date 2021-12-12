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


// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use((req, res, next) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );

next()
});


//My routes
app.use("/",authRoutes);


// Routes

app.use('/user', userRoutes)
app.use('/cart', cartRoutes)
app.use('/orders', orderRoutes);
app.use('/packages', packageRoutes);



// Database creation and connection
mongoose.connect(`${database}`)
        .then(() => {
            console.log('Database created and connected successfully!')
        })
        .then(() => {
            app.listen(port, () => {
                console.log(`serve at http://${db_host}:${port}`);
            });
        })
        .catch((err) =>  console.log(err))

