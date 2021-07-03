const express = require("express")

const port = 4000

const app = express()

app.use("*/heartbeat", (req, res) => res.status(200).json({status: 200, message: "I'm fine, Thank you.!"}))

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})