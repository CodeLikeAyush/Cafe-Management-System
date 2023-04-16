const connection = require('../connection');
// const sendMail = require('../sendMail');
// const secretKey = require('../secretKey');
// const verify = require('../verify');

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var multer = require('multer');
var upload = multer();
// const cookieParser = require('cookie-parser');





const route = express.Router();

route.post('/', upload.fields([]), (req, res) => {

    const user = req.body;
    // console.log(user)

    let query = ' select users.user_email, user_auth.user_passw,user_auth.authorized,user_auth.verified from users inner join user_auth on users.user_id = user_auth.user_id where users.user_email = ?'
    connection.query(query, [user.email], async (err, results, fields) => {
        var passwordMatch = await bcrypt.compare(user.password, results[0].user_passw);
        // console.log(passwordMatch)
        // console.log(results)
        if (!err) {
            if (results.length <= 0 || !passwordMatch) {
                res.json({ status: "danger", message: "Incorrect username or password" })

            }
            else if (results[0].verified == 0) {
                res.json({ status: "danger", message: "Please verify your account" })


            }
            else if (results[0].authorized == 0) {
                res.json({ status: "warning", message: "You are not approved by Admin" })

            }
            else if (passwordMatch) {
                const response = { email: results[0].user_email }
                const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '1h' })

                res.cookie("token", accessToken, { maxAge: 3600000, httpOnly: true, secure: true, sameSite: 'strict' })

                res.redirect("/admin");

            }
            else {
                return res.status(400).json({ message: "Something went wrong please try again" })
            }
        }
        else {
            return res.status(500).json("sqlMessage" + err["sqlMessage"]);
        }
    })
})

module.exports = route;



