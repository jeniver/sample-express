// mongodb
require("./config/db");

const app = require("express")();
const port = process.env.PORT || 3000;

//cors
const cors = require("cors");
app.use(cors());

// const UserRouter = require("./api/User");
const UserRouter = require("./User")

app.use("*/heartbeat", (req, res) => res.status(200).json({status: 200, message: "I'm fine, Thank you.!"}))


// For accepting post form data
const bodyParser = require("express").json;
app.use(bodyParser());

app.use("*/user", UserRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
