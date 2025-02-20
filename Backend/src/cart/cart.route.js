const express = require('express');
const { getCart, deleteCartItem, addToCart, clearCart} = require('./cartController')
const router = express.Router();

router.get('/:email', getCart)
router.post('/', addToCart)
router.delete('/', clearCart)
router.delete('/:id', deleteCartItem)

module.exports = router;