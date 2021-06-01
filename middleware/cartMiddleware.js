const cartService=require("../models/service/cartService");

module.exports= async function(req,res,next){
    //console.log(req.signedCookies);
    if(!req.signedCookies.cartSession){
        const idSession= await cartService.createCart();
        res.cookie('cartSession',idSession,{signed:true});
    }
    
    next();
}