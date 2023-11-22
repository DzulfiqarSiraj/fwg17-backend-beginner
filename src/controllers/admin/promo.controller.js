const promoModel = require('../../models/promo.model')

exports.getAllPromo = async (req,res) => {
  try{
    const promo = await promoModel.findAll()
    return res.json({
      success: true,
      message: "List All Promo",
      results: promo
    })
  }catch(err){
    return res.json({
      success: true,
      message: "Promos Not Found"
    })
  }
}


exports.getDetailPromo = async (req,res) => {
  try{
    const id = Number(req.params.id)
    const promo = await promoModel.findOne(id)
    if(promo){
      return res.json({
        success: true,
        message: 'Detail Promo',
        results: promo
      })
    }else{
      throw Error()
    }
  }catch(err){
    return res.json({
      success: false,
      message: 'Promo Not Found'
    })
  }
}


exports.createPromo = async(req, res) => {
  try{
    const promo = await promoModel.insert(req.body)
  
    return res.json({
    success: true,
    message: 'Create Promo Successfully',
    results: promo
  })
  }catch(err){
    return res.status(404).json({
      success: false,
      message: 'Error'
    })
  }
}


exports.updatePromo = async (req, res) => {
  try{
    const {id} = req.params
    const promo = await promoModel.update(id, req.body)
    return res.json({
      success: true,
      message: 'Update Promo Successfully',
      results: promo
    })
  }catch(err){
    return res.json({
      success: false,
      message: 'Update Fail'
    })
  }
}

exports.deletePromo = async (req, res) => {
  try{
    const promoList = await promoModel.findAll()
    const {id} = req.params
    for(let item in promoList){
      if(String(promoList[item]['id']) === id){
        const promo = await promoModel.delete(id)
        return res.json({
          success: true,
          message: 'Delete Success',
          results: promo
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