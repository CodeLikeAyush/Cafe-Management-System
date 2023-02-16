const connection = require('../connection');
// const sendMail = require('../sendMail');
// const secretKey = require('../secretKey');
// const verify = require('../verify');

const express = require('express');
const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');





const route = express.Router();

route.post('/', (req, res) => {

    const user = req.body;

    // query = 'select email, password,role,status from users where `email` = ?'
    // query = 'select (user.email) as email, (userAuth.user_passw) as pass,(userAuth.athorized) as authorized from users as user,user_auth as userAuth where `email` = ?'
    let query = ' select usr.user_email,auth.user_passw,auth.authorized from users as usr,user_auth as auth where usr.user_email = ?'
    console.log(user)
    connection.query(query, [user.email], (err, results, fields) => {
        // console.log(results)
        if (!err) {
            if (results[0].length <= 0 || results[0].user_passw != user.password) {
                res.json({ message: "Incorrect username or password" })
            }
            else if (results[0].authorized == 'false') {
                res.json({ message: "You are not approved by Admin" })
            }
            else if (results[0].user_passw == user.password) {
                const response = { email: results[0].user_email }
                const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '1h' })

                // res.json({ token: accessToken });
                res.cookie("token", accessToken, { maxAge: 3600000 })
                // res.cookie("role", results[0].role, { maxAge: 3600000 })

                // if (results[0].role == 'admin') {
                res.redirect("/admin/dashboard");
                // res.render('pages/admin_dashboard')
                // } else if (results[0].role == 'user') {
                // res.render('pages/about.ejs')
                // res.redirect("/user");

                // }
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



