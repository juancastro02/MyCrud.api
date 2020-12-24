const express = require('express')
const router = express.Router()
const Controller = require('../controllers/productController')

// create a product
router.post('/', Controller.createProduct)

// get all products
router.get('/', Controller.getProducts)

// get data of one product
router.get('/:id', Controller.getProduct)

// update data of a product
router.put('/:id', Controller.updateProduct)

// delete a product
router.delete('/:id', Controller.deleteProduct)

module.exports = router