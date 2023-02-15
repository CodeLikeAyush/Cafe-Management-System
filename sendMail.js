// const crypto = require('crypto');
require('dotenv').config();
const nodemailer = require('nodemailer');
// const { google } = require('googleapis');



const clientId = '546297859053-femo53knv0a89t7h0n4rr4u2lvcv2hmg.apps.googleusercontent.com'
const clientSecret = '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'
const redirectURI = 'https://developers.google.com/oauthplayground'
const refreshToken = '1//04rgeR_lXlQGfCgYIARAAGAQSNwF-L9IrF9CgfpFsKw-prWqlkqB8nH-lkgFCU2dh7H4sY-Ll2QsRwYJ3uhJllKyHFFX9A9U4kcw'


// const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectURI);

// oAuth2Client.setCredentials({ refresh_token: refreshToken });





const sendMail = async (email, subject, html) => {
    try {
        console.log(email)
        // console.log(jwtToken)
        // const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            host: "smtp.zoho.in",
            secure: true,
            port: 465,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        })

        // const verificationLink = `http://localhost:4200/verifyemail?token=${jwtToken}&id=${_id}`
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: subject,
            html: html
        }

        const result = await transport.sendMail(mailOptions);
        console.log(result);
        return result

    } catch (err) {
        console.log(err);
        return
    }

}


module.exports = sendMail;

