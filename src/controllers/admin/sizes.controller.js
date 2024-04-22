const sizesModel = require('../../models/sizes.model')
const { resFalse, resTrue, pageHandler } = require('../../utils/handler')

exports.getAllSizes = async (req, res) => {
  try {
    const { keyword, page = 1, limit = 5 } = req.query

    const count = Number(await sizesModel.countAll(keyword))

    const pagination = pageHandler(count, limit, page)

    const sizes = await sizesModel.selectAll(keyword, page, limit)

    if (keyword && sizes.length === 0) {
      throw new Error('Keyword doesn\'t match')
    }

    return resTrue(res, 'List All Sizes', true, true, pagination, sizes)
  } catch (error) {
    console.log(error)
    return resFalse(error, res, error.message, 'Size')
  }
}

exports.getDetailSize = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const size = await sizesModel.selectOne(id)

    if (!size) {
      throw new Error('Id is not found')
    }

    return resTrue(res, 'Size Detail', false, true, null, size)
  } catch (error) {
    console.log(error)
    return resFalse(error, res, error.message, 'Size')
  }
}

exports.createSize = async (req, res) => {
  try {
    const { name, additionalPrice } = req.body

    if (!name || !additionalPrice || req.body.name === undefined || req.body.additionalPrice === undefined) {
      throw new Error('Undefined input')
    }

    const size = await sizesModel.insert(req.body)

    return resTrue(res, 'Create New Size Successfully', false, true, null, size)
  } catch (error) {
    console.log(error)
    return resFalse(error, res, error.message, 'Size')
  }
}

exports.updateSize = async (req, res) => {
  try {
    const id = Number(req.params.id)

    const existSize = await sizesModel.selectOne(id)

    if (!existSize) {
      throw new Error('Id is not found')
    }

    if (!req.body.name && !req.body.additionalPrice) {
      throw new Error('Undefined input')
    }

    if (req.body.name === existSize.name) {
      throw new Error('Duplicate,name')
    }

    const size = await sizesModel.update(id, req.body)

    return resTrue(res, 'Update Size Successfully', false, true, null, size)
  } catch (error) {
    console.log(error)
    return resFalse(error, res, error.message, 'Size')
  }
}

exports.deleteSize = async (req, res) => {
  try {
    const id = Number(req.params.id)

    const existSize = await sizesModel.selectOne(id)

    if (!existSize) {
      throw new Error('Id is not found')
    }

    const size = await sizesModel.delete(id)

    return resTrue(res, 'Delete Size Successfully', false, true, null, size)
  } catch (error) {
    console.log(error)
    return resFalse(error, res, error.message, 'Size')
  }
}
