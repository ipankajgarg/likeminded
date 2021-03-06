const express = require("express");
const expressGraphql = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const { errorType } = require("./constants/errors");
const cors = require("cors");

const app = express();

app.use(cors());

mongoose.connect(
  "mongodb://pankaj:pankaj123@ds151997.mlab.com:51997/likeminded",
  { useNewUrlParser: true }
);
mongoose.connection
  .once("open", () => console.log("Connected to MongoLab instance."))
  .on("error", error => console.log("Error connecting to MongoLab:", error));

app.get("/", function(req, res) {
  res.send("hello world");
});

app.use(
  "/graphql",
  expressGraphql({
    schema,

    graphiql: true,
    customFormatErrorFn: ({ message }) => {
      return errorType[message];
    }
  })
);

app.listen("4000", function() {
  console.log("4000 PORT is busy now");
});
