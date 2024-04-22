const variantsModel = require('../../models/variants.model')
const { resFalse, resTrue, pageHandler } = require('../../utils/handler')

exports.getAllVariants = async (req, res) => {
  try {
    const { keyword, page = 1, limit = 5 } = req.query

    const count = Number(await variantsModel.countAll(keyword))

    const pagination = pageHandler(count, limit, page)

    const variants = await variantsModel.selectAll(keyword, page, limit)

    if (keyword && variants.length === 0) {
      throw new Error('Keyword doesn\'t match')
    }

    return resTrue(res, 'List All Variants', true, true, pagination, variants)
  } catch (error) {
    console.log(error)
    return resFalse(error, res, error.message, 'Variant')
  }
}

exports.getDetailVariant = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const variant = await variantsModel.selectOne(id)

    if (!variant) {
      throw new Error('Id is not found')
    }

    return resTrue(res, 'Variant Detail', false, true, null, variant)
  } catch (error) {
    console.log(error)
    return resFalse(error, res, error.message, 'Variant')
  }
}

exports.createVariant = async (req, res) => {
  try {
    const { name, additionalPrice } = req.body

    if (!name || !additionalPrice || req.body.name === undefined || req.body.additionalPrice === undefined) {
      throw new Error('Undefined input')
    }

    const variant = await variantsModel.insert(req.body)

    return resTrue(res, 'Create New Variant Successfully', false, true, null, variant)
  } catch (error) {
    console.log(error)
    return resFalse(error, res, error.message, 'Variant')
  }
}

exports.updateVariant = async (req, res) => {
  try {
    const id = Number(req.params.id)

    const existVariant = await variantsModel.selectOne(id)

    if (!existVariant) {
      throw new Error('Id is not found')
    }

    if (!req.body.name && !req.body.additionalPrice) {
      throw new Error('Undefined input')
    }

    if (req.body.name === existVariant.name) {
      throw new Error('Duplicate,name')
    }

    const variant = await variantsModel.update(id, req.body)

    return resTrue(res, 'Update Variant Successfully', false, true, null, variant)
  } catch (error) {
    console.log(error)
    return resFalse(error, res, error.message, 'Variant')
  }
}

exports.deleteVariant = async (req, res) => {
  try {
    const id = Number(req.params.id)

    const existVariant = await variantsModel.selectOne(id)

    if (!existVariant) {
      throw new Error('Id is not found')
    }

    const variant = await variantsModel.delete(id)

    return resTrue(res, 'Delete Variant Successfully', false, true, null, variant)
  } catch (error) {
    console.log(error)
    resFalse(error, res, error.message, 'Variant')
  }
}
