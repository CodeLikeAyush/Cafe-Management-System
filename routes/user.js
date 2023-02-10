const express = require('express');
const route = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const connection = require('../connection');
const sendMail = require('../sendMail');
// const verify = require('../verify');





route.get('/', async (req, res) => {
    res.status(200).json({ message: "HI user" })
})

//++++++++++++++++++++++++++++++++++++++user signup+++++++++++++++++++++++++++++++++++++++++++++++
route.post('/signup', (req, res) => {

    let user = req.body;
    console.log(user.name)
    console.log(user.email)
    let query = 'select email,password,role,status from users where `email` = ?'


    connection.query(query, [user.email], (err, results, fields) => {
        if (!err) {
            console.log(results)

            if (results.length <= 0) {// user doesn't exists:
                console.log("user doesn't exists so registering")

                query = 'insert into users (`name`,`contactNumber`,`email`,`password`,`status`,`role`) VALUES(?,?,?,?,"false","user")'
                connection.query(query, [user.name, user.contactNumber, user.email, user.password], (err, results, fields) => {
                    if (!err) {
                        return res.status(200).json({ message: "Registrations Success" })
                    }
                    else {
                        console.log("sqlMessage" + err["sqlMessage"])
                        return res.status(400).json(err["sqlMessage"]);
                    }
                })


            }
            else {// user already exists:
                console.log("user already exists")
                return res.status(409).json({ message: "already exists", user: results[0] });
            }

        }
        else {
            console.log("sqlMessage" + err["sqlMessage"])
            return res.status(500).json(err["sqlMessage"]);
        }

    })


})


//+++++++++++++++++++++++++++++++++++++++++user login+++++++++++++++++++++++++++++++++++++++++++++++
// route.post('/login', verify, (req, res) => {
route.post('/login', (req, res) => {

    const user = req.body;
    console.log(user.email)
    console.log(user)

    query = 'select email, password,role,status from users where `email` = ?'

    connection.query(query, [user.email], (err, results, fields) => {
        console.log(results)
        if (!err) {
            if (results.length <= 0 || results[0].password != user.password) {
                return res.status(401).json({ message: "Incorrect username or password" })
            }
            else if (results[0].status == 'false') {
                return res.status(401).json({ message: "You are not approved by Admin" })
            }
            else if (results[0].password == user.password) {
                const response = { email: results[0].email, role: results[0].role }
                const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '1h' })

                res.cookie("token", accessToken);
                res.status(200).redirect("http://localhost:8080/user")
                // res.status(200).render('modal')
                // res.status(200).json({ token: accessToken });
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



// +++++++++++++++++++++++++++++++++++++++forgot password+++++++++++++++++++++++++++++++++++++++++
route.post('/forgotpassword', (req, res) => {
    const user = req.body;
    query = 'select email,password from users where `email` = ?'

    connection.query(query, [user.email], (err, results, fields) => {
        if (!err) {
            if (results.length <= 0) {
                return res.status(200).json({ message: "User not found" })
            } else {
                sendMail(user.email, "jwt_token_here", "id_or_something_here")
                return res.status(200).json({ message: "password sent succesfully to your email" })

            }
        } else {
            return res.status(500).json(err);
        }
    })
})


// route.get('/get', (req, res) => {
//     var query = 'select id, name, email, contactNumber,status from users where role = "user"'

//     connection.query(query, (err, results, fields) => {
//         if (!err) {
//             return res.status(200).json(results);
//         }
//         else {
//             return res.status(500).json(err);
//         }
//     })
// })


// route.get('/checkToken', (req, res) => {
//     return res.status(200).json({ message: "ture" });
// })

route.post('/changepassword', (req, res) => {

})
module.exports = route;