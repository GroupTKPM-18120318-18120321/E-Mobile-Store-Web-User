const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const loginMiddleware=require('../middleware/loginMiddleware');

//
router.get('/checkout',loginMiddleware.restrict, paymentController.checkout);
router.post('/payment', paymentController.payment);
//router.get('/payment', paymentController.payment);
router.get('/cart',paymentController.cart);
router.get('/cart/add',paymentController.addtoCart);
router.get('/cart/pop',paymentController.popCart);
router.get('/cart/remove',paymentController.removeCart);

module.exports = router;