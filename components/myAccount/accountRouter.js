const express = require('express');
var router = express.Router();

const accountController = require('./accountController');

router.get('/', accountController.showAccountLayout);
router.post('/', accountController.changeAccountInfo);
module.exports = router;