const userAccountService = require('../models/service/userAccountService');
const orderService=require('../models/service/orderService');
const accountModel = require('../models/mongoose/userModel');

exports.displayAccInfo = async (req, res, next) => {
    //console.log(req.user)
    
    if(!req.user)
    {
        res.redirect('/users/login');
    }
    else
    {
    
    const accountInfo = await userAccountService.getAccInfo(req, res, next);
    const genderSelector = await userAccountService.getSelectedGender(req, res, next);

    const idUser=req.params.id;
    const listOrder = await orderService.getListOrder({idCustomer:idUser});
    console.log("AAAAAAAÂ");
    console.log(listOrder);

    res.render('account/userProfile', {accountInfo, 
        genderSelector, 
        setActiveChangePassTab: false,
        listOrder: listOrder,
        isEmpty: listOrder.length<=0,
        });
    }
   
}

exports.changeAvatar = async (req, res, next) => {
    await userAccountService.changeAvt(req, res, next);
    const url = '/my-account/' + req.params.id;

    res.redirect(url);
}

exports.displayLogin = async (req, res, next) => {
    let message = "";
    message = req.flash('error');
    //console.log("req.query.to");
    console.log(req.body);
    //console.log("message: " + message);
    if (message != "") {
        res.render('adminAccount/login', { message, notify: 'block' });
    }
    else {
        res.render('adminAccount/login', { notify: 'none' });
    }
}

exports.editInfo = async (req, res, next) => {
    await userAccountService.editInfo(req, res, next);

    const url = '/my-account/' + req.params.id;
    res.redirect(url);
}

exports.setActiveChangePasswordTab = async (req, res, next) => {
    const accountInfo = await accountModel.findOne({_id: req.params.id});
    res.render("account/userProfile", {accountInfo, setActiveChangePassTab: true});
}

exports.changePassword = async (req, res, next)=>{
    const oldPassword = await userAccountService.changePass(req, res, next);

    if (oldPassword){
        const url = '/my-account/' + req.params.id;
        res.redirect(url);
    } else {
        next();
    }
    
}