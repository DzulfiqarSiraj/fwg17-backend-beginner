const productSizeModel = require('../../models/productSize.model')

exports.getAllProductSize = async (req, res) => {
  try{
    const {keyword, page = 1, limit = 5} = req.query

    const count = Number(await productSizeModel.countAll(keyword))
    const totalPage = Math.ceil(count / limit)
    const nextPage = Number(page) + 1
    const prevPage = Number(page) - 1

    if(page == 0) {
      return res.json({
        success: false,
        message: 'Bad Request'
      })
    }

    const productSize = await productSizeModel.findAll(keyword, page, limit)

    if(productSize.length === 0) {
      return res.json({
        success: true,
        message: 'Product Size Not Found',
        pageInfo: {
          currentPage: Number(page),
          totalPage,
          nextPage: nextPage <= totalPage ? nextPage : null,
          prevPage: prevPage > 0 ? prevPage : null,
          totalData: count
        },
        results: productSize
      })
    }
  
    return res.json({
      success: true,
      message: 'List All Product Size',
      pageInfo: {
        currentPage: Number(page),
        totalPage,
        nextPage: nextPage <= totalPage ? nextPage : null,
        prevPage: prevPage > 0 ? prevPage : null,
        totalData: count
      },
      results: productSize
    })
  }catch(err){
    return res.json({
      success: false,
      message: 'Internal Server Error',
    })
  }
}

exports.getDetailProductSize = async (req, res) => {
  try{
    const id = Number(req.params.id)
    const productSize = await productSizeModel.findOne(id)
    if(productSize){
      return res.json({
        success: true,
        message: 'Detail Product Size',
        results: productSize
      })
    }else{
      throw Error()
    }
  }catch(err){
    return res.json({
      success: false,
      message: 'Product Size Not Found'
    })
  }
}

exports.createProductSize = async (req, res) => {
  const productSize = await productSizeModel.insert(req.body)
  try{
    return res.json({
      success: true,
      message: 'Create Product Size Successfully',
      results: productSize
    })
  }catch(err){
    return res.status(404).json({
      success: false,
      message: 'Error'
    })
  }
}

exports.updateProductSize = async (req, res) => {
  const {id} = req.params
  const productSize = await productSizeModel.update(id, req.body)
  try{
    return res.json({
      success: true,
      message: 'Update Product Size Succesfully',
      results: productSize
    })
  }catch(err){
    return res.json({
      success: false,
      message: 'Update Fail'
    })
  }
}

exports.deleteProductSize = async (req, res) => {
  const {id} = req.params
  const productSizes = await productSizeModel.findOne(id)

  if(!productSizes){
    return res.json({
      success: false,
      message: 'No Existing Data'
    })
  }
  
  const productSize = await productSizeModel.delete(id)
  return res.json({
    success: true,
    message: 'Delete Success',
    results: productSize
  })
}