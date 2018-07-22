const express = require('express')
const Router = express.Router
const router = Router()
const User = require('../models/User')
// lib/app.js
const token = require('../tokenService')

router.post('/', async (req, res, next) => {
  // retrieve user and password from body
  const { email, password } = req.body
  // 2. Find a user in the db, that matches the email in the request body

  try {
    const doc = await User.findOne({ email }) // same as email:email
    // EAC attempt
    // const existantUser = await user.find({email: `${email}`})
    // res.status(200).send(existantUser)
    // 2.5 If the user does not exist, send a 404 (not found) error
    if (!doc) {
      next(new Error('not found'))
    }
    // 3. Check to see if the passwords match
    try {
      const match = await doc.comparePassword(password)
      if (match) {
        const _token = token.create(doc)
        res.status(200).send({ token: _token })
      }
      next(new Error('unauthorized'))
    } catch (e) {
      next(e)
    }

    // 5. If they don't match, send back a 401 (unauthorized error)

    next(new Error('unauthorized'))
  } catch (e) {
    next(e)
  }
})

module.exports = router
