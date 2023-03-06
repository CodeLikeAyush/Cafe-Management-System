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

    const data = req.body;
    console.log(data);
    const otp = data.otp;
    const email = data.email;
    let query = ' select users.user_email, user_auth.user_passw,user_auth.authorized,user_auth.verified from users inner join user_auth on users.user_id = user_auth.user_id where users.user_email = ?'
    query = 'select email_otp from user_auth where user_id = (select user_id from users where user_email = ?)'

    connection.query(query, [email], (err, results, fields) => {
        if (!err) {
            console.log(results);
            if (results.length == 0) {
                res.json({ status: "danger", message: "You are not registered" })
            }
            else if (results[0].email_otp != otp) {
                res.json({ status: "danger", message: "Invalid OTP" })
            }
            else {
                query = 'update user_auth set verified = 1 where user_id = (select user_id from users where user_email = ?)'
                connection.query(query, [data.email], (err, results, fields) => {
                    if (!err) {
                        console.log(results);
                        res.json({ status: "success", message: "Email Verification Successful" })
                        // res.redirect('/admin');

                    }
                    else {
                        console.log(err);
                    }
                })
            }
        }
        else {
            console.log(err);
        }
    })

})

module.exports = route;



