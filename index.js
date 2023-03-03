const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv"); //Mongodb connection string from .env file
const { connect } = require("mongoose");

const app = express();

/*Code to connect to MONGODB database*/
dotenv.config();
connect(
  process.env.MONGODB_CONNECTION_STRING,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Database connection established");
  }
);

app.use(express.json());
app.use(cors());
