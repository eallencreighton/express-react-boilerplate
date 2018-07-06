const express = require('express')
const Router = express.Router
const router = Router()
const { Song } = require('../models/Song')

router.get('/', async (req, res, next) => {
  try {
    const docs = await Song.find()
    res.status(200).send(docs)
  } catch (e) {
    next(e)
  }
})

// router.get('/:song_id', async (req, res, next) => {
//   try {
//     const { song_id } = req.params
//     const doc = await Song
//       .findById(song_id)
//       .populate('user')
//       .populate('comments.user')
//     res.status(200).send(doc)
//   } catch (e) {
//     next(e)
//   }
// })

module.exports = router
