//const userModel = require('../models/mongoose/userModel');
const userService = require('../models/service/userService');
const allmobilesModel = require('../models/mongoose/productModel');
const passport = require('../passport/passport');



exports.displayFormRegister = (req, res, next) => {
    res.render("account/userRegister", { register: false });
}


exports.displayFormLogin = (req, res, next) => {
    let message = "";
    message = req.flash('error');
    console.log("req.query.to");
    console.log(req.body);
    req.session
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
            username: req.body.username,
            password: req.body.Password,
            isFailUser: check.isFailUser,
            isFailEmail: check.isFailEmail,
            notExistEmail: check.valid
        });
    }
    else
    {
        await userService.saveTemporaryAccount(req, res, next);

        res.redirect("/mail/send");
    }
}

exports.login=(req, res, next) =>{
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.render("account/userLogin", { message: info.message, notify: 'block' }); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }

        let url = req.query.retURL;
        if(!url)
        {
            url="/";
        }
          
    
        return res.redirect(url);
        // if(user.role == "5fe9b7b8ea0d1f18102eed2f")
        // {
        //     return res.redirect('/');
        // }
        // else
        // {
        //     return res.redirect('https://www.facebook.com/');
        // }
      });
    })(req, res, next);
  }
