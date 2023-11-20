const categoryModel = require('../models/categories.model')

exports.getAllCategories = async (req, res) => {
  try{
    const categories = await categoryModel.findAll()
    return res.json({
      success: true,
      message: 'List All Categories',
      results: categories
    })
  }catch(err){
    return res.json({
      success: false,
      message: 'Categories Not Found',
    })
  }
}

exports.getDetailCategory = async(req, res) => {
  try{
    const id = Number(req.params.id)
    const category = await categoryModel.findOne(id)
    if(category){
      return res.json({
        success: true,
        message: 'Detail Category',
        results: category
      })
    }else {
      throw Error()
    }
  }catch(err){
    return res.json({
      success: false,
      message: 'Category Not Found'
    })
  }
}

exports.createCategory = async(req, res) => {
  try{
    const category = await categoryModel.insert(req.body)
    return res.json({
      success: true,
      message: "Create Category Successfully",
      result: category
    })
  }catch(err){
    return res.status(404).json({
      success: false,
      message: 'Error'
    })
  }
}

exports.updateCategory = async (req, res) => {
  try{
    const {id} = req.params
    const category = await categoryModel.update(id, req.body)
    return res.json({
      success: true,
      message: 'Update Category Successfully',
      results: category
    })
  } catch(err){
    return res.json({
      success: false,
      message: 'Update Fail',
    })
  }
}

exports.deleteCategory = async (req,res) => {
  try{
    const categories = await categoryModel.findAll()
    const {id} = req.params
    for(let item in categories){
      if(String(categories[item]['id']) === id){
        const category = await categoryModel.delete(id)
        return res.json({
          success: true,
          message: 'Delete success',
          results: category
        })
      }}
      return res.json({
      success: false,
      message: 'No existing data'
    })
  }catch(err){
    return res.json({
      success: false,
      message: 'Internal server error'
    })
  }
}