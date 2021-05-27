var express = require('express');
var router = express.Router();
const passport = require('../passport/passport');



router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));


router.get('/google/callback',
passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/users/login'
}))


module.exports = router;