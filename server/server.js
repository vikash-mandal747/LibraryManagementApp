const express = require('express');
const DBCon = require('./config/mongoose.config');
const app = express();
require('dotenv').config()
const port = process.env.PORT

app.get('/', (req, res) => {
  res.send('Hello World!')
})

DBCon()
app.listen(port, () => {
  console.log(`Library Management app listening on port ${port}`)
})

