const productSizesModel = require('../../models/productSizes.model')
const productsModel = require('../../models/products.model')
const sizesModel = require('../../models/sizes.model')
const { resFalse, resTrue, pageHandler } = require('../../utils/handler')

exports.getAllProductSizes = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query

    const count = Number(await productSizesModel.countAll())

    const pagination = pageHandler(count, limit, page)

    const productSizes = await productSizesModel.selectAll(page, limit)

    return resTrue(res, 'List All Product Sizes', true, true, pagination, productSizes)
  } catch (error) {
    console.log(error)
    return resFalse(error, res, error.message, 'Product Sizes')
  }
}

exports.getDetailProductSize = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const productSize = await productSizesModel.selectOne(id)

    if (!productSize) {
      throw new Error('Id is not found')
    }

    return resTrue(res, 'Product Size Detail', false, true, null, productSize)
  } catch (error) {
    console.log(error)
    return resFalse(error, res, error.message, 'Product Size')
  }
}

exports.createProductSize = async (req, res) => {
  try {
    const { productId, sizeId } = req.body

    if (!productId || !sizeId) {
      throw new Error('Undefined input')
    }

    const existProductSize = await productSizesModel.selectOneByProductIdAndSizeId(productId, sizeId)
    const product = await productsModel.selectOne(productId)
    const size = await sizesModel.selectOne(sizeId)

    if (existProductSize) {
      throw new Error('Already exists')
    }

    if (!product) {
      throw new Error('Product Id is not found')
    }

    if (!size) {
      throw new Error('Size Id is not found')
    }

    const productSize = await productSizesModel.insert(req.body)

    return resTrue(res, 'Create New Product Size Successfully', false, true, null, productSize)
  } catch (error) {
    console.log(error)
    if (error.message === 'Product Id is not found') {
      return resFalse(error, res, error.message.slice(8), 'Product')
    }
    if (error.message === 'Size Id is not found') {
      return resFalse(error, res, error.message.slice(5), 'Size')
    }
    return resFalse(error, res, error.message, 'Product Size')
  }
}

exports.updateProductSize = async (req, res) => {
  try {
    const id = Number(req.params.id)

    const existProductSize = await productSizesModel.selectOne(id)
    const existProductSizeSec = await productSizesModel.selectOneByProductIdAndSizeId(req.body.productId, req.body.sizeId)
    const product = await productsModel.selectOne(req.body.productId)
    const size = await sizesModel.selectOne(req.body.sizeId)

    if (!existProductSize) {
      throw new Error('Id is not found')
    }

    if (!req.body.productId || !req.body.sizeId) {
      throw new Error('Undefined input')
    }

    if (!product) {
      throw new Error('Product Id is not found')
    }

    if (!size) {
      throw new Error('Size Id is not found')
    }

    if (existProductSizeSec) {
      throw new Error('Already exists')
    }

    const productSize = await productSizesModel.update(id, req.body)

    return resTrue(res, 'Update Product Size Successfully', false, true, null, productSize)
  } catch (error) {
    console.log(error)
    if (error.message === 'Product Id is not found') {
      return resFalse(error, res, error.message.slice(8), 'Product')
    }
    if (error.message === 'Size Id is not found') {
      return resFalse(error, res, error.message.slice(5), 'Size')
    }
    return resFalse(error, res, error.message, 'Product Size')
  }
}

exports.deleteProductSize = async (req, res) => {
  try {
    const id = Number(req.params.id)

    const existProductSize = await productSizesModel.selectOne(id)

    if (!existProductSize) {
      throw new Error('Id is not found')
    }

    const productSize = await productSizesModel.delete(id)

    return resTrue(res, 'Delete Product Size Successfully', false, true, null, productSize)
  } catch (error) {
    console.log(error)
    return resFalse(error, res, error.message, 'Product Size')
  }
}
