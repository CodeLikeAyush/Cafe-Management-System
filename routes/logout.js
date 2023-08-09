const connection = require('../connection');

const express = require('express');
const jwt = require('jsonwebtoken');





const route = express.Router();

route.get('/', (req, res) => {
    res.clearCookie("token");
    res.redirect('/')
})

module.exports = route;



