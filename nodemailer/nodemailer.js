// var express=require('express');
// var nodemailer = require("nodemailer");
// var app=express();
// /*
//     Here we are configuring our SMTP Server details.
//     STMP is mail server which is responsible for sending and recieving email.
// */

// const smtp = nodemailer.createTransport("SMTP",{
//     service: "Gmail",
//     auth: {
//         user: "hcmus.hexad@gmail.com",
//         pass: "1822227"
//     }
// })
    

// exports.mailOptions = (req, res, next) => { 
//     const mailOpts = { // thiết lập đối tượng, nội dung gửi mail
//     from: 'Thanh Batmon',
//     to: 'lyhandong123@gmail.com',
//     subject: 'Test Nodemailer',
//     text: 'You recieved message from ',
//     html: '<p>You have got a new message</p>'
// }
//     return mailOpts;
// }






// module.exports = nodemailer;