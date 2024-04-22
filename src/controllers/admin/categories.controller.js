const categoriesModel = require('../../models/categories.model')
const { resFalse, resTrue, pageHandler } = require('../../utils/handler')

exports.getAllCategories = async (req, res) => {
  try {
    const { keyword, page = 1, limit = 5 } = req.query

    const count = Number(await categoriesModel.countAll(keyword))

    const pagination = pageHandler(count, limit, page)

    const categories = await categoriesModel.selectAll(keyword, page, limit)

    if (keyword && categories.length === 0) {
      throw new Error('Keyword doesn\'t match')
    }

    return resTrue(res, 'List All Categories', true, true, pagination, categories)
  } catch (error) {
    console.log(error)
    return resFalse(error, res, error.message, 'Categorie')
  }
}

exports.getDetailCategory = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const category = await categoriesModel.selectOne(id)

    if (!category) {
      throw new Error('Id is not found')
    }

    return resTrue(res, 'Category Detail', false, true, null, category)
  } catch (error) {
    console.log(error)
    return resFalse(error, res, error.message, 'Category')
  }
}

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body

    if (!name || req.body.name === undefined) {
      throw new Error('Undefined input')
    }

    const category = await categoriesModel.insert(req.body)

    return resTrue(res, 'Create New Category Successfully', false, true, null, category)
  } catch (error) {
    console.log(error)
    return resFalse(error, res, error.message, 'Category')
  }
}

exports.updateCategory = async (req, res) => {
  try {
    const id = Number(req.params.id)

    const existCategory = await categoriesModel.selectOne(id)

    if (!existCategory) {
      throw new Error('Id is not found')
    }

    if (!req.body.name && !req.body.additionalPrice) {
      throw new Error('Undefined input')
    }

    if (req.body.name === existCategory.name) {
      throw new Error('Duplicate,name')
    }

    const category = await categoriesModel.update(id, req.body)

    return resTrue(res, 'Update Category Successfully', false, true, null, category)
  } catch (error) {
    console.log(error)
    return resFalse(error, res, error.message, 'Category')
  }
}

exports.deleteCategory = async (req, res) => {
  try {
    const id = Number(req.params.id)

    const existCategory = await categoriesModel.selectOne(id)

    if (!existCategory) {
      throw new Error('Id is not found')
    }

    const category = await categoriesModel.delete(id)

    return resTrue(res, 'Delete Category Successfully', false, true, null, category)
  } catch (error) {
    console.log(error)
    return resFalse(error, res, error.message, 'Category')
  }
}
