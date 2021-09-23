const express = require ('express')
const productController = require('../controllers/product.controller')

const router = express.Router()

router.get('/', productController.getUsers)
router.post('/', productController.createUser)
router.delete('/:userId', productController.deleteUser)
router.patch('/:userId', productController.updateUser)

export default router