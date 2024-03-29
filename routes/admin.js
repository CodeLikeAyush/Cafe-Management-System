const connection = require('../connection');
const sendMail = require('../sendMail');
const secretKey = require('../secretKey');
const verify = require('../verify');
const generateBill = require('../bill_generator')


const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
var multer = require('multer');
var upload = multer();





const route = express.Router();
// +++++++++++++++++++++++++++++++++++Dashboard++++++++++++++++++++++++++++++++++++++++++++++++
route.get('/', verify, async (req, res) => {
    // let query = 'select COUNT(distinct cat.category_id) as cat_count,COUNT(distinct prod.product_id) as prod_count from prod_category as cat, products as prod'
    let query = 'SELECT (SELECT COUNT(*) FROM prod_category) as cat_count, (SELECT COUNT(*) FROM products) as prod_count, (SELECT COUNT(*) FROM cust_order) as ord_count'


    connection.query(query, (err, results, fields) => {
        // console.log(results)
        if (!err) {
            res.render("pages/admin_dashboard", { categ_count: results[0].cat_count, prod_count: results[0].prod_count, ord_count: results[0].ord_count });
            // res.json({m:32})
        } else {
            return res.status(500).json(err);
        }
    })
})



// +++++++++++++++++++++++++++++++++++++++++++/dashboard/manage_product++++++++++++++++++++++++++++++
route.get('/manage_product', verify, async (req, res) => {
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
route.patch('/manage_product/toggleStock', verify, async (req, res) => {
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
    
})
//+++++++++++++++++++++++++++++++++++++delete product+++++++++++++++++++++++++++++++++++++++++++++
route.delete('/manage_product/delete_product', verify, async (req, res) => {
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
route.post('/manage_product/add_prod', verify, upload.fields([]), async (req, res) => {

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



route.get('/manage_product/edit_prod', verify, async (req, res) => {
    let query = 'select prod_category.categ_id,prod_category.categ_name from prod_category'

    connection.query(query, (err, results, fields) => {
        console.log(results)
        if (!err) {
            res.json(results)

        }
        else {
            console.log(err);

        }
    })
})
route.post('/manage_product/edit_prod', verify, upload.fields([]), async (req, res) => {

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

// ++++++++++++++++++++++++++++SEND PRODUCT INFO FOR ORDER PAGE+++++++++++++++++++++++++++++++++++++++++
route.get('/create_order', verify, async (req, res) => {

    let query = 'select prod_id, prod_name, unit_price from products where in_stock = true'

    connection.query(query, (err, results, fields) => {
        // console.log(results)
        if (!err) {
            res.json(results)

        }
        else {
            console.log(err);
            res.json({ status: "error", message: "Unable to fetch products..." })

        }
    })
})

// ++++++++++++++++++++++++++++CREATE ORDER +++++++++++++++++++++++++++++++++++++++++
route.post('/create_order', verify, upload.fields([]), async (req, res) => {


    let data = req.body;
    // console.log(data)
    let items = JSON.parse(data.items);
    // console.log(items);

    const tokenVerificationResult = await jwt.verify(req.cookies.token, process.env.ACCESS_TOKEN);
    // console.log(tokenVerificationResult)

    let customer_id = -1;
    bill_amount = data.bill_amount;
    let ord_id = -1;



    let query = ' insert into customer (cust_name,email,mob_no) values(?,?,?)';
    connection.query(query, [data.name, data.email, data.mob_no], (err, results, fields) => {
        if (!err) {
            // console.log(results);
            // console.log(results.insertId);
            customer_id = results.insertId;
            // res.json({ message: 'order received' });
            query = 'insert into cust_order (cust_id,ord_processed_by) values(? ,(select user_id from users where user_email = ?))'

            connection.query(query, [customer_id, tokenVerificationResult.email], async (err, results, fields) => {
                if (!err) {
                    // console.log(results);
                    // console.log(results.insertId);
                    ord_id = results.insertId;
                    let query = 'insert into ord_prod_relation_table (ord_id,prod_id,quantity,unit_price) values(?,?,?,(select unit_price from products where prod_id = ?))'
                    for (let i = 0; i < items.length; i++) {
                        const item = items[i];
                        connection.query(query, [ord_id, item.item_id, item.quantity, item.item_id], (err, results, fields) => {
                            if (!err) {
                                console.log(results);
                                // console.log(results.insertId);
                            }
                            else {
                                console.log(err);

                            }
                        })

                    }
                    generateBill(ord_id);
                    res.json({ status: "success", message: "Order Placed..." })
                }
                else {
                    console.log(err);
                    res.json({ message: err });
                }
            })
        }
        else {
            console.log(err);
            res.json({ message: err });

        }
    })

})



// fetch all bills:============================================================
route.get('/view_bills', verify, async (req, res) => {

    let query = 'select cust_order.ord_id, customer.cust_name,customer.email,customer.mob_no,cust_order.bill_amount,cust_order.ord_bill from customer inner join cust_order on customer.cust_id = cust_order.ord_id'

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
// fetch all category:============================================================
route.get('/manage_category', verify, async (req, res) => {

    let query = ' select categ_id,categ_name,(select count(prod_id) from products where prod_categ_id = categ_id) as prod_count from prod_category'

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


// add new category:+++++++++++++++++++++++++++++++++++++++++++++++++++
route.post('/manage_category/add_category', verify, upload.fields([]), async (req, res) => {

    // const prod_id = req.body.id;
    const category_name = (req.body.category).toLocaleUpperCase();
    

    let query = 'insert into prod_category (categ_name) VALUES (?)'

    connection.query(query, [category_name], (err, results, fields) => {
        console.log(results);
        if (!err) {
            console.log(results)
            res.json({ status: "success", message: "Category added...", categ_id: results.insertId })

        }
        else {
            console.log(err)
            res.json({ status: "danger", message: `${category_name} already exists` })

        }
    })


})




//+++++++++++++++++++++++++++++++++++++delete category+++++++++++++++++++++++++++++++++++++++++++++
route.delete('/manage_category/delete_category', verify, async (req, res) => {
    console.log(req.body)
    let query = 'delete from prod_category where categ_id = ?;'

    connection.query(query, [req.body.categ_id], (err, results, fields) => {
        if (!err) {
            console.log(results)
            res.json({ status: "warning", message: "Category Deleted..." })
        }
        else {
            console.log(err)
            res.json({ status: "danger", message: "Category Deletion Failed..." })
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
