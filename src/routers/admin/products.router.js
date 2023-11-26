const productRouter = require('express').Router()


const productController = require('../../controllers/admin/products.controller')

const uploadMiddleware = require('../../middlewares/upload.middleware')

productRouter.get('/',productController.getAllProducts);
productRouter.get('/:id', productController.getDetailProduct)
productRouter.post('/',uploadMiddleware('products').single('image'),productController.createProduct);
productRouter.patch('/:id',uploadMiddleware('products').single('image'),productController.updateProduct);
productRouter.delete('/:id',productController.deleteProduct);

module.exports = productRouter