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
// connection.connect((err) => {
//     if (err) {
//         console.log("Error while connecting to database: " + err)
//     }
//     else {
//         console.log("Connected to database.........")
//     }
// })

// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
    // host: 'localhost',
    // user: 'root',
    // database: 'ayushcafe',
    // password: '@123'
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database:process.env.MYSQL_DB,
    password: process.env.MYSQL_PASSWORD
});


module.exports = connection;