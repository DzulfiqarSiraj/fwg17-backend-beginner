const categoryModel = require('../../models/categories.model')

exports.getAllCategories = async (req, res) => {
  try{
    const {keyword, page = 1, limit = 5} = req.query

    const count = Number(await categoryModel.countAll(keyword))
    const totalPage = Math.ceil(count / limit)
    const nextPage = Number(page) + 1
    const prevPage = Number(page) - 1

    if(page == 0) {
      return res.json({
        success: false,
        message: 'Bad Request'
      })
    }

    const categories = await categoryModel.findAll(keyword, page, limit)

    if(categories.length === 0) {
      return res.json({
        success: true,
        message: 'Categories Not Found',
        pageInfo: {
          currentPage: Number(page),
          totalPage,
          nextPage: nextPage <= totalPage ? nextPage : null,
          prevPage: prevPage > 0 ? prevPage : null,
          totalData: count
        },
        results: categories
      })
    }

    return res.json({
      success: true,
      message: 'List All Categories',
      pageInfo: {
        currentPage: Number(page),
        totalPage,
        nextPage: nextPage <= totalPage ? nextPage : null,
        prevPage: prevPage > 0 ? prevPage : null,
        totalData: count
      },
      results: categories
    })
  }catch(err){
    return res.json({
      success: false,
      message: 'Internal Server Error',
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
  const {id} = req.params
  const categories = await categoryModel.findOne(id)

  if(!categories){
    return res.json({
      success: false,
      message: 'No Existing Data'
    })
  }
  
  const category = await categoryModel.delete(id)
  return res.json({
    success: true,
    message: 'Delete Success',
    results: category
  })
}