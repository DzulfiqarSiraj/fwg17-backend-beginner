const { expect } = require('chai')
const { describe, it } = require('mocha')
const productSizeController = require('../controllers/admin/productSize.controller')

describe('Get All Product Size Controller', () => {
  const req = {
    query: {}
  }
  const res = {
    json: (param) => {
      return param
    }
  }

  it('Should return object', async () => {
    const response = await productSizeController.getAllProductSize(req, res)
    expect(typeof response).to.be.equal('object')
  })

  it('Should return message: List All Product Size', async () => {
    const response = await productSizeController.getAllProductSize(req, res)
    expect(response.message).to.be.equal('List All Product Size')
  })

  it('Should return message: Product Size Not Found', async () => {
    const req = {
      query: {
        keyword: 'random string'
      }
    }
    const response = await productSizeController.getAllProductSize(req, res)
    expect(response.message).to.be.equal('Product Size Not Found')
  })

  it('Should return success: true', async () => {
    const response = await productSizeController.getAllProductSize(req, res)
    expect(response.success).to.be.equal(true)
  })

  it('Should be on page 1 if no page requested', async () => {
    const response = await productSizeController.getAllProductSize(req, res)
    expect(response.pageInfo.currentPage).to.be.equal(1)
  })

  it('Should be null on prevPage if currentPage is 1', async () => {
    const response = await productSizeController.getAllProductSize(req, res)
    expect(response.pageInfo.prevPage).to.be.null
  })

  it('Should return message: Bad Request', async () => {
    const req = {
      query: {
        page: 0
      }
    }
    const response = await productSizeController.getAllProductSize(req, res)
    expect(response.message).to.be.equal('Bad Request')
  })
})

describe('Detail Product Size Controller', () => {
  const req = {
    query: {}
  }

  const res = {
    json: (param) => {
      return param
    }
  }

  it('Should return object', async () => {
    const response = await productSizeController.getDetailProductSize(req, res)
    expect(typeof response).to.be.equal('object')
  })

  it('Should return success: true', async () => {
    const req = {
      params: {
        id: 1
      }
    }
    const response = await productSizeController.getDetailProductSize(req, res)
    expect(response.success).to.be.equal(true)
  })

  it('Should return message: Product Size Not Found', async () => {
    const req = {
      params: {
        id: 1000
      }
    }
    const response = await productSizeController.getDetailProductSize(req, res)
    expect(response.message).to.be.equal('Product Size Not Found')
  })
})

describe('Delete Product Size', () => {
  const req = {
    params: {}
  }
  const res = {
    json: (param) => {
      return param
    }
  }

  it('Should return object', async () => {
    const response = await productSizeController.deleteProductSize(req, res)
    expect(typeof response).to.be.equal('object')
  })

  it('Should return success: false', async () => {
    const response = await productSizeController.deleteProductSize(req, res)
    expect(response.success).to.be.equal(false)
  })

  it('Should return message: No Existing Data', async () => {
    const response = await productSizeController.deleteProductSize(req, res)
    expect(response.message).to.be.equal('No Existing Data')
  })
})
