const { describe, it } = require('mocha')
const { expect } = require('chai')
const supertest = require('supertest')
const app = require('../../..')

const request = supertest(app)

describe('/profile endpoint testing', () => {
  describe('GET /profile', () => {
    it('Should return object', () => {
      request.get('/profile').end((_, res) => {
        expect(typeof res.body).to.be.equal('object')
      })
    })

    // it('Should return message: Current User Profile', () => {
    //     request.get('/profile').end((_, res) => {
    //         expect(res.body.message).to.be.equal('Current User Profile')
    //     })
    // })
  })

  describe('UPDATE /profile', () => {
    const id = 1
    it('Should return object', () => {
      request.get(`/profile/${id}`).end((_, res) => {
        expect(typeof res.body).to.be.equal('object')
      })
    })
  })
})
