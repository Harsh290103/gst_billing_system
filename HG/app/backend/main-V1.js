const express = require('express');
var app = express();

app.use((request, response, next)=>
{
    //Cors code
    response.setHeader("Access-Control-Allow-Origin", "*")
    response.setHeader("Access-Control-Allow-Headers", "*")
    response.setHeader("Access-Control-Allow-Methods", "*")
    response.setHeader("content-type","application/json");
    next();
});

app.get("/emps",(request, response)=>
{
    response.send("GET Request Processed!")
});
app.post("/emps",(request, response)=>
{
    response.send("POST Request Processed!")
});
app.put("/emps",(request, response)=>
{
    response.send("PUT Request Processed!")
});
app.delete("/emps",(request, response)=>
{
    response.send("DELETE Request Processed!")
});

app.listen(9000, ()=>{console.log("Server started listening at port 9000")})