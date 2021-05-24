var express = require('express');
var router = express.Router();
var electronicController = require('../controllers/eletronicController');
//const usersController = require('../controllers/usersController');

router.get('/search', electronicController.search);
router.get('/allmobiles/detail/:id', electronicController.detail);
router.get('/apple', electronicController.apple);
router.get('/samsung', electronicController.samsung);
router.get('/allmobiles', electronicController.brands);
module.exports = router;