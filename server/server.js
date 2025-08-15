const express = require('express');
const DBCon = require('./config/mongoose.config');
const userRouter = require('./route/user.route');
const app = express();
app.use(express.json())
require('dotenv').config()
const port = process.env.PORT
const cookieParser = require("cookie-parser");

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(cookieParser());

//user
app.use("/user", userRouter)

//un-hnadled routes
app.use((req, res) => {
   res.status(404).json({message:"Route not defined"})
})

DBCon()
app.listen(port, () => {
  console.log(`Library Management app listening on port ${port}`)
})

