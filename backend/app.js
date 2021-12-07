const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const { port, database, db_host } = require("./config/config");

const app = express();

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

// Database creation and connection
mongoose.connect(`${database}`)
        .then(() => {
            console.log('Database created and connected successfully!');
        })
        .then(() => {
            app.listen(port, () => {
                console.log(`serve at http://${db_host}:${port}`);
            });
        })
        .catch((err) =>  console.log(err))


