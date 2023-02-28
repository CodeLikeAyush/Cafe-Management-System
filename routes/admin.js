const connection = require('../connection');
const sendMail = require('../sendMail');
const secretKey = require('../secretKey');
const verify = require('../verify');

const express = require('express');
var multer = require('multer');
var upload = multer();

// const jwt = require('jsonwebtoken');




const route = express.Router();
// +++++++++++++++++++++++++++++++++++Dashboard++++++++++++++++++++++++++++++++++++++++++++++++
route.get('/dashboard', verify, async (req, res) => {
    // let query = 'select COUNT(distinct cat.category_id) as cat_count,COUNT(distinct prod.product_id) as prod_count from prod_category as cat, products as prod'
    let query = 'select COUNT(distinct cat.categ_id) as cat_count,COUNT(distinct prod.prod_id) as prod_count,COUNT(distinct ord.ord_id) as ord_count from prod_category as cat, products as prod, cust_order as ord'


    connection.query(query, (err, results, fields) => {
        // console.log(results)
        if (!err) {
            res.render("pages/admin_dashboard", { category_count: results[0].cat_count, product_count: results[0].prod_count, order_count: results[0].ord_count });
            // res.json({m:32})
        } else {
            console.log(err)
            return res.status(500).json(err);
        }
    })
})

// // +++++++++++++++++++++++++++++++++++++++++++/dashboard/manage_product++++++++++++++++++++++++++++++
// route.get('/dashboard', verify, async (req, res) => {
//     // let query = 'select COUNT(distinct cat.category_id) as cat_count,COUNT(distinct prod.product_id) as prod_count from prod_category as cat, products as prod'
//     let query = 'select COUNT(distinct cat.category_id) as cat_count,COUNT(distinct prod.product_id) as prod_count from prod_category as cat, products as prod'

//     connection.query(query, (err, results, fields) => {
//         if (!err) {
//             res.render("pages/admin_dashboard", { prod_count: results[0].prod_count, categ_count: results[0].cat_count });
//         } else {
//             console.log(err)
//             return res.status(500).json(err);
//         }
//     })
// })

// +++++++++++++++++++++++++++++++++++++++++++/dashboard/manage_product++++++++++++++++++++++++++++++
route.get('/dashboard/manage_product', async (req, res) => {
    // let query = 'select * from products'
    // let query = 'SELECT products.product_id, products.product_name, prod_category.category_name, prod_category.category_id, prod_category.category_id, products.product_description, products.price, products.in_stock FROM products INNER JOIN prod_category ON products.product_category = prod_category.category_id'
    let query = 'SELECT products.prod_id, products.prod_name, prod_category.categ_name, prod_category.categ_id, products.prod_desc, products.unit_price, products.in_stock FROM products INNER JOIN prod_category ON products.prod_categ_id = prod_category.categ_id'

    connection.query(query, (err, results, fields) => {
        // console.log(results)
        if (!err) {
            res.json(results);
        }
        else {
            console.log(err)
            return res.status(500).json(err);
        }
    })
})

//+++++++++++++++++++++++++++++++++++++toggle inStock+++++++++++++++++++++++++++++++++++++++++++++
route.patch('/dashboard/manage_product/toggleStock', verify, async (req, res) => {
    // console.log(req.body)
    // const 
    let query = 'update products set `in_stock` = ? where prod_id = ?;'

    connection.query(query, [req.body.inStock, req.body.id], (err, results, fields) => {
        if (!err) {
            console.log(results)
            if (req.body.inStock) {
                res.json({ status: "success", message: "In Stock..." })
            }
            else {
                res.json({ status: "info", message: "Out of Stock..." })

            }

        }
        else {
            console.log(err)
            res.json({ status: "danger", message: "Product Stock Update Failed..." })
        }
    })
    // res.status(200).json({ message: req.body })
    // console.log(req.url)
    // res.send(req.url)

})
//+++++++++++++++++++++++++++++++++++++delete product+++++++++++++++++++++++++++++++++++++++++++++
route.delete('/dashboard/manage_product/delete_product', verify, async (req, res) => {
    console.log(req.body)
    let query = 'delete from products where prod_id = ?;'

    connection.query(query, [req.body.prod_id], (err, results, fields) => {
        if (!err) {
            console.log(results)
            res.json({ status: "warning", message: "Product Deleted..." })
        }
        else {
            console.log(err)
            res.json({ status: "danger", message: "Product Deletion Failed..." })
        }
    })


})

