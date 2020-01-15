const winston = require('winston')
const fetch = require('node-fetch')
const consoleTransport = new winston.transports.Console()
const myWinstonOptions = {
    transports: [consoleTransport]
}
const redis = require('redis');
const client = redis.createClient();
client.on('error', (err) => {
    console.log("Error " + err);
});
const logger = new winston.createLogger(myWinstonOptions)
// Mail:
// const SMTPConnection = require("nodemailer/lib/smtp-connection");
// const connection = new SMTPConnection({
//     port: 8009
// });

// connection.connect(function (error, response) {
//     if (error) {
//         console.log("connect failed =", error)
//     }
//     let auth = {
//         credentials: {
//             user: "sidhu",
//             pass: "sidhu123"
//         }
//     }
//     connection.login(auth, function (err, info) {
//         if (err) {
//             console.log("Auth failed =", info)
//         }
//         console.log("Connect success =", response)
//     });
// });

// connection.on('error', (error) => {
//     console.log("end of mail client=", error)
//     connection.reset()
// })

// const dc_metro_crime = require('../../model/dc_metro_crime')

// async function sendMail(req, res) {
//     let envelope = {
//         from: "my_user@example.com",
//         to: "someone@example.com"
//     }
//     let message = "hi sample mail"

//     connection.send(envelope, message, function (err, info) {
//         if (err) {
//             console.log("err =", err)
//         }
//         console.log("info =", info)
//         // connection.quit();
//     })
//     res.status(200).send("mail sent success")
// }

const nodemailer = require('nodemailer');

async function sendMailUsingNodeMailer(req, res) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'localhost',
            port: 8009,
            secure: false, // true for 465, false for other ports
            auth: {
                user:'sidhu', // generated ethereal user
                pass: 'sidhu123'  // generated ethereal password
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: 'sunapusiddharth3@crime_explorer.com, baz@crime_explorer.com', // list of receivers
            subject: 'Hello ✔', // Subject line
            text: 'Hello world?', // plain text body
            html: '<b>Hello world?</b>' // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("hi error here ")
                res.status(500).send(error)
                return console.log(error);
            }
            console.log("hi success herfe ")
            res.status(200).send(info)
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
}



module.exports = {
    // sendMail,
    sendMailUsingNodeMailer
}