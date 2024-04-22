const { describe, it } = require('mocha')
const { expect } = require('chai')
const supertest = require('supertest')
const app = require('../../..')

const request = supertest(app)

describe('/products endpoint testing', () => {
  describe('GET /products', () => {
    it('Should return object', () => {
      request.get('/products').end((_, res) => {
        expect(typeof res.body).to.be.equal('object')
      })
    })

    it('Should return page as params on pageInfo', () => {
      const page = 1
      request.get(`/products?page=${page}`).end((_, res) => {
        expect(res.body.pageInfo.currentPage).to.be.equal(page)
      })
    })

    it('Should return message success: true', () => {
      request.get('/products').end((_, res) => {
        expect(res.body.success).to.be.equal(true)
      })
    })

    it('Should return message: Bad Request', () => {
      request.get('/products?page=0').end((_, res) => {
        expect(res.body.message).to.be.equal('Bad Request')
      })
    })

    it('Should return message: List All Products', () => {
      request.get('/products').end((_, res) => {
        expect(res.body.message).to.be.equal('List All Products')
      })
    })
  })

  describe('DELETE /admin/products', () => {
    const id = 1
    it('Should return object', () => {
      request.delete(`/admin/products/${id}`).end((_, res) => {
        expect(typeof res.body).to.be.equal('object')
      })
    })

    it('Should return success: true', () => {
      it('Should return success: true', () => {
        request.delete(`admin/products/${id}`).end((_, res) => {
          expect(res.body.success).to.be.equal(true)
        })
      })
    })
  })
})
