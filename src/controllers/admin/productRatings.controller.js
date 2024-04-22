const productRatingsModel = require('../../models/productRatings.model')
const productsModel = require('../../models/products.model')
const { resFalse, resTrue, pageHandler } = require('../../utils/handler')

exports.getAllProductRatings = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query

    const count = Number(await productRatingsModel.countAll())

    const pagination = pageHandler(count, limit, page)

    const productRatings = await productRatingsModel.selectAll(page, limit)

    return resTrue(res, 'List All Product Ratings', true, true, pagination, productRatings)
  } catch (error) {
    console.log(error)
    return resFalse(error, res, error.message, 'Product Ratings')
  }
}

exports.getDetailProductRating = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const productRating = await productRatingsModel.selectOne(id)

    if (!productRating) {
      throw new Error('Id is not found')
    }

    return resTrue(res, 'Product Rating Detail', false, true, null, productRating)
  } catch (error) {
    console.log(error)
    return resFalse(error, res, error.message, 'Product Rating')
  }
}

exports.createProductRating = async (req, res) => {
  try {
    const { productId, rate } = req.body

    if (!productId || !rate) {
      throw new Error('Undefined input')
    }

    const product = await productsModel.selectOne(productId)

    if (!product) {
      throw new Error('Product Id is not found')
    }

    const productRating = await productRatingsModel.insert(req.body)

    return resTrue(res, 'Create New Product Rating Successfully', false, true, null, productRating)
  } catch (error) {
    console.log(error)
    if (error.message === 'Product Id is not found') {
      return resFalse(error, res, error.message.slice(8), 'Product')
    }
    return resFalse(error, res, error.message, 'Product Rating')
  }
}

exports.updateProductRating = async (req, res) => {
  try {
    const id = Number(req.params.id)

    const existProductRating = await productRatingsModel.selectOne(id)

    const product = await productsModel.selectOne(req.body.productId)

    if (!existProductRating) {
      throw new Error('Id is not found')
    }

    if (!req.body.productId || !req.body.rate) {
      throw new Error('Undefined input')
    }

    if (!product) {
      throw new Error('Product Id is not found')
    }

    const productRating = await productRatingsModel.update(id, req.body)

    return resTrue(res, 'Update Product Rating Successfully', false, true, null, productRating)
  } catch (error) {
    console.log(error)
    if (error.message === 'Product Id is not found') {
      return resFalse(error, res, error.message.slice(8), 'Product')
    }
    return resFalse(error, res, error.message, 'Product Rating')
  }
}

exports.deleteProductRating = async (req, res) => {
  try {
    const id = Number(req.params.id)

    const existProductRating = await productRatingsModel.selectOne(id)

    if (!existProductRating) {
      throw new Error('Id is not found')
    }

    const productRating = await productRatingsModel.delete(id)

    return resTrue(res, 'Delete Product Rating Successfully', false, true, null, productRating)
  } catch (error) {
    console.log(error)
    return resFalse(error, res, error.message, 'Product Rating')
  }
}
