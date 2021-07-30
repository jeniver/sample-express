
const mongoose = require("mongoose");

const MOGODB_EV = "mongodb+srv://jeniverjoy:joy123450@cluster0.hwsed.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose
  .connect(MOGODB_EV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
  })
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => console.log(err));