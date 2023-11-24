const productRouter = require('express').Router()

const multer = require('multer')

const productController = require('../../controllers/admin/products.controller')

const upload = multer({dest: 'uploads/'})

productRouter.get('/',productController.getAllProducts);
productRouter.get('/:id', productController.getDetailProduct)
productRouter.post('/',productController.createProduct);
productRouter.patch('/:id',upload.single('image'),productController.updateProduct);
productRouter.delete('/:id',productController.deleteProduct);

module.exports = productRouter