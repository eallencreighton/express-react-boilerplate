const express = require('express')
const Router = express.Router
const router = Router()
const { Song, Comment } = require('../models/Song')

router.get('/', async (req, res, next) => {
  try {
    const docs = await Song.find()
    res.status(200).send(docs)
  } catch (e) {
    next(e)
  }
})

router.get('/:song_id', async (req, res, next) => {
  try {
    const { song_id } = req.params
    const doc = await Song
      .findById(song_id)
      .populate('user')
      .populate('comments.user')
    res.status(200).send(doc)
  } catch (e) {
    next(e)
  }
})
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

router.post('/', async (req, res, next) => {
  const { title, composer, link, vocabString } = req.body
  const song = new Song({
    title, composer, link, vocabString
  })
  // 2.5 Save the song in the databse
  try {
    // 3. If we're successful, send back (convention) the created song
    const doc = await song.save()
    res.status(201).send({message: 'success', payload: doc})
  } catch (e) {
    // 4. If it fails, handle the error
    next(e) // error handler centralized
  }
})

router.delete('/:id', async (req, res, next) => {
  // change index to id

  // 1. Find a document from the database that matches :id
  try {
    // 2. If it finds a match, delete that todo

    const doc = await Song.findByIdAndRemove({
      _id: req.params.id
    })
    // 3. send back the deleted todo

    res.status(200).send({message: 'success', payload: doc})
  } catch (e) {
    next(e)
  }
})

module.exports = router
