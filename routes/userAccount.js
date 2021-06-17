var express = require('express');
var router = express.Router();
const userAccountController = require('../controllers/userAccountController');

//Get
router.get('/:id', userAccountController.displayAccInfo);

router.put('/:id', userAccountController.changeAvatar);

router.put('/edit/:id', userAccountController.editInfo);

router.put('/edit/change-password/:id', userAccountController.changePassword, userAccountController.setActiveChangePasswordTab);

module.exports = router;