exports.restrict= async function(req,res,next){
    //console.log(req.signedCookies);
    console.log(req.originalUrl);
    if(!req.user){
        res.redirect(`/users/login?retURL=${req.originalUrl}`);
        return;
    }
    
    next();
}