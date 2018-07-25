const express = require('express')
const Router = express.Router
const router = Router()
const { Song } = require('../models/Song')

router.post('/:song_id/comment', async (req, res, next) => {
  // grab the song id from the query params
  const { song_id } = req.params
  // grab the comment from the request body
  const comment = req.body
  try {
    // find the song by id
    const doc = await Song
      .findById(song_id)
      // push the new comment into the existing posts array
    doc.comments.push(comment)
    // re-save the document
    await doc.save()
    // send back the updated document
    res.status(200).send(doc)
  } catch (e) {
    // otherwise pass the error to the error handler
    next(e)
  }
})

module.exports = router
