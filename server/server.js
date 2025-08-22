const express = require('express');
const DBCon = require('./config/mongoose.config');
const userRouter = require('./route/users.route');
const app = express();
app.use(express.json())
require('dotenv').config()
const port = process.env.PORT
const cookieParser = require("cookie-parser");
const BookRouter = require('./route/books.route');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(cookieParser());

//users
app.use("/user", userRouter)

//books
app.use("/books", BookRouter)

//un-hnadled routes
app.use((req, res) => {
   res.status(404).json({message:"Route not defined"})
})


app.listen(port, async() => {
  await DBCon()
  console.log(`Library Management app listening on port ${port}`)
})

