const promosModel = require('../../models/promos.model')
const { resFalse, resTrue, pageHandler } = require('../../utils/handler')

exports.getAllPromos = async (req, res) => {
  try {
    const { keyword, page = 1, limit = 5 } = req.query

    const count = Number(await promosModel.countAll(keyword))

    const pagination = pageHandler(count, limit, page)

    const promos = await promosModel.selectAll(keyword, page, limit)

    if (keyword && promos.length === 0) {
      throw new Error('Keyword doesn\'t match')
    }

    return resTrue(res, 'List All Promos', true, true, pagination, promos)
  } catch (error) {
    console.log(error)
    return resFalse(error, res, error.message, 'Promo')
  }
}

exports.getDetailPromo = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const promo = await promosModel.selectOne(id)

    if (!promo) {
      throw new Error('Id is not found')
    }

    return resTrue(res, 'Promo Detail', false, true, null, promo)
  } catch (error) {
    console.log(error)
    return resFalse(error, res, error.message, 'Promo')
  }
}

exports.createPromo = async (req, res) => {
  try {
    const { name, code, description, percentage, maxPromo, minPurchase, isExpired } = req.body

    if (!name ||
            !code ||
            !description ||
            !percentage ||
            !maxPromo ||
            !minPurchase ||
            !isExpired ||
            req.body.name === undefined ||
            req.body.code === undefined ||
            req.body.description === undefined ||
            req.body.percentage === undefined ||
            req.body.maxPromo === undefined ||
            req.body.minPurchase === undefined ||
            req.body.isExpired === undefined) {
      throw new Error('Undefined input')
    }

    const promo = await promosModel.insert(req.body)

    return resTrue(res, 'Create New Promo Successfully', false, true, null, promo)
  } catch (error) {
    console.log(error)
    return resFalse(error, res, error.message, 'Promo')
  }
}

exports.updatePromo = async (req, res) => {
  try {
    const id = Number(req.params.id)

    const existPromo = await promosModel.selectOne(id)

    if (!existPromo) {
      throw new Error('Id is not found')
    }

    if (!req.body.name &&
            !req.body.code &&
            !req.body.description &&
            !req.body.percentage &&
            !req.body.maxPromo &&
            !req.body.minPurchase &&
            !req.body.isExpired) {
      throw new Error('Undefined input')
    }

    if (req.body.name === existPromo.name || req.body.code === existPromo.code) {
      throw new Error('Duplicate,name,code')
    }

    const promo = await promosModel.update(id, req.body)

    return resTrue(res, 'Update Promo Successfully', false, true, null, promo)
  } catch (error) {
    console.log(error)
    return resFalse(error, res, error.message, 'Promo')
  }
}

exports.deletePromo = async (req, res) => {
  try {
    const id = Number(req.params.id)

    const existPromo = await promosModel.selectOne(id)

    if (!existPromo) {
      throw new Error('Id is not found')
    }

    const promo = await promosModel.delete(id)

    return resTrue(res, 'Delete Promo Successfully', false, true, null, promo)
  } catch (error) {
    console.log(error)
    return resFalse(error, res, error.message, 'Promo')
  }
}
