const express = require("express");
const empRouter = require("./emps");
const app = express.Router();

// Forward all /customer requests to the emps.js router
app.use("/", empRouter);

module.exports = app;