// add new product:+++++++++++++++++++++++++++++++++++++++++++++++++++
route.post('/dashboard/manage_product/add_prod', upload.fields([]), async (req, res) => {

    // const prod_id = req.body.id;
    const prod_name = (req.body.name).toLocaleUpperCase();
    const prod_categ = (req.body.category).toLocaleUpperCase();
    const prod_desc = (req.body.description).toLocaleUpperCase();
    const prod_price = req.body.price;

    let query = 'insert into products (prod_name,prod_categ_id,in_stock,prod_desc,unit_price) VALUES (?,(select categ_id from prod_category where categ_name = ?),true,?,?)'

    connection.query(query, [prod_name, prod_categ, prod_desc, prod_price], (err, results, fields) => {
        console.log(results);
        if (!err) {
            console.log(results)
            res.json({ status: "success", message: "Product added...", prod_id: results.insertId })

        }
        else {
            console.log(err)
            res.json({ status: "danger", message: `${prod_name} already exists` })

        }
    })


})



route.get('/dashboard/manage_product/edit_prod', async (req, res) => {
    let query = 'select prod_category.categ_id,prod_category.categ_name from prod_category'

    connection.query(query, (err, results, fields) => {
        console.log(results)
        if (!err) {
            res.json(results)
            // res.json({ status: "success", message: "Product Stock Updated..." })

        }
        else {
            console.log(err);
            // res.json({ status: "error", message: "Product Stock Update Failed..." })

        }
    })
})
route.post('/dashboard/manage_product/edit_prod', upload.fields([]), async (req, res) => {

    const prod_id = req.body.id;
    const prod_name = (req.body.name).toLocaleUpperCase();
    const prod_categ = (req.body.category).toLocaleUpperCase();
    const prod_desc = (req.body.description).toLocaleUpperCase();
    const prod_price = req.body.price;

    let query = 'update products set prod_name = ?,prod_desc = ?,unit_price = ?,prod_categ_id = (select categ_id from prod_category where categ_name = ?) where prod_id = ?'

    connection.query(query, [prod_name, prod_desc, prod_price, prod_categ, prod_id], (err, results, fields) => {
        if (!err) {
            console.log(results)
            res.json({ status: "success", message: "Product Updated..." })

        }
        else {
            console.log(err)
            res.json({ message: err })
            res.json({ status: "danger", message: "Product Update Failed..." })

        }
    })


})

// ++++++++++++++++++++++++++++++CREATE ORDER++++++++++++++++++++++++++++++++++++++++++++++++++++
route.get('/dashboard/create_order', async (req, res) => {

    let query = 'select prod_id, prod_name, unit_price from products where in_stock = true'

    connection.query(query, (err, results, fields) => {
        console.log(results)
        if (!err) {
            res.json(results)
            // res.json({ status: "success", message: "Product Stock Updated..." })

        }
        else {
            console.log(err);
            res.json({ status: "error", message: "Unable to fetch products..." })

        }
    })
})











































































































// //++++++++++++++++++++++++++++++++++++++admin signup+++++++++++++++++++++++++++++++++++++++++++++++
// route.post('/signup', async (req, res) => {
//     const newSecretKey = secretKey();
//     try {
//         // console.log(mail)
//         const { name, contactNumber, email, password } = req.body;

//         let query = 'select email,password,role,status from users where `email` = ?'
//         // ---------------------------------------------
//         connection.query(query, [email], (err, results, fields) => {
//             if (!err) {
//                 console.log(results)

//                 if (results.length <= 0) {// user doesn't exists:
//                     console.log("user doesn't exists so registering")

//                     query = 'insert into users (`name`,`contactNumber`,`email`,`password`,`status`,`role`) VALUES(?,?,?,?,"true","user")'
//                     connection.query(query, [name, contactNumber, email, password], async (err, results, fields) => {
//                         if (!err) {
//                             // let jwtToken;
//                             // const userData = { 'email': email, name: name };
//                             // jwtToken = await jwt.sign(userData, secretKey, {
//                             //     expiresIn: '43200s' // token will expire in 12 hours
//                             // });


//                             // mail(email, jwtToken, result._id);
//                             return res.status(200).json({ message: "Registrations Success" })
//                         }
//                         else {
//                             console.log("sqlMessage:" + err["sqlMessage"])
//                             return res.status(400).json(err["sqlMessage"]);
//                         }
//                     })


//                 }
//                 else {// user already exists:
//                     console.log("user already exists")
//                     return res.status(409).json({ message: "already exists", user: results[0] });
//                 }

//             }
//             else {
//                 console.log("sqlMessage:" + err["sqlMessage"])
//                 return res.status(500).json(err["sqlMessage"]);
//             }

//         })



//     } catch (err) {
//         res.status(400).send("Error at try-catch of /admin/register:" + err);
//     }
// })



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
