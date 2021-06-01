var express = require('express');
var router = express.Router();
var productController = require('../controllers/productController');
const loginMiddleware=require('../middleware/loginMiddleware');

//const usersController = require('../controllers/usersController');

/* GET home page. */
console.log("index.js");
router.get('/', productController.product);
router.get('/about', productController.about);
router.get('/contact', productController.contact);
router.get('/checkout',loginMiddleware.restrict, productController.checkout);
router.post('/payment', productController.payment);
//router.get('/payment', productController.payment);
router.get('/cart',productController.cart);
router.get('/cart/add',productController.addtoCart);
router.get('/cart/pop',productController.popCart);
router.get('/cart/remove',productController.removeCart);

module.exports = router;