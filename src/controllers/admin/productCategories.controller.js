const productCategoriesModel = require('../../models/productCategories.model')
const productsModel = require('../../models/products.model')
const categoriesModel = require('../../models/categories.model')
const {resFalse, resTrue, pageHandler} = require('../../utils/handler')

exports.getAllProductCategories = async (req, res) => {
    try {
        const {page = 1, limit=5} = req.query

        const count = Number(await productCategoriesModel.countAll())

        const pagination = pageHandler(count,limit,page)

        const productCategories = await productCategoriesModel.selectAll(page, limit)

        return resTrue(res, 'List All Product Categories', true, true, pagination, productCategories)

    } catch (error) {
        console.log(error)
        return resFalse(error, res, error.message, 'Product Categories')
    }
};

exports.getDetailProductCategory = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const productCategory = await productCategoriesModel.selectOne(id)
        
        if(!productCategory) {
            throw new Error(`Id is not found`)
        }

        return resTrue(res, 'Product Category Detail', false, true, null, productCategory)

    } catch (error) {
        console.log(error)
        return resFalse(error, res, error.message, 'Product Category')
    }
};

exports.createProductCategory = async (req, res) => {
    try {
        const {productId, categoryId} = req.body

        if(!productId || !categoryId){
            throw new Error('Undefined input')
        }

        const existProductCategories = await productCategoriesModel.selectOneByProductIdAndCategoryId(productId, categoryId)
        const product = await productsModel.selectOne(productId)
        const category = await categoriesModel.selectOne(categoryId)

        if(existProductCategories){
            throw new Error('Already exists')
        }

        if(!product){
            throw new Error('Product Id is not found')
        }

        if(!category){
            throw new Error('Category Id is not found')
        }

        const productCategory = await productCategoriesModel.insert(req.body)

        return resTrue(res, 'Create New Product Category Successfully',false, true, null, productCategory)

    } catch (error) {
        console.log(error)
        if(error.message === 'Product Id is not found'){
            return resFalse(error, res, error.message.slice(8), 'Product')
        }
        if(error.message === 'Category Id is not found'){
            return resFalse(error, res, error.message.slice(9), 'Category')
        }
        return resFalse(error, res, error.message, 'Product Category')
    }
};

exports.updateProductCategory = async (req, res) => {
    try {
        const id = Number(req.params.id)

        const existProductCategory = await productCategoriesModel.selectOne(id)
        const existProductCategorySec = await productCategoriesModel.selectOneByProductIdAndCategoryId(req.body.productId, req.body.categoryId)
        const product = await productsModel.selectOne(req.body.productId)
        const category = await categoriesModel.selectOne(req.body.categoryId)

        if(!existProductCategory){
            throw new Error(`Id is not found`)
        }

        if(!req.body.productId || !req.body.categoryId){
            throw new Error('Undefined input')
        }

        if(!product){
            throw new Error('Product Id is not found')
        }

        if(!category){
            throw new Error('Category Id is not found')
        }


        if(existProductCategorySec){
            throw new Error('Already exists')
        }
        
        const productCategory = await productCategoriesModel.update(id, req.body)

        return resTrue(res,'Update Product Category Successfully',false,true,null,productCategory)
    } catch (error) {
        console.log(error)
        if(error.message === 'Product Id is not found'){
            return resFalse(error, res, error.message.slice(8), 'Product')
        }
        if(error.message === 'Category Id is not found'){
            return resFalse(error, res, error.message.slice(9), 'Category')
        }
        return resFalse(error, res, error.message, 'Product Category')
    }
};

exports.deleteProductCategory = async (req, res) => {
    try {
        const id = Number(req.params.id)

        const existProductCategory = await productCategoriesModel.selectOne(id)

        if(!existProductCategory){
            throw new Error(`Id is not found`)
        }
        
        const productCategory = await productCategoriesModel.delete(id)

        return resTrue(res,'Delete Product Category Successfully',false,true,null,productCategory)

    } catch (error) {
        console.log(error)
        return resFalse(error, res, error.message, 'Product Category')
    }
};