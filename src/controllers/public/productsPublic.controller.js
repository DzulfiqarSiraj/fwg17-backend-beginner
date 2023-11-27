const productModel = require('../../models/products.model')

exports.getAllProducts = async (req, res) => {
  try{
    const {search, filterBy, range, sortBy, order, page = 1} = req.query
    console.log(search)

    let count;
    let product;
    
    if(filterBy === 'basePrice'){
      count = Number(await productModel.countAllbyBasePrice(search))
    } else {
      count = Number(await productModel.countAll(search))
    }

    const totalPage = Math.ceil(count / 5)
    const nextPage = Number(page) + 1
    const prevPage = Number(page) - 1

    if(filterBy === 'basePrice' || filterBy === 'id'){
      product = await productModel.findAllByIdOrBasePrice(search, filterBy, range, sortBy, order, page)
    } else {
      product = await productModel.findAll(search, filterBy, sortBy, order, page)
    }
      return res.json({
        success: true,
        message: 'List All Products',
        pageInfo: {
          currentPage: Number(page),
          totalPage,
          nextPage: nextPage <= totalPage ? nextPage : null,
          prevPage: prevPage > 0 ? prevPage : null,
          totalData: count
        },
        results: product
      })
  }catch(err){
    return res.json({
      success: false,
      message: 'Products Not Found',
    })
  }
}

exports.getDetailProduct = async(req, res) => {
  try{
    const id = Number(req.params.id)
    const product = await productModel.findOne(id)
    if(product){
      return res.json({
        success: true,
        message: 'Detail Product',
        results: product
      })
    }else {
      throw Error()
    }
  }catch(err){
    return res.json({
      success: false,
      message: 'Product Not Found'
    })
  }
}