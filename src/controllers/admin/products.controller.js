const productsModel = require('../../models/products.model')
const {resFalse, resTrue, pageHandler} = require('../../utils/handler')
const uploadMiddleware = require('../../middlewares/upload.middleware')
const upload = uploadMiddleware('products').single('image')
const cloudinary = require('../../utils/cloudinary')
const fsPromises = require('fs/promises')
const argon = require('argon2')
const path = require('path')

exports.getAllProducts = async (req, res) => {
    try {
        const {keyword, sort = 'id', page = 1, limit=5} = req.query
  
        const count = Number(await productsModel.countAll(keyword))
  
        const pagination = pageHandler(count,limit,page)
  
        const products = await productsModel.selectAll(keyword, sort, page, limit)
  
        if(keyword && products.length === 0){
            throw new Error(`Keyword doesn't match`)
        }
  
        return resTrue(res, 'List All Products', true, true, pagination, products)
  
    } catch (error) {
		console.log(error)
        return resFalse(error, res, error.message, 'Product')
    }
};

exports.getDetailProduct = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const product = await productsModel.selectOneDetailed(id)
        
        if(!product) {
            throw new Error(`Id is not found`)
        }
  
        return resTrue(res, 'Product Detail', false, true, null, product)
  
    } catch (error) {
		console.log(error)
        return resFalse(error, res, error.message, 'Product')
    }
};

exports.createProduct = async (req, res) => {
	upload(req, res, async(err) => {
		try {
			if(err){
				throw err
			}

			let {name, basePrice} = req.body
			
			if(!name || !basePrice){
				throw new Error('Undefined input')
			}

			if(req.file){
				req.body.image = req.file.filename
				const result = await cloudinary.uploader.upload(req.file.path, {
					folder : 'cov-shop/products'
				});
				req.body.image = result.secure_url
			}

			const product = await productsModel.insert(req.body)

			// if(req.file){
		
				// const ext = {
				// 	'image/png'	: '.png',
				// 	'image/jpg'	: '.jpg',
				// 	'image/jpeg': '.jpeg'
				// }

				// const pathDestination = path.join(global.path, 'uploads','products')
				// const fileTarget = path.join(pathDestination, req.file.filename)
				// const filename = `${product.id}_${req.body.name.split(' ').join('_')}${ext[req.file.mimetype]}`
				// const newPathDestination = path.join(pathDestination, filename)

				// await fsPromises.rename(fileTarget, newPathDestination)
				// const newProduct = await productsModel.update(product.id, {
				// 	image : filename
				// })

				// return resTrue(res,'Create Product Successfully',false, true, null, newProduct)
			// }

			return resTrue(res,'Create Product Successfully',false, true, null, product)

		} catch (error) {
			console.log(error)
			return resFalse(error, res, error.message,'Product')
		}
	})
};

exports.updateProduct = async (req, res) => {
	upload(req, res, async(err) => {
		try {
			if(err){
				throw err
			}

			const id = Number(req.params.id)

			const existProduct = await productsModel.selectOne(id)

			if(!existProduct){
				throw new Error('Id is not found')
			}

			if(req.file){
				const result = await cloudinary.uploader.upload(req.file.path, {
					folder : 'cov-shop/products'
				});
				req.body.image = result.secure_url
				// if(existProduct.image){
				// 	const currentFilePath = path.join(global.path, 'uploads','products', existProduct.image)
				// 	fsPromises.access(currentFilePath, fsPromises.constants.R_OK).then(() => {
				// 		fsPromises.rm(currentFilePath)
				// 	}).catch(() => {})
				// }
				// req.body.image = req.file.filename
			}

			let product = await productsModel.update(id, req.body)

			// if(req.file){
            //     const ext = {
			// 		'image/png'	: '.png',
			// 		'image/jpg'	: '.jpg',
			// 		'image/jpeg': '.jpeg'
			// 	}

			// 	const pathDestination = path.join(global.path, 'uploads','products')
			// 	const fileTarget = path.join(pathDestination, req.file.filename)
			// 	const filename = `${product.id}_${product.name.split(' ').join('_')}${ext[req.file.mimetype]}`
			// 	const newPathDestination = path.join(pathDestination, filename)

			// 	await fsPromises.rename(fileTarget, newPathDestination)
			// 	const newProduct = await productsModel.update(product.id, {
			// 		image : filename
			// 	});

            //     return resTrue(res, 'Update Product Successfully', false, true, null, newProduct)
			// }
            
            return resTrue(res, 'Update Product Successfully', false, true, null, product)

		} catch (error) {
			console.log(error)
			return resFalse(error, res, error.message, 'Product')
		}
	})
};

exports.deleteProduct = async (req, res) => {
    try {
        const id = Number(req.params.id)

        const existProduct = await productsModel.selectOne(id)

        if(!existProduct){
            throw new Error(`Id is not found`)
        }

        if(existProduct.image){
            const currentFilePath = path.join(global.path, 'uploads','products', existProduct.image)
            fsPromises.access(currentFilePath, fsPromises.constants.R_OK).then(() => {
                fsPromises.rm(currentFilePath)
            }).catch(() => {})
        }

        const product = await productsModel.delete(id)


        return resTrue(res,'Delete Product Successfully',false,true,null,product)

    } catch (error) {
        console.log(error)
        return resFalse(error, res, error.message,'Product')
    }
};