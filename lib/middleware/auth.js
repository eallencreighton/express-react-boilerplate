const jwt = require('jsonwebtoken')
const tokenService = require('../tokenService')
const config = require('config')
const secret = process.env.SECRET || config.SECRET

const issueToken = async (req, res, next) => {
  const { password } = req.body
  const { user } = req
  const match = await user.comparePassword(password)

  if (match) {
    req.token = tokenService.create(user)
    next()
  } else {
    next(new Error('unauthorized'))
  }
}

const verifyToken = async (req, res, next) => {
  const authHeader = req.get('authorization')

  if (!authHeader) {
    next(new Error('unauthorized'))
  }
  const token = authHeader.split(' ')[1] // grab just the token
  try {
    const decoded = await jwt.verify(token, secret)
    if (decoded) {
      req.decoded = decoded
    }
    next()
  } catch (e) {
    next(e)
  }
}

module.exports = {
  issueToken,
  verifyToken
}
