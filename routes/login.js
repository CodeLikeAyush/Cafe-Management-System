const connection = require('../connection');
// const sendMail = require('../sendMail');
// const secretKey = require('../secretKey');
// const verify = require('../verify');

const express = require('express');
const jwt = require('jsonwebtoken');
var multer = require('multer');
var upload = multer();
// const cookieParser = require('cookie-parser');





const route = express.Router();

route.post('/', upload.fields([]), (req, res) => {

    const user = req.body;
    console.log(user);
    // console.log(user)

    let query = ' select users.user_email, user_auth.user_passw,user_auth.authorized,user_auth.verified from users inner join user_auth on users.user_id = user_auth.user_id where users.user_email = ?'
    connection.query(query, [user.email], (err, results, fields) => {
        console.log(results)
        if (!err) {
            if (results.length <= 0 || results[0].user_passw != user.password) {
                console.log("1")
                res.json({ status: "danger", message: "Incorrect username or password" })

            }
            else if (results[0].verified == 0) {
                console.log("1a")
                res.json({ status: "danger", message: "Please verify your account" })


            }
            else if (results[0].authorized == 0) {
                console.log("2")
                res.json({ status: "warning", message: "You are not approved by Admin" })

            }
            else if (results[0].user_passw == user.password) {
                console.log("3")
                const response = { email: results[0].user_email }
                const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '1h' })

                res.cookie("token", accessToken, { maxAge: 3600000 })

                res.redirect("/admin");

            }
            else {
                console.log("4")
                return res.status(400).json({ message: "Something went wrong please try again" })
            }
        }
        else {
            console.log("5")
            return res.status(500).json("sqlMessage" + err["sqlMessage"]);
        }
    })
})

module.exports = route;



