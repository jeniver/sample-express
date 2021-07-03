const express = require("express")

const port = process.env.PORT || 3000

const app = express()

app.use("*/heartbeat", (req, res) => res.status(200).json({status: 200, message: "I'm fine, Thank you.!"}))

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})