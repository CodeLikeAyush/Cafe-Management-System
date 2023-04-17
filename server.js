require('dotenv').config();


const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');




const userRoute = require('./routes/user');
const adminRoute = require('./routes/admin');
const loginRoute = require('./routes/login');
const logoutRoute = require('./routes/logout');
const signupRoute = require('./routes/signup');
const verifyEmailRoute = require('./routes/verify_email');

const verify = require('./verify');
const connection = require('./connection');



const app = express();
const port = process.env.PORT || 4000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// for parsing multipart/form-data
// app.use(upload.array());
app.use(express.static("public")); // for using static files(images etc. in our html(ejs))
app.use(cookieParser()); // for parsing cookies



app.use('/signup', signupRoute);
app.use('/login', loginRoute);
app.use('/verify', verifyEmailRoute);
app.use('/logout', logoutRoute);
app.use('/user', userRoute);
app.use('/admin', adminRoute);

// app.get('/',(req,res)=>{
//     res.status(200).json({message:"Home Hi"})
// })

app.use(cors());


// View Engine Setup
app.set('view engine', 'ejs')

app.get('/', verify, (req, res) => {

    let query = 'SELECT (SELECT COUNT(*) FROM prod_category) as cat_count, (SELECT COUNT(*) FROM products) as prod_count, (SELECT COUNT(*) FROM cust_order) as ord_count'

    connection.query(query, (err, results, fields) => {
        // console.log(results)

        if (!err) {
            res.render("pages/admin_dashboard", { prod_count: results[0].prod_count, categ_count: results[0].cat_count, ord_count: results[0].ord_count });
        } else {
            console.log(err)
            return res.status(500).json(err);
        }
    })


})
app.listen(port, () => console.log(`Server is online at: http://localhost:${port}`));

module.exports = app;