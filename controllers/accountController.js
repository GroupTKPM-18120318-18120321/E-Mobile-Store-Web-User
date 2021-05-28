const accountService = require('../models/service/accountService');
const Account = require('../models/mongoose/userModel');

exports.displayInfo = async(req, res, next) => {
    const foundAcc = await Account.findOne ({ id: req.params.id});
 
    if(req.user)
    {
        res.render('account/userProfile', {foundAcc, isLogin: true});
    }
    else
    {
        res.redirect('/');
    }
    
};

exports.changeCustomerAvt = async(req, res, next) => {
    await accountService.changeAvt(req, res, next);
    res.redirect('/users/edit');
    //const foundAcc = await Account.findOne ({ name: "abc", password: "12345" });
    //console.log("Đã cập nhật ảnh");
    //res.redirect('/account/edit');
};