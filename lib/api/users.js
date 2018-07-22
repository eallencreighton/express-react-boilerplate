const express = require('express')
const Router = express.Router
const router = Router()
const User = require('../models/User')

const { verifyToken } = require('../middleware/auth')

const getUserById = async (req, res, next) => {
  const { user } = req.decoded
  if (user && user.id) {
    try {
      const doc = await User.findById(user.id)
      req.user = doc
      next()
    } catch (e) {
      next(e)
    }
  }
}

router.get('/', async (req, res, next) => {
  try {
    // get all users with the User model
    const docs = await User.find()
    res.status(200).send(docs)
  } catch (e) {
    next(e)
  }
})

router.get('/current', verifyToken, getUserById, (req, res, next) => {
  if (req.user) {
    res.status(200).send(req.user)
  } else {
    next(new Error('not found'))
  }
})

module.exports = router
