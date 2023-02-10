const connection = require('../connection');
// const sendMail = require('../sendMail');
// const secretKey = require('../secretKey');
// const verify = require('../verify');

const express = require('express');
const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');





const route = express.Router();

route.get('/', (req, res) => {
    res.clearCookie("token");
    // res.clearCookie("role");
    res.redirect('/')
})

module.exports = route;



