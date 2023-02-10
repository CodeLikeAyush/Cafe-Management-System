// const mysql = require('mysql2');
// const app = require('.');
// require('dotenv').config();

// var connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     // port: process.env.DB_PORT,
//     user: process.env.DB_USERNAME,
//     database: process.env.DB_NAME
//     // password: process.env.DB_PASSWORD,
// })

// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'cafedatabase',
    password: '@123'
});

// connection.connect((err) => {
//     if (err) {
//         console.log("Error while connecting to database: " + err)
//     }
//     else {
//         console.log("Connected to database.........")
//     }
// })

module.exports = connection;