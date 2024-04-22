const { describe, it } = require('mocha')
const { expect } = require('chai')
const supertest = require('supertest')
const app = require('../../..')

const request = supertest(app)

describe('/users endpoint testing', () => {
  describe('GET admin/users', () => {
    it('Should return object', () => {
      request.get('/admin/users').end((_, res) => {
        expect(typeof res.body).to.be.equal('object')
      })
    })

    // it('Should return page as params on pageInfo', () => {
    //     const page = 1
    //     request.get(`/admin/users?page=${page}`).end((_, res) => {
    //         expect(res.body.pageInfo.currentPage).to.be.equal(page)
    //     })
    // })

    // it('Should return message: List All Users', () => {
    //     request.get(`/admin/users`).end((_, res) => {
    //         expect(res.body.message).to.be.equal('List All Users')
    //     })
    // })

    // it('Should return message success: true', () => {
    //     request.get('/admin/users').end((_, res) => {
    //         expect(res.body.success).to.be.equal(true)
    //     })
    // })
  })

  describe('DELETE /admin/users', () => {
    const id = 1
    it('Should return object', () => {
      request.delete(`/admin/users/${id}`).end((_, res) => {
        expect(typeof res.body).to.be.equal('object')
      })
    })

    it('Should return success: true', () => {
      it('Should return success: true', () => {
        request.delete(`admin/users/${id}`).end((_, res) => {
          expect(res.body.success).to.be.equal(true)
        })
      })
    })
  })
})
