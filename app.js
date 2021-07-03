const express = require("express")
require('dotenv').config();
const port = process.env.PORT || 3000

const app = express()

app.use("*/heartbeat", (req, res) => res.status(200).json({status: 200, message: "I'm fine, Thank you.!"}))
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => console.log(err));

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})