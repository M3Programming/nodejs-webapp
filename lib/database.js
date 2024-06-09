const mysql = require('mysql')
require("dotenv").config()
const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE
const DB_PORT = process.env.DB_PORT

let conn = mysql.createConnection({
    connectionLimit: 100,
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: DB_PORT

})

conn.connect(function (err) {
    if (err) {
        console.log(err);
    }else{
        console.log("Connected");
    }
    });

    module.exports = conn;

