const express = require('express');
var router = express.Router();

const changePasswordController = require('./changePasswordController');

router.get('/', changePasswordController.showchangePasswordLayout);
router.post('/', changePasswordController.resetPassword);
module.exports = router;