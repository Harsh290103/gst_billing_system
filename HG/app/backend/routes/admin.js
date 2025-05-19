const express = require('express');
var app = express.Router();

app.get("/", (request, response)=>{response.send ("GET for Admin called.")});
app.post("/", (request, response)=>{response.send ("POST for Admin called.")});
app.put("/", (request, response)=>{response.send ("PUT for Admin called.")});
app.delete("/", (request, response)=>{response.send ("Delete for Admin called.")});


module.exports = app;