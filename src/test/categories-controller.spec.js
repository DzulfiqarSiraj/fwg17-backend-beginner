const {expect} = require('chai')
const {describe} = require('mocha')
const categoryController = require('../controllers/admin/categories.controller')

describe('Get All Categories Controller', () => {
    const req = {
        query: {}
    }
    const res = {
        json: (param) => {
            return param
        }
    }

    it('Should return object', async () => {
        const response = await categoryController.getAllCategories(req, res)
        expect(typeof response).to.be.equal('object')
    })

    it('Should return message: List All Categories', async () => {
        const response = await categoryController.getAllCategories(req,res)
        expect(response.message).to.be.equal('List All Categories')
    })

    it('Should return message: Category Not Found', async () => {
        const req = {
            query: {
                keyword: 'random string'
            }
        }
        const response = await categoryController.getAllCategories(req, res)
        expect(response.message).to.be.equal('Categories Not Found')
    })

    it('Should return success: true', async () => {
        const response = await categoryController.getAllCategories(req,res)
        expect(response.success).to.be.equal(true)
    })
    
    it('Should be on page 1 if no page requested', async () => {
        const response = await categoryController.getAllCategories(req,res)
        expect(response.pageInfo.currentPage).to.be.equal(1)
    })

    it('Should be null on prevPage if currentPage is 1', async () => {
        const response = await categoryController.getAllCategories(req,res)
        expect(response.pageInfo.prevPage).to.be.null
    })

    it('Should return message: Bad Request', async () => {
        const req = {
            query: {
                page: 0
            }
        }
        const response = await categoryController.getAllCategories(req,res)
        expect(response.message).to.be.equal('Bad Request')
    })
})

describe('Detail Category Controller', () => {
    const req = {
        query: {}
    }

    const res = {
        json: (param) => {
            return param
        }
    }

    it('Should return object', async () => {
        const response = await categoryController.getDetailCategory(req, res)
        expect(typeof response).to.be.equal('object')
    })

    it('Should return success: true', async () => {
        const req = {
            params: {
                id: 1
            }
        }
        const response = await categoryController.getDetailCategory(req, res)
        expect(response.success).to.be.equal(true)
    })

    it('Should return message: Categories Not Found', async () => {
        const req = {
            params: {
                id: 1000
            }
        }
        const response = await categoryController.getDetailCategory(req, res)      
        expect(response.message).to.be.equal('Category Not Found')
    })
})

describe('Delete Category', () => {
    const req = {
        params: {}
    }
    const res = {
        json: (param) => {
            return param
        }
    }

    it('Should return object', async () => {
        const response = await categoryController.deleteCategory(req, res)      
        expect(typeof response).to.be.equal('object')
    })
    
    it('Should return success: false', async() => {        
        const response = await categoryController.deleteCategory(req, res)      
        expect(response.success).to.be.equal(false)
    })

    it('Should return message: No Existing Data', async () => {
        const response = await categoryController.deleteCategory(req, res)      
        expect(response.message).to.be.equal('No Existing Data')
    })

})