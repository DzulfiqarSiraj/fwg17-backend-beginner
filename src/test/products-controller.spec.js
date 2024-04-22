const { expect } = require('chai')
const { describe, it } = require('mocha')
const productController = require('../controllers/admin/products.controller')

describe('Get All Product Controller', () => {
  const req = {
    query: {}
  }
  const res = {
    json: (param) => {
      return param
    }
  }

  it('Should return object', async () => {
    const response = await productController.getAllProducts(req, res)
    expect(typeof response).to.be.equal('object')
  })

  it('Should return message: List All Products', async () => {
    const response = await productController.getAllProducts(req, res)
    expect(response.message).to.be.equal('List All Products')
  })

  it('Should return message: Product Not Found', async () => {
    const req = {
      query: {
        keyword: 'random string'
      }
    }
    const response = await productController.getAllProducts(req, res)
    expect(response.message).to.be.equal('Product Not Found')
  })

  it('Should return success: true', async () => {
    const response = await productController.getAllProducts(req, res)
    expect(response.success).to.be.equal(true)
  })

  it('Should be on page 1 if no page requested', async () => {
    const response = await productController.getAllProducts(req, res)
    expect(response.pageInfo.currentPage).to.be.equal(1)
  })

  it('Should be null on prevPage if currentPage is 1', async () => {
    const response = await productController.getAllProducts(req, res)
    expect(response.pageInfo.prevPage).to.be.null
  })

  it('Should return message: Bad Request', async () => {
    const req = {
      query: {
        page: 0
      }
    }
    const response = await productController.getAllProducts(req, res)
    expect(response.message).to.be.equal('Bad Request')
  })
})

describe('Detail Product Controller', () => {
  const req = {
    query: {}
  }

  const res = {
    json: (param) => {
      return param
    }
  }

  it('Should return object', async () => {
    const response = await productController.getDetailProduct(req, res)
    expect(typeof response).to.be.equal('object')
  })

  it('Should return success: true', async () => {
    const req = {
      params: {
        id: 1
      }
    }
    const response = await productController.getDetailProduct(req, res)
    expect(response.success).to.be.equal(true)
  })

  it('Should return message: Product Not Found', async () => {
    const req = {
      params: {
        id: 1000
      }
    }
    const response = await productController.getDetailProduct(req, res)
    expect(response.message).to.be.equal('Product Not Found')
  })
})

describe('Create Product Controller', () => {
  const res = {
    json: (param) => {
      return param
    }
  }

  it('Should return object', async () => {
    const req = {
      headers: {
        'content-type': 'multipart',
        'transfer-encoding': ''
      },
      body: {
        name: 'product name',
        basePrice: 20000
      }
    }
    const response = await productController.createProduct(req, res)
    console.log(response)
    expect(typeof response).to.be.equal('object')
  })
})

describe('Update Product Controller', () => {
  const res = {
    json: (param) => {
      return param
    }
  }

  const req = {
    headers: {
      'content-type': 'multipart',
      'transfer-encoding': ''
    },
    body: {
      name: 'New Product',
      basePrice: 30000
    },
    params: {
      id: 1
    }
  }
  it('Should return object', async () => {
    const response = await productController.updateProduct(req, res)
    expect(typeof response).to.be.equal('object')
  })

  it('Should return message: No Existing Data', async () => {
    const req = {
      params: {
        id: 1000
      }
    }
    const response = await productController.updateProduct(req, res)
    expect(response.message).to.be.equal('No Existing Data')
  })

  it('Should return success: true', async () => {
    const response = await productController.updateProduct(req, res)
    expect(response.success).to.be.equal(true)
  })
})

describe('Delete Product', () => {
  const req = {
    params: {}
  }
  const res = {
    json: (param) => {
      return param
    }
  }

  it('Should return object', async () => {
    const response = await productController.deleteProduct(req, res)
    expect(typeof response).to.be.equal('object')
  })

  // it('Should return success: true', async () => {
  //     const response = await productController.deleteProduct(req,res)
  //     expect(response.success).to.be.equal(true)
  // })

  it('Should return success: false', async () => {
    const response = await productController.deleteProduct(req, res)
    expect(response.success).to.be.equal(false)
  })

  it('Should return message: No Existing Data', async () => {
    const response = await productController.deleteProduct(req, res)
    expect(response.message).to.be.equal('No Existing Data')
  })
})
