const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.get("/404", (req, res) => {
  res.status(404).send("not found");
});

module.exports = app;
