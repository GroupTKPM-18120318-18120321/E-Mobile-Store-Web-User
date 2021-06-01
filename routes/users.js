const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const accountController = require('../controllers/accountController');
const loginMiddleware=require('../middleware/loginMiddleware');
// const passport = require('../passport/passport');



router.get('/register', userController.displayFormRegister);
router.post('/register', userController.checkUserInDatabase);


router.post('/login', userController.login);

// router.post('/login',passport.authenticate('local', { successRedirect: '/',
// failureRedirect: '/users/login',
// failureFlash: true })
// );
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

router.get('/edit',loginMiddleware.restrict, accountController.displayInfo);

router.get('/edit/:id',loginMiddleware.restrict, accountController.displayInfo);

router.put('/edit/:id',loginMiddleware.restrict, accountController.changeCustomerAvt);










module.exports = router;
