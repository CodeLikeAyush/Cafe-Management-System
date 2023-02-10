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

    query = 'select email, password,role,status from users where `email` = ?'

    connection.query(query, [user.email], (err, results, fields) => {
        // console.log(results)
        if (!err) {
            if (results.length <= 0 || results[0].password != user.password) {
                return res.status(401).json({ message: "Incorrect username or password" })
            }
            else if (results[0].status == 'false') {
                return res.status(401).json({ message: "You are not approved by Admin" })
            }
            else if (results[0].password == user.password) {
                const response = { email: results[0].email, role: results[0].role }
                const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '12h' })

                // res.status(200).json({ token: accessToken });
                res.cookie("token", accessToken, { maxAge: 360000 })
                res.cookie("role", results[0].role, { maxAge: 360000 })

                if (results[0].role == 'admin') {
                    res.redirect("/admin/dashboard");
                    // res.render('pages/admin_dashboard')
                } else if (results[0].role == 'user') {
                    // res.render('pages/about.ejs')
                    res.redirect("/user");

                }
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



