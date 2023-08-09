const connection = require('../connection');
const sendMail = require('../sendMail');
// const secretKey = require('../secretKey');
// const verify = require('../verify');

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var multer = require('multer');
var upload = multer();




const route = express.Router();

route.post('/', upload.fields([]), (req, res) => {

    const user = req.body;
    // console.log(user)


    let query = 'select user_email from users where user_email = ?'

    connection.query(query, [user.email], (err, results, fields) => {
        // console.log(results);
        if (!err) {
            if (results.length <= 0) {// email is not registered so register it

                // 1. insert into users table:
                query = 'insert into users (user_name,user_email) values(?,?)'
                connection.query(query, [user.name, user.email], async (err, results, fields) => {
                    if (!err) {
                        // console.log(results.insertId);
                        const user_id = results.insertId;

                        const otp = (Math.floor(Math.random() * 1000000)).toString();
                        password = await bcrypt.hash(user.password, 10);
                        // 1. insert pass,otp etc. into user_auth table and send mail:
                        query = 'insert into user_auth (user_id,user_passw,email_otp) values (?,?,?)'
                        connection.query(query, [user_id, password, otp,], (err, results, fields) => {
                            console.log(results);
                            if (!err) {
                                const subject = "OTP verification"
                                const html = ` 
                                <h2>Hi user</h2>
                                <p>Here is your otp for verification</p>
                                <h2>${otp}</h2>
                                <a href="google.com">Verify Account</a>
                            `
                                sendMail(user.email, subject, html)
                                res.json({ status: "success", message: "OTP Sent to your email." })

                            }
                            else {
                                console.log(err)
                                res.json(err);
                            }

                        })

                    }
                    else {
                        console.log(err);
                        res.json(err);
                    }
                })
            }
            else {// email is already registered(results value is [ { user_email: 'user@gmail.com' } ]). If account is not verified then send otp again, else send response saying that email is already registered

                query = 'select verified from user_auth where user_id = (select user_id from users where user_email = ?) '
                connection.query(query, [results[0].user_email], (err, results, fields) => {
                    console.log(results)
                    if (results[0].verified) {// registered user is verified so tell him to login
                        console.log("verified please login")
                        res.json({ status: "success", message: "You are aleady verified please proceed to  login to your account" })

                    }
                    else {// registered but not verified by otp so send mail

                        console.log("registered but not verified sending mail")

                        // generate new otp and save it to database and send a mail with otp:
                        const otp = (Math.floor(Math.random() * 1000000)).toString();
                        query = 'update user_auth set email_otp = ? where user_id = (select user_id from users where user_email = ?)'
                        connection.query(query, [otp, user.email], (err, results, fields) => {
                            if (!err) {
                                console.log(results)
                                const subject = "OTP Ayush Cafe"
                                const html = ` 
                                <h2>Hi user</h2>
                                <p>Here is your otp please proceed to verify your account</p>
                                <h2>${otp}</h2>
                                <a href="http://localhost:8080/">Verify Account</a>
                            `
                                sendMail(user.email, subject, html)
                            }
                            else {
                                console.log(err);
                                res.json(err);
                            }
                        })


                        res.json({ status: "success", message: "Otp for verification sent to your email" })

                    }
                })
            }

        }
        else {
            console.log(err);
            res.json(err);
        }
    })

})

module.exports = route;



