const productTagsModel = require('../../models/productTags.model')
const productsModel = require('../../models/products.model')
const tagsModel = require('../../models/tags.model')
const { resFalse, resTrue, pageHandler } = require('../../utils/handler')

exports.getAllProductTags = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query

    const count = Number(await productTagsModel.countAll())

    const pagination = pageHandler(count, limit, page)

    const productTags = await productTagsModel.selectAll(page, limit)

    return resTrue(res, 'List All Product Tags', true, true, pagination, productTags)
  } catch (error) {
    console.log(error)
    return resFalse(error, res, error.message, 'Product Tags')
  }
}

exports.getDetailProductTag = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const productTag = await productTagsModel.selectOne(id)

    if (!productTag) {
      throw new Error('Id is not found')
    }

    return resTrue(res, 'Product Tag Detail', false, true, null, productTag)
  } catch (error) {
    console.log(error)
    return resFalse(error, res, error.message, 'Product Tag')
  }
}

exports.createProductTag = async (req, res) => {
  try {
    const { productId, tagId } = req.body

    if (!productId || !tagId) {
      throw new Error('Undefined input')
    }

    const existProductTag = await productTagsModel.selectOneByProductIdAndTagId(productId, tagId)
    const product = await productsModel.selectOne(productId)
    const tag = await tagsModel.selectOne(tagId)

    if (existProductTag) {
      throw new Error('Already exists')
    }

    if (!product) {
      throw new Error('Product Id is not found')
    }

    if (!tag) {
      throw new Error('Tag Id is not found')
    }

    const productTag = await productTagsModel.insert(req.body)

    return resTrue(res, 'Create New Product Tag Successfully', false, true, null, productTag)
  } catch (error) {
    console.log(error)
    if (error.message === 'Product Id is not found') {
      return resFalse(error, res, error.message.slice(8), 'Product')
    }
    if (error.message === 'Tag Id is not found') {
      return resFalse(error, res, error.message.slice(4), 'Tag')
    }
    return resFalse(error, res, error.message, 'Product Tag')
  }
}

exports.updateProductTag = async (req, res) => {
  try {
    const id = Number(req.params.id)

    const existProductTag = await productTagsModel.selectOne(id)
    const existProductTagSec = await productTagsModel.selectOneByProductIdAndTagId(req.body.productId, req.body.tagId)
    const product = await productsModel.selectOne(req.body.productId)
    const tag = await tagsModel.selectOne(req.body.tagId)

    if (!existProductTag) {
      throw new Error('Id is not found')
    }

    if (!req.body.productId || !req.body.tagId) {
      throw new Error('Undefined input')
    }

    if (!product) {
      throw new Error('Product Id is not found')
    }

    if (!tag) {
      throw new Error('Tag Id is not found')
    }

    if (existProductTagSec) {
      throw new Error('Already exists')
    }

    const productTag = await productTagsModel.update(id, req.body)

    return resTrue(res, 'Update Product Tag Successfully', false, true, null, productTag)
  } catch (error) {
    console.log(error)
    if (error.message === 'Product Id is not found') {
      return resFalse(error, res, error.message.slice(8), 'Product')
    }
    if (error.message === 'Tag Id is not found') {
      return resFalse(error, res, error.message.slice(4), 'Tag')
    }
    return resFalse(error, res, error.message, 'Product Tag')
  }
}

exports.deleteProductTag = async (req, res) => {
  try {
    const id = Number(req.params.id)

    const existProductTag = await productTagsModel.selectOne(id)

    if (!existProductTag) {
      throw new Error('Id is not found')
    }

    const productTag = await productTagsModel.delete(id)

    return resTrue(res, 'Delete Product Tag Successfully', false, true, null, productTag)
  } catch (error) {
    console.log(error)
    return resFalse(error, res, error.message, 'Product Tag')
  }
}
