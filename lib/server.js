const express = require('express')
const app = express()
const PORT = 8282

app.get('/healthcheck', (req, res) => {
  res.status(200).json({message: 'successsss'})
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
