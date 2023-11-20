const tagRouter = require('express').Router()

const tagController = require('../controllers/tags.controller')

tagRouter.get('/', tagController.getAllTags)
tagRouter.get('/:id', tagController.getDetailTag)
tagRouter.post('/', tagController.createTag)
tagRouter.patch('/:id', tagController.updateTag)
tagRouter.delete('/:id', tagController.deleteTag)


module.exports = tagRouter