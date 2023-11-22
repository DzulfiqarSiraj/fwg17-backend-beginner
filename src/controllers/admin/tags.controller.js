const tagModel = require('../../models/tags.model')

exports.getAllTags = async (req,res) => {
  try{
    const tags = await tagModel.findAll()
    return res.json({
      success: true,
      message: "List All Tags",
      results: tags
    })
  }catch(err){
    return res.json({
      success: true,
      message: "Tags Not Found"
    })
  }
}


exports.getDetailTag = async (req,res) => {
  try{
    const id = Number(req.params.id)
    const tag = await tagModel.findOne(id)
    if(tag){
      return res.json({
        success: true,
        message: 'Detail Tag',
        results: tag
      })
    }else{
      throw Error()
    }
  }catch(err){
    return res.json({
      success: false,
      message: 'Tag Not Found'
    })
  }
}


exports.createTag = async(req, res) => {
  try{
    const tag = await tagModel.insert(req.body)
  
    return res.json({
    success: true,
    message: 'Create Tag Successfully',
    results: tag
  })
  }catch(err){
    return res.status(404).json({
      success: false,
      message: 'Error'
    })
  }
}


exports.updateTag = async (req, res) => {
  try{
    const {id} = req.params
    const tag = await tagModel.update(id, req.body)
    return res.json({
      success: true,
      message: 'Update Tag Successfully',
      results: tag
    })
  }catch(err){
    return res.json({
      success: false,
      message: 'Update Fail'
    })
  }
}

exports.deleteTag = async (req, res) => {
  try{
    const tags = await tagModel.findAll()
    const {id} = req.params
    for(let item in tags){
      if(String(tags[item]['id']) === id){
        const tag = await tagModel.delete(id)
        return res.json({
          success: true,
          message: 'Delete success',
          results: tag
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