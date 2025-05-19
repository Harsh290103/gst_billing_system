const express = require('express');
const adminRouterApp = require('./routes/admin');
const empRouterApp = require('./routes/emps');
const customerRouterApp = require('./routes/customer');

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

app.use(express.json());  

app.use("/admin", adminRouterApp);
app.use("/emps", empRouterApp);
app.use("/customer", customerRouterApp);

app.listen(9000, ()=>{console.log("Server started listening at port 9000")})