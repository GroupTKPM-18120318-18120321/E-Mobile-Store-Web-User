var express = require('express');
var router = express.Router();
var productController = require('../controllers/productController');
//const usersController = require('../controllers/usersController');


router.get('/checkout', productController.checkout);
router.get('/payment', productController.payment);

module.exports = router;