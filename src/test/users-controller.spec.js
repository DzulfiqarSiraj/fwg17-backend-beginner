const { expect } = require('chai')
const { describe, it } = require('mocha')
const userController = require('../controllers/admin/users.controller')

describe('Get All Users Controller', () => {
  const req = {
    query: {}
  }

  const res = {
    json: (param) => {
      return param
    }
  }

  it('Should return object', async () => {
    const response = await userController.getAllUsers(req, res)
    expect(typeof response).to.be.equal('object')
  })

  it('Should return success: true', async () => {
    const response = await userController.getAllUsers(req, res)
    expect(response.success).to.be.equal(true)
  })

  it('Should return message: List All Users', async () => {
    const response = await userController.getAllUsers(req, res)

    expect(response.message).to.be.equal('List All Users')
  })

  it('Should return message: Users Not Found', async () => {
    const req = {
      query: {
        keyword: 'random query'
      }
    }
    const response = await userController.getAllUsers(req, res)
    expect(response.message).to.be.equal('Users Not Found')
  })

  it('Should be on page 1 if no page requsted', async () => {
    const response = await userController.getAllUsers(req, res)
    expect(response.pageInfo.currentPage).to.be.equal(1)
  })

  it('Should be null on prevPage if currentPage is 1', async () => {
    const response = await userController.getAllUsers(req, res)
    expect(response.pageInfo.prevPage).to.be.equal(null)
  })

  it('Should return message: Bad Request', async () => {
    const req = {
      query: {
        page: 0
      }
    }
    const response = await userController.getAllUsers(req, res)
    expect(response.message).to.be.equal('Bad Request')
  })
})

describe('Get Detail User', () => {
  const req = {
    query: {}
  }

  const res = {
    json: (param) => {
      return param
    }
  }

  it('Should return object', async () => {
    const response = await userController.getDetailUser(req, res)
    expect(typeof response).to.be.equal('object')
  })

  it('Should return success: true', async () => {
    const req = {
      params: {
        id: 1
      }
    }
    const response = await userController.getDetailUser(req, res)
    expect(response.success).to.be.equal(true)
  })

  it('Should return message: User Not Found', async () => {
    const req = {
      params: {
        id: 1000
      }
    }
    const response = await userController.getDetailUser(req, res)
    expect(response.message).to.be.equal('User Not Found')
  })
})

describe('Delete User', () => {
  const req = {
    params: {}
  }

  const res = {
    json: (param) => {
      return param
    }
  }

  it('Should return object', async () => {
    const response = await userController.deleteUser(req, res)
    expect(typeof response).to.be.equal('object')
  })

  it('Should return success: false', async () => {
    const response = await userController.deleteUser(req, res)
    expect(response.success).to.be.equal(false)
  })

  it('Should return message: No Existing Data', async () => {
    const response = await userController.deleteUser(req, res)
    expect(response.message).to.be.equal('No Existing Data')
  })
})
