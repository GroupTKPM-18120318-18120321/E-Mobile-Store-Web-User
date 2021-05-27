var express = require('express');
var router = express.Router();
var productController = require('../controllers/productController');

//const usersController = require('../controllers/usersController');

/* GET home page. */
console.log("index.js");
router.get('/', productController.product);
router.get('/about', productController.about);
router.get('/contact', productController.contact);



module.exports = router;