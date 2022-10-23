var express = require('express');
var router = express.Router();

const productsController = require('./productsController');

/* GET productlist page. */
router.get('/', productsController.list);
router.get('/:productId', productsController.showDetail);

router.post('/', productsController.addCart);
module.exports = router;
