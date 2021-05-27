const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");

const userService = require('../models/service/userService');

const saltRounds = 10;
let count;
let email;

exports.sendmail = async (req, res, next) => {
    const account = userService.getTemporaryAccount(req, res, next);
    const OTP = await new Promise((resolve, reject) => {
        bcrypt.hash(account.name, saltRounds, function (err, hash) {
            if (err) reject(err)
            resolve(hash)
        });
    })
    console.log("sendmail");
    console.log(account);
    const smtpTransport = nodemailer.createTransport('smtps://hcmus.hexad%40gmail.com:18212227@smtp.gmail.com');
    const mail = {
        from: "From@gmail.com",
        to: account.email,
        subject: "MÃ XÁC NHẬN",
        html: "<b>Mã xác nhận của bạn là: </b>" + OTP
    }

    smtpTransport.sendMail(mail, function (error, response) {
        if (error) {
            console.log(error);
            res.redirect("/users/register");
        } else {
            //console.log("Message sent: " + response.message);
            count = 3;
            res.redirect("/mail/verify");
        }
        smtpTransport.close();
    });
};

exports.displayFormAuth = async (req, res, next) => {
    res.render("account/verify", { count });
}

exports.checkFormAuth = async (req, res, next) => {

    let account = userService.getTemporaryAccount(req, res, next);
    console.log(account);
    if (account === "abc") {
        account = await userService.findOne("email", email);
        console.log("CHECK FORM AUTH");
        console.log(account);
        let checkOTP = await bcrypt.compare(account.name, req.body.maxacnhan);
        if (count === 1) {
            res.redirect("/mail/forgetpass");
        }
        if (checkOTP) {
            res.redirect("/mail/changepassword");
        }
        else {
            count = count - 1;
            res.render("account/verify", { count });
        }
    }
    else {
        let checkOTP = await bcrypt.compare(account.name, req.body.maxacnhan);
        if (count === 1) {
            res.redirect("/users/register");
        }
        if (checkOTP) {
            await userService.addNewUser(account);
            res.redirect("/users/login");
        }
        else {
            count = count - 1;
            res.render("account/verify", { count });
        }
    }
}


exports.displayFormInputEmail = async (req, res, next) => {
    res.render("account/forgetPassword")
}

exports.checkEmail = async (req, res, next) => {

    const account = await userService.findOne("email", req.body.Email);
    email = req.body.Email;
    console.log(account);
    if (account != null) {
        const OTP = await new Promise((resolve, reject) => {
            bcrypt.hash(account.name, saltRounds, function (err, hash) {
                if (err) reject(err)
                resolve(hash)
            });
        })
        console.log("sendmail");
        console.log(account);
        const smtpTransport = nodemailer.createTransport('smtps://hcmus.hexad%40gmail.com:18212227@smtp.gmail.com');
        const mail = {
            from: "From@gmail.com",
            to: account.email,
            subject: "MÃ XÁC NHẬN",
            html: "<b>Mã xác nhận của bạn là: </b>" + OTP
        }

        smtpTransport.sendMail(mail, function (error, response) {
            if (error) {
                console.log(error);
                res.redirect("/mail/forgetpass");
            } else {
                //console.log("Message sent: " + response.message);
                count = 3;
                res.redirect("/mail/verify");
            }
            smtpTransport.close();
        });
    }
}


exports.displayFormChangePassword = async (req, res, next) => {
    res.render("account/formChangePassword");
}

exports.changePassword = async (req, res, next) => {
    const pass = await new Promise((resolve, reject) => {
        bcrypt.hash(req.body.Password, saltRounds, function (err, hash) {
            if (err) reject(err)
            resolve(hash)
        });
    })
    const update = {
        password: pass,
        name: req.body.Name
    }
    await userService.UpdatePassword("email",email,update);

    res.redirect("/users/login");

}