const messagesModel = require('../../models/messages.model')
const usersModel = require('../../models/users.model')
const { resFalse, resTrue, pageHandler } = require('../../utils/handler')

exports.getAllMessages = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query

    const count = Number(await messagesModel.countAll())

    const pagination = pageHandler(count, limit, page)

    const messages = await messagesModel.selectAll(page, limit)

    return resTrue(res, 'List All Messages', true, true, pagination, messages)
  } catch (error) {
    console.log(error)
    return resFalse(error, res, error.message, 'Messages')
  }
}

exports.getDetailMessage = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const message = await messagesModel.selectOne(id)

    if (!message) {
      throw new Error('Id is not found')
    }

    return resTrue(res, 'Message Detail', false, true, null, message)
  } catch (error) {
    console.log(error)
    return resFalse(error, res, error.message, 'Message')
  }
}

exports.createMessage = async (req, res) => {
  try {
    const recipientId = Number(req.body.recipientId)
    const senderId = req.user.id
    const text = req.body.text

    const existRecipientUser = await usersModel.selectOne(recipientId)

    if (!existRecipientUser) {
      throw new Error('Id is not found')
    }

    if (senderId === recipientId) {
      throw new Error('Send to own account')
    }

    if (!recipientId ||
            !text ||
            req.body.recipientId === undefined ||
            req.body.text === undefined) {
      throw new Error('Undefined input')
    }

    const message = await messagesModel.insert(req.body)

    return resTrue(res, 'Create New Message Successfully', false, true, null, message)
  } catch (error) {
    console.log(error)
    return resFalse(error, res, error.message, 'Recipient')
  }
}

exports.updateMessage = async (req, res) => {
  try {
    const id = Number(req.params.id)

    const existMessage = await messagesModel.selectOne(id)

    if (!existMessage) {
      throw new Error('Id is not found')
    }

    if (!req.body.text) {
      throw new Error('Undefined input')
    }

    const message = await messagesModel.update(id, req.body)

    return resTrue(res, 'Update Message Successfully', false, true, null, message)
  } catch (error) {
    console.log(error)
    return resFalse(error, res, error.message, 'Message')
  }
}

exports.deleteMessage = async (req, res) => {
  try {
    const id = Number(req.params.id)

    const existMessage = await messagesModel.selectOne(id)

    if (!existMessage) {
      throw new Error('Id is not found')
    }

    const message = await messagesModel.delete(id)

    return resTrue(res, 'Delete Message Successfully', false, true, null, message)
  } catch (error) {
    console.log(error)
    return resFalse(error, res, error.message, 'Message')
  }
}
