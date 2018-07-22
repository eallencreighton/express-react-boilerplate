const express = require('express')
const Router = express.Router
const router = Router()
const { Song } = require('../models/Song')

router.get('/', async (req, res, next) => {
  try {
    const docs = await Song
      .find()
    res.status(200).send(docs)
  } catch (e) {
    next(e)
  }
})

router.get('/:vocabString', async (req, res, next) => {
  try {
    const { vocabString } = req.params

    const doc = await Song
      .find({vocabString: new RegExp(vocabString, 'g')})
      .populate('user')
      .populate('comments.user')
    res.status(200).send(doc)
  } catch (e) {
    next(e)
  }
})

module.exports = router
