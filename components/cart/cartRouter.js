var express = require('express');
var router = express.Router();
const cartController = require('./cartController');

router.get('/', cartController.list)
router.post('/',cartController.remove)
router.post('/remove',cartController.removeAll);
module.exports = router;