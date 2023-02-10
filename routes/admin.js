const connection = require('../connection');
const sendMail = require('../sendMail');
const secretKey = require('../secretKey');
const verify = require('../verify');

const express = require('express');
const jwt = require('jsonwebtoken');




const route = express.Router();

route.get('/dashboard', verify, async (req, res) => {
    // res.status(200).json({ message: "HI admin" })
    res.render("pages/admin_dashboard");
})

//++++++++++++++++++++++++++++++++++++++admin signup+++++++++++++++++++++++++++++++++++++++++++++++
route.post('/signup', async (req, res) => {
    const newSecretKey = secretKey();
    try {
        // console.log(mail)
        const { name, contactNumber, email, password } = req.body;

        let query = 'select email,password,role,status from users where `email` = ?'
        // ---------------------------------------------
        connection.query(query, [email], (err, results, fields) => {
            if (!err) {
                console.log(results)

                if (results.length <= 0) {// user doesn't exists:
                    console.log("user doesn't exists so registering")

                    query = 'insert into users (`name`,`contactNumber`,`email`,`password`,`status`,`role`) VALUES(?,?,?,?,"true","user")'
                    connection.query(query, [name, contactNumber, email, password], async (err, results, fields) => {
                        if (!err) {
                            // let jwtToken;
                            // const userData = { 'email': email, name: name };
                            // jwtToken = await jwt.sign(userData, secretKey, {
                            //     expiresIn: '43200s' // token will expire in 12 hours
                            // });


                            // mail(email, jwtToken, result._id);
                            return res.status(200).json({ message: "Registrations Success" })
                        }
                        else {
                            console.log("sqlMessage:" + err["sqlMessage"])
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
                console.log("sqlMessage:" + err["sqlMessage"])
                return res.status(500).json(err["sqlMessage"]);
            }

        })



    } catch (err) {
        res.status(400).send("Error at try-catch of /admin/register:" + err);
    }
})

// //+++++++++++++++++++++++++++++++++++++++++admin login+++++++++++++++++++++++++++++++++++++++++++++++
// route.post('/login', verify, (req, res) => {

//     const user = req.body;

//     query = 'select email, password,role,status from users where `email` = ?'

//     connection.query(query, [user.email], (err, results, fields) => {
//         // console.log(results)
//         if (!err) {
//             if (results.length <= 0 || results[0].password != user.password) {
//                 return res.status(401).json({ message: "Incorrect username or password" })
//             }
//             else if (results[0].status == 'false') {
//                 return res.status(401).json({ message: "You are not approved by Admin" })
//             }
//             else if (results[0].password == user.password) {
//                 const response = { email: results[0].email, role: results[0].role }
//                 const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '12h' })

//                 // res.status(200).json({ token: accessToken });
//                 res.cookie("token", accessToken, { expiresIn: 1000 })
//                 res.redirect("/admin/dashboard");
//             }
//             else {
//                 return res.status(400).json({ message: "Something went wrong please try again" })
//             }
//         }
//         else {
//             return res.status(500).json("sqlMessage" + err["sqlMessage"]);
//         }
//     })
// })



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
            res.end()
        }
    })
})


//+++++++++++++++++++++++++++++++++++++get all product+++++++++++++++++++++++++++++++++++++++++++++
route.get('/dashboard/get_all_users', verify, async (req, res) => {

    let query = 'SELECT products.product_id, products.product_name, prod_category.category_name, products.product_description, products.price, products.in_stock, product_description, products.price, products.in_stock FROM products INNER JOIN prod_category ON products.product_category = prod_category.category_id'

    connection.query(query, (err, results, fields) => {
        if (!err) {
            // console.log(results)
            if (results.length <= 0) {
                return res.status(200).json({ productCount: 0, products: results })
            } else {
                return res.status(200).json({ productCount: results.length, products: results })
            }
        } else {
            console.log(err)
            return res.status(500).json(err);
        }
    })
})
//+++++++++++++++++++++++++++++++++++++update status of user+++++++++++++++++++++++++++++++++++++++++++++
route.patch('/updateuserstatus', (req, res) => {
    let user = req.body;

    var query = 'update users set `status` = ? where `email` = ?'

    connection.query(query, [user.status, user.email], (err, results, fields) => {
        if (!err) {
            console.log(results)
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "user not found" })
            }
            else {
                return res.status(200).json({ message: "user status updated successfully" })
            }
        }
        else {
            return res.status(500).json(err);
        }
    })
})





module.exports = route;
