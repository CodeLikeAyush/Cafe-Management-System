

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');




const userRoute = require('./routes/user');
const adminRoute = require('./routes/admin');
const loginRoute = require('./routes/login');
const logoutRoute = require('./routes/logout');

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



app.use('/login', loginRoute);
app.use('/logout', logoutRoute);
app.use('/user', userRoute);
app.use('/admin', adminRoute);

// app.get('/',(req,res)=>{
//     res.status(200).json({message:"Home Hi"})
// })

app.use(cors());


// View Engine Setup
app.set('view engine', 'ejs')

app.get('/', verify, function (req, res) {
    const role = req.cookies.role;

    if (role === "admin") {
        let query = 'select COUNT(distinct cat.category_id) as cat_count,COUNT(distinct prod.product_id) as prod_count from prod_category as cat, products as prod'

        connection.query(query, (err, results, fields) => {
            if (!err) {
                res.render("pages/admin_dashboard", { prod_count: results[0].prod_count, categ_count: results[0].cat_countFF });
            } else {
                console.log(err)
                return res.status(500).json(err);
            }
        })
    }
    else if (role === "user") {
        res.render('pages/about')

    }

})
app.listen(port, () => console.log(`Server is online at: http://localhost:${port}`));

module.exports = app;