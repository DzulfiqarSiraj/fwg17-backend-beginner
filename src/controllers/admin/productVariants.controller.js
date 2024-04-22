const productVariantsModel = require('../../models/productVariants.model')
const productsModel = require('../../models/products.model')
const variantsModel = require('../../models/variants.model')
const { resFalse, resTrue, pageHandler } = require('../../utils/handler')

exports.getAllProductVariants = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query

    const count = Number(await productVariantsModel.countAll())

    const pagination = pageHandler(count, limit, page)

    const productVariants = await productVariantsModel.selectAll(page, limit)

    return resTrue(res, 'List All Product Variants', true, true, pagination, productVariants)
  } catch (error) {
    console.log(error)
    return resFalse(error, res, error.message, 'Product Variants')
  }
}

exports.getDetailProductVariant = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const productVariant = await productVariantsModel.selectOne(id)

    if (!productVariant) {
      throw new Error('Id is not found')
    }

    return resTrue(res, 'Product Variant Detail', false, true, null, productVariant)
  } catch (error) {
    console.log(error)
    return resFalse(error, res, error.message, 'Product Variant')
  }
}

exports.createProductVariant = async (req, res) => {
  try {
    const { productId, variantId } = req.body

    if (!productId || !variantId) {
      throw new Error('Undefined input')
    }

    const existProductVariant = await productVariantsModel.selectOneByProductIdAndVariantId(productId, variantId)
    const product = await productsModel.selectOne(productId)
    const variant = await variantsModel.selectOne(variantId)

    if (existProductVariant) {
      throw new Error('Already exists')
    }

    if (!product) {
      throw new Error('Product Id is not found')
    }

    if (!variant) {
      throw new Error('Variant Id is not found')
    }

    const productVariant = await productVariantsModel.insert(req.body)

    return resTrue(res, 'Create New Product Variant Successfully', false, true, null, productVariant)
  } catch (error) {
    console.log(error)
    if (error.message === 'Product Id is not found') {
      return resFalse(error, res, error.message.slice(8), 'Product')
    }
    if (error.message === 'Variant Id is not found') {
      return resFalse(error, res, error.message.slice(8), 'Variant')
    }
    return resFalse(error, res, error.message, 'Product Variant')
  }
}

exports.updateProductVariant = async (req, res) => {
  try {
    const id = Number(req.params.id)

    const existProductVariant = await productVariantsModel.selectOne(id)
    const existProductVariantSec = await productVariantsModel.selectOneByProductIdAndVariantId(req.body.productId, req.body.variantId)
    const product = await productsModel.selectOne(req.body.productId)
    const variant = await variantsModel.selectOne(req.body.variantId)

    if (!existProductVariant) {
      throw new Error('Id is not found')
    }

    if (!req.body.productId || !req.body.variantId) {
      throw new Error('Undefined input')
    }

    if (!product) {
      throw new Error('Product Id is not found')
    }

    if (!variant) {
      throw new Error('Variant Id is not found')
    }

    if (existProductVariantSec) {
      throw new Error('Already exists')
    }

    const productVariant = await productVariantsModel.update(id, req.body)

    return resTrue(res, 'Update Product Variant Successfully', false, true, null, productVariant)
  } catch (error) {
    console.log(error)
    if (error.message === 'Product Id is not found') {
      return resFalse(error, res, error.message.slice(8), 'Product')
    }
    if (error.message === 'Variant Id is not found') {
      return resFalse(error, res, error.message.slice(8), 'Variant')
    }
    return resFalse(error, res, error.message, 'Product Variant')
  }
}

exports.deleteProductVariant = async (req, res) => {
  try {
    const id = Number(req.params.id)

    const existProductVariant = await productVariantsModel.selectOne(id)

    if (!existProductVariant) {
      throw new Error('Id is not found')
    }

    const productVariant = await productVariantsModel.delete(id)

    return resTrue(res, 'Delete Product Variant Successfully', false, true, null, productVariant)
  } catch (error) {
    console.log(error)
    return resFalse(error, res, error.message, 'Product Variant')
  }
}
