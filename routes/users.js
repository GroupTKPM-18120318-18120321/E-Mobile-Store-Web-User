const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const accountController = require('../controllers/accountController');
const passport = require('../passport/passport');



router.get('/register', userController.displayFormRegister);
router.post('/register', userController.checkUserInDatabase);


// router.post('/login', function(req, res, next) {
//     passport.authenticate('local', function(err, user, info) {
//       if (err) { return next(err); }
//       if (!user) { return res.redirect('/login'); }
//       req.logIn(user, function(err) {
//         if (err) { return next(err); }
//         if(user.role == "5fe9b7b8ea0d1f18102eed2f")
//         {
//             return res.redirect('/');
//         }
//         else
//         {
//             return res.redirect('https://www.facebook.com/');
//         }
//       });
//     })(req, res, next);
//   }
// );

router.post('/login',passport.authenticate('local', { successRedirect: '/',
failureRedirect: '/users/login',
failureFlash: true })
);
router.get('/login', userController.displayFormLogin);




router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});


// router.get('/register', userController.alert1)



/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/edit', accountController.displayInfo);

router.get('/edit/:id', accountController.displayInfo);

router.put('/edit/:id', accountController.changeCustomerAvt);










module.exports = router;
