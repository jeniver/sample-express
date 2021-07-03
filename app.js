const express = require("express")
require("./config/db");
const port = process.env.PORT || 3000

const app = express()

const bodyParser = require("express").json;
app.use(bodyParser());

const cors = require("cors");
app.use(cors());

const UserRouter = require("./services/userServices");

app.use("/auth", UserRouter);

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})