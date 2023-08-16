require('dotenv').config();
const nodemailer = require('nodemailer');




const sendMail = async (email, subject, html) => {
    try {
        console.log(email)

        const transporter = nodemailer.createTransport({
            host: "smtp.zoho.in",
            secure: true,
            port: 465,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        })

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: subject,
            html: html
        }

        const result = await transporter.sendMail(mailOptions);
        console.log(result);
        return result

    } catch (err) {
        console.log(err);
        return
    }

}


module.exports = sendMail;

