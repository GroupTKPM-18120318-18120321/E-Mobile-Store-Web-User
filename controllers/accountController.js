const accountService = require('../models/service/accountService');
const orderService=require('../models/service/orderService');
const Account = require('../models/mongoose/userModel');

exports.displayInfo = async(req, res, next) => {
    const foundAcc = await Account.findOne ({ id: req.params.id});
    const idUser=req.params.id;
    const listOrder = await orderService.getListOrder({_id:idUser});
    console.log("AAAAAAAÂ");
    console.log(listOrder);

    if(req.user)
    {
        res.render('account/userProfile', {foundAcc, 
                                        listOrder: listOrder,
                                        isEmpty: listOrder.length<=0, 
                                        isLogin: true});
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