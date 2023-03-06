const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connect } = require("mongoose");
const { authenticateRouter } = require("./routes/authenticate");
const { bookRouter } = require("./routes/bookRouter");
const { tokenValidator } = require("./middleware/tokenValidator");

const app = express();

/*Code to connect to MONGODB database*/
dotenv.config();
connect(process.env.MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(cors());
app.use("/auth", authenticateRouter);
app.use("/book", tokenValidator, bookRouter);

/* To listen the port specified in .env file*/
app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Listening port ${process.env.PORT}`);
});
