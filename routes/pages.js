var express = require('express');
var router = express.Router();
var electronicController = require('../controllers/eletronicController');
//const usersController = require('../controllers/usersController');


router.get('/checkout', electronicController.checkout);
router.get('/payment', electronicController.payment);

module.exports = router;