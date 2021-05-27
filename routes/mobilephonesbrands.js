var express = require('express');
var router = express.Router();
var productController = require('../controllers/productController');
//const usersController = require('../controllers/usersController');

router.get('/search', productController.search);
router.get('/allmobiles/detail/:id', productController.detail);
router.get('/apple', productController.apple);
router.get('/samsung', productController.samsung);
router.get('/allmobiles', productController.brands);
module.exports = router;