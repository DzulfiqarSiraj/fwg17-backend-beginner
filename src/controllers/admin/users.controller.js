const usersModel = require('../../models/users.model')
const { resFalse, resTrue, pageHandler } = require('../../utils/handler')
const uploadMiddleware = require('../../middlewares/upload.middleware')
const upload = uploadMiddleware('users').single('pictures')
const fsPromises = require('fs/promises')
const argon = require('argon2')
const path = require('path')

exports.getAllUsers = async (req, res) => {
  try {
    const { keyword, page = 1, limit = 5 } = req.query

    const count = Number(await usersModel.countAll(keyword))

    const pagination = pageHandler(count, limit, page)

    const users = await usersModel.selectAll(keyword, page, limit)

    if (keyword && users.length === 0) {
      throw new Error('Keyword doesn\'t match')
    }

    return resTrue(res, 'List All Users', true, true, pagination, users)
  } catch (error) {
    console.log(error)
    return resFalse(error, res, error.message, 'User')
  }
}

exports.getDetailUser = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const user = await usersModel.selectOne(id)

    if (!user) {
      throw new Error('Id is not found')
    }

    return resTrue(res, 'User Detail', false, true, null, user)
  } catch (error) {
    console.log(error)
    return resFalse(error, res, error.message, 'User')
  }
}

exports.createUser = async (req, res) => {
  upload(req, res, async (err) => {
    try {
      if (err) {
        throw err
      }

      const { fullName, email, password } = req.body

      if (!fullName || !email || !password) {
        throw new Error('Undefined input')
      }

      if (password) {
        req.body.password = await argon.hash(req.body.password)
      }

      if (req.file) {
        req.body.pictures = req.file.filename
      }

      const user = await usersModel.insert(req.body)

      if (req.file) {
        const ext = {
          'image/png': '.png',
          'image/jpg': '.jpg',
          'image/jpeg': '.jpeg'
        }

        const pathDestination = path.join(global.path, 'uploads', 'users')
        const fileTarget = path.join(pathDestination, req.file.filename)
        const filename = `${user.id}_${req.body.name.split(' ').join('_')}${ext[req.file.mimetype]}`
        const newPathDestination = path.join(pathDestination, filename)

        await fsPromises.rename(fileTarget, newPathDestination)
        const newUser = await usersModel.update(user.id, {
          pictures: filename
        })

        resTrue(res, 'Create User Successfully', false, true, null, newUser)
      }

      return resTrue(res, 'Create User Successfully', false, true, null, user)
    } catch (error) {
      console.log(error)
      return resFalse(error, res, error.message, 'User')
    }
  })
}

exports.updateUser = async (req, res) => {
  upload(req, res, async (err) => {
    try {
      if (err) {
        throw err
      }

      const id = Number(req.params.id)

      const existUser = await usersModel.selectOne(id)

      if (!existUser) {
        throw new Error('Id is not found')
      }

      if (req.body.password) {
        req.body.password = await argon.hash(req.body.password)
      }

      if (req.file) {
        if (existUser.pictures) {
          const currentFilePath = path.join(global.path, 'uploads', 'users', existUser.pictures)
          fsPromises.access(currentFilePath, fsPromises.constants.R_OK).then(() => {
            fsPromises.rm(currentFilePath)
          }).catch(() => {})
        }
        req.body.pictures = req.file.filename
      }

      const user = await usersModel.update(id, req.body)

      if (req.file) {
        const ext = {
          'image/png': '.png',
          'image/jpg': '.jpg',
          'image/jpeg': '.jpeg'
        }

        const pathDestination = path.join(global.path, 'uploads', 'users')
        const fileTarget = path.join(pathDestination, req.file.filename)
        const filename = `${user.id}_${user.fullName.split(' ').join('_')}${ext[req.file.mimetype]}`
        const newPathDestination = path.join(pathDestination, filename)

        await fsPromises.rename(fileTarget, newPathDestination)
        const newUser = await usersModel.update(user.id, {
          pictures: filename
        })

        return resTrue(res, 'Update User Successfully', false, true, null, newUser)
      }

      return resTrue(res, 'Update User Successfully', false, true, null, user)
    } catch (error) {
      console.log(error)
      return resFalse(error, res, error.message, 'User')
    }
  })
}

exports.deleteUser = async (req, res) => {
  try {
    const id = Number(req.params.id)

    const existUser = await usersModel.selectOne(id)

    if (!existUser) {
      throw new Error('Id is not found')
    }

    if (existUser.pictures) {
      const currentFilePath = path.join(global.path, 'uploads', 'users', existUser.pictures)
      fsPromises.access(currentFilePath, fsPromises.constants.R_OK).then(() => {
        fsPromises.rm(currentFilePath)
      }).catch(() => {})
    }

    const user = await usersModel.delete(id)

    return resTrue(res, 'Delete User Successfully', false, true, null, user)
  } catch (error) {
    console.log(error)
    return resFalse(error, res, error.message, 'User')
  }
}
