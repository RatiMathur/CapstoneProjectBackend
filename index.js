const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");
const { Mongoose, default: mongoose } = require("mongoose");
const { authenticateRouter } = require("./routes/authenticate");
const { bookRouter } = require("./routes/bookRouter");
const { tokenValidator } = require("./middleware/tokenValidator");

const app = express();

/*Code to connect to MONGODB database*/
dotenv.config();
const url =
  "mongodb+srv://admin:admin123@cluster0.9ybumbj.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("database connected"));

app.use(express.json());
app.use(cors());
app.use("/auth", authenticateRouter);
app.use("/books", tokenValidator, bookRouter);

/* To listen the port specified in .env file*/
app.listen(8000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Listening port 8000`);
});
