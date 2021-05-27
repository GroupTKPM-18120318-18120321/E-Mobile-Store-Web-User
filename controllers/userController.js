//const userModel = require('../models/mongoose/userModel');
const userService = require('../models/service/userService');
const allmobilesModel = require('../models/mongoose/productModel');


exports.displayFormRegister = (req, res, next) => {

    res.render("account/userRegister", { register: false });
}


exports.displayFormLogin = (req, res, next) => {
    let message = "";
    message = req.flash('error');
    console.log("req.query.to");
    console.log(req.body);
    if (message != "") {
        res.render("account/userLogin", { message, notify: 'block' });
    }
    else {
        res.render("account/userLogin", { notify: 'none' });
    }

}

exports.checkUserInDatabase = async (req, res, next) => {
    console.log("USER CONTROLLER")

    console.log("req.query.to");
    console.log(req.body);


    //notify1 = await userService.addNewUser(req, res, next);
    //res.redirect("/")
    const check = await userService.checkUserRegister(req, res, next);



    console.log('registered');
    console.log(check.isFail);

    if (check.isFailUser == true || check.isFailEmail == true || check.valid == false) {
        if (check.valid == false) {
            check.valid = true;
        }
        else {
            check.valid = false;
        }
        res.render("account/userRegister", {
            name: req.body.Name,
            email: req.body.Email,
            password: req.body.Password,
            isFailUser: check.isFailUser,
            isFailEmail: check.isFailEmail,
            notExistEmail: check.valid
        });
    }

    //res.redirect("/users/login");
    await userService.saveTemporaryAccount(req, res, next);

    res.redirect("/mail/send");

}