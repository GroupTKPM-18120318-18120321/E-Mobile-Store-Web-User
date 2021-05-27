const accountService = require('../models/service/accountService');
const Account = require('../models/mongoose/accountModel');

exports.displayInfo = async(req, res, next) => {
    const foundAcc = await Account.findOne ({ id: req.params.id});
    //console.log(foundAcc);
    res.render('account/userProfile', {foundAcc, isLogin: true});
    
};

exports.changeCustomerAvt = async(req, res, next) => {
    await accountService.changeAvt(req, res, next);
    res.redirect('/users/edit');
    //const foundAcc = await Account.findOne ({ name: "abc", password: "12345" });
    //console.log("Đã cập nhật ảnh");
    //res.redirect('/account/edit');
};