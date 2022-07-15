require("dotenv").config()
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAUTH2",
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
            clientId: process.env.OAUTH_CLIENTID,
            clientSecret: process.env.OAUTH_CLIENT_SERCRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN
        }
    }

)
const send = (to, subject, html) => {
    console.log(to)
    let mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: to,
        subject: subject,
        text: "Todo List Project Verification",
        html: html
    }

    transporter.sendMail(mailOptions, function(error, result) {
        if (error) console.log(error)
        console.log(result)
    })

}

const sendMultiple = (to, subject, html) => {
    console.log(to)
    let mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: to,
        cc: to,
        subject: subject,
        text: "Todo List Project Verification",
        html: html
    }

    transporter.sendMail(mailOptions, function(error, result) {
        if (error) console.log(error)
        console.log(result)
    })

}

module.exports = { send, sendMultiple }