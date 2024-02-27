const { expect } = require('chai')
const {describe} = require('mocha')
const userController = require('../controllers/admin/users.controller')


describe('User Controller', () => {
    const res = {
        json : (param) => {
            return param
        }
    }

    it('Should return object', async () => {
    
        const response = await userController.getAllUsers(null, res)
        
        expect(typeof response).to.be.equal('object')
    })
    
    it('Should return success: true', async () => {
        
        const response = await userController.getAllUsers(null, res)
        
        expect(response.success).to.be.equal(true)
    })
    
    it('Should return message: List All Users', async () => {

        const response = await userController.getAllUsers(null, res)

        except(response.message).to.be.equal('List All Users')
    })
})