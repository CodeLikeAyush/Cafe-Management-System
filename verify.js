const verify = async (req, res, next) => {
    const jwt = require('jsonwebtoken');
    require('dotenv').config();
    try {


        const tokenVerificationResult = await jwt.verify(req.cookies.token, process.env.ACCESS_TOKEN); // this returns the payload of token.
        // console.log(tokenVerificationResult);
        next();

    } catch (err) {
        // console.log(err);
        res.render('pages/landing')
    }

}

module.exports = verify;