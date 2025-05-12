const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use(morgan("dev"));

// Proxy routes or define routes that talk to microservices here
app.get("/", (req, res) => {
  res.send("API Gateway is running");
});

module.exports = app;
