const messagesRouter = require('express').Router()

const messagesController = require('../../controllers/admin/messages.controller')

messagesRouter.get('/',messagesController.getAllMessages);
messagesRouter.get('/:id', messagesController.getDetailMessage);
messagesRouter.post('/',messagesController.createMessage);
messagesRouter.patch('/:id',messagesController.updateMessage);
messagesRouter.delete('/:id',messagesController.deleteMessage);

module.exports = messagesRouter