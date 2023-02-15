const connection = require('../connection');
const sendMail = require('../sendMail');
// const secretKey = require('../secretKey');
// const verify = require('../verify');

const express = require('express');
const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');
var multer = require('multer');
var upload = multer();




const route = express.Router();

route.post('/', upload.fields([]), (req, res) => {

    const user = req.body;
    // console.log(user)

    // query = 'select email, password,role,status from users where `email` = ?'
    // query = 'select (user.email) as email, (userAuth.user_passw) as pass,(userAuth.athorized) as authorized from users as user,user_auth as userAuth where `email` = ?'
    // let query = ' select usr.user_email,auth.user_passw,auth.authorized from users as usr,user_auth as auth where usr.user_email = ?'
    let query = 'select user_email from users where user_email = ?'

    connection.query(query, [user.email], (err, results, fields) => {
        // console.log(results);
        if (!err) {
            if (results.length <= 0) {// email is not registered so register it

                // 1. insert into users table:
                query = 'insert into users (user_name,user_email,mob_no) values(?,?,?)'
                connection.query(query, [user.name, user.email, user.password], (err, results, fields) => {
                    if (!err) {
                        // console.log(results.insertId);
                        const user_id = results.insertId;

                        const otp = (Math.floor(Math.random() * 1000000)).toString();
                        // 1. insert pass,otp etc. into user_auth table and send mail:
                        query = 'insert into user_auth (auth_id,user_passw,email_otp) values (?,?,?)'
                        connection.query(query, [user_id, user.password, otp,], (err, results, fields) => {
                            console.log(results);
                            if (!err) {
                                const subject = "OTP verification"
                                const html = ` 
                                <h2>Hi user</h2>
                                <p>Here is your otp for verification</p>
                                <h2>${otp}</h2>
                                <a href="google.com">Verify Account</a>
                            `
                                // sendMail(user.email, subject, html)
                                res.json({ message: "Otp sent" })
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

                query = 'select verified from user_auth where auth_id = (select user_id from users where user_email = ?) '
                connection.query(query, [results[0].user_email], (err, results, fields) => {
                    if (results[0].verified) {// registered user is verified so tell him to login
                        console.log("verified please login")
                        res.json({ message: "You are aleady registered please proceed to  login to your account" })
                    }
                    else {// registered but not verified by otp so send mail

                        console.log("registered but not verified sending mail")

                        // generate new otp and save it to database and send a mail with otp:
                        const otp = (Math.floor(Math.random() * 1000000)).toString();
                        query = 'update user_auth set email_otp = ? where auth_id = (select user_id from users where user_email = ?)'
                        connection.query(query, [otp, results[0].user_email], (err, results, fields) => {
                            if (!err) {
                                const subject = "OTP verification"
                                const html = ` 
                                <h2>Hi user</h2>
                                <p>Here is your otp for verification</p>
                                <h2>${otp}</h2>
                                <a href="google.com">Verify Account</a>
                            `
                                // sendMail(user.email, subject, html)
                            }
                            else {
                                console.log(err);
                                res.json(err);
                            }
                        })


                        res.json({ message: "Otp for verification sent to your email" })
                    }
                })
            }

        }
        else {
            console.log(err);
            res.json(err);
        }
    })
    // connection.query(query, [user.email], (err, results, fields) => {
    // console.log(results)
    // if (!err) {
    //     if (results.length <= 0 || results[0].user_passw != user.password) {
    //         res.json({ message: "Incorrect username or password" })
    //     }
    //     else if (results[0].authorized == 'false') {
    //         res.json({ message: "You are not approved by Admin" })
    //     }
    //     else if (results[0].user_passw == user.password) {
    //         const response = { email: results[0].user_email }
    //         const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '1h' })

    //         // res.json({ token: accessToken });
    //         res.cookie("token", accessToken, { maxAge: 3600000 })
    //         res.cookie("role", results[0].role, { maxAge: 3600000 })

    //         // if (results[0].role == 'admin') {
    //         res.redirect("/admin/dashboard");
    //         // res.render('pages/admin_dashboard')
    //         // } else if (results[0].role == 'user') {
    //         // res.render('pages/about.ejs')
    //         // res.redirect("/user");

    //         // }
    //     }
    //     else {
    //         return res.status(400).json({ message: "Something went wrong please try again" })
    //     }
    // }
    // else {
    //     return res.status(500).json("sqlMessage" + err["sqlMessage"]);
    // }
    // })
})

module.exports = route;



