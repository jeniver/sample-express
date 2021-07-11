const express = require("express");

require("./config/db");
const port = process.env.PORT || 3000

const app = express()


const bodyParser = require("express").json;
app.use(bodyParser());

const cors = require("cors");
app.use(cors());

app.use(express.urlencoded({extended : false}));

const UserRouter = require("./route/index");

app.use("/auth", UserRouter);

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})




