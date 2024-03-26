const tagsModel = require('../../models/tags.model')
const {resFalse, resTrue, pageHandler} = require('../../utils/handler')

exports.getAllTags = async (req, res) => {
    try {
        const {keyword, page = 1, limit=5} = req.query

        const count = Number(await tagsModel.countAll(keyword))

        const pagination = pageHandler(count,limit,page)

        const tags = await tagsModel.selectAll(keyword, page, limit)

        if(keyword && tags.length === 0){
            throw new Error(`Keyword doesn't match`)
        }

        return resTrue(res, 'List All Tags', true, true, pagination, tags)

    } catch (error) {
        console.log(error)
        return resFalse(error, res, error.message, 'Tag')
    }
};

exports.getDetailTag = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const tag = await tagsModel.selectOne(id)
        
        if(!tag) {
            throw new Error(`Id is not found`)
        }

        return resTrue(res, 'Tag Detail', false, true, null, tag)

    } catch (error) {
        console.log(error)
        return resFalse(error, res, error.message, 'Tag')
    }
};

exports.createTag = async (req, res) => {
    try {
        const {name, discount} = req.body

        if(!name || !discount || req.body['name'] === undefined || req.body['discount'] === undefined){
            throw new Error('Undefined input')
        }

        const tag = await tagsModel.insert(req.body)

        return resTrue(res, 'Create New Tag Successfully',false, true, null, tag)

    } catch (error) {
        console.log(error)
        return resFalse(error, res, error.message, 'Tag')
    }
};

exports.updateTag = async (req, res) => {
    try {
        const id = Number(req.params.id)

        const existTag = await tagsModel.selectOne(id)

        if(!existTag){
            throw new Error(`Id is not found`)
        }

        if(!req.body.name && !req.body.discount){
            throw new Error('Undefined input')
        }

        if(req.body.name === existTag.name){
            throw new Error('Duplicate,name')
        }
        
        const tag = await tagsModel.update(id, req.body)

        return resTrue(res,'Update Tag Successfully',false,true,null,tag)
    } catch (error) {
        console.log(error)
        return resFalse(error, res, error.message, 'Tag')
    }
};

exports.deleteTag = async (req, res) => {
    try {
        const id = Number(req.params.id)

        const existTag = await tagsModel.selectOne(id)

        if(!existTag){
            throw new Error(`Id is not found`)
        }

        const tag = await tagsModel.delete(id)

        return resTrue(res,'Delete Tag Successfully',false,true,null,tag)

    } catch (error) {
        console.log(error)
        return resFalse(error, res, error.message,'Tag')
    }
};