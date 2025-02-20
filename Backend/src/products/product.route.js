const express = require('express')
const router = express.Router();
const { getAllProducts, getSingleProduct } = require('./product.controller');



router.get('/',getAllProducts)

router.get('/:id',getSingleProduct);



module.exports = router;