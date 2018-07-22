const express = require('express')
const Router = express.Router
const router = Router()
const User = require('../models/User')

router.post('/', async (req, res, next) => {
  // get the email and password from the request body
  const { email, password, firstName, lastName, role } = req.body
    // create a new instance of the user model
    const user = new User({
    email,
    password,
    firstName,
    lastName,
    role
  })
    try {
    // save it
    const doc = await user.save()
    // if successful, send back user
    res.status(200).send(doc)
  } catch (e) {
    // if unsuccessful, send back error
    next(e)
  }
})

module.exports = router
