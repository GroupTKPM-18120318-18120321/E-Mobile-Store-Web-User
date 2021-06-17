var express = require('express');
var router = express.Router();
var productController = require('../controllers/productController');

router.get('/filter',productController.filter)
router.get('/detail/:idProduct',productController.detail);
router.get('/detail/:idProduct/loadPageComment',productController.loadPageComment);
router.get('/detail/:idProduct/loadChildComment',productController.loadChildComment);
router.post('/detail/:idProduct',productController.postComment);
router.get('/:nameManufacturer',productController.brands);
router.get('/',productController.brands);
module.exports = router;