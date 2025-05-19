const mysql = require("mysql2");
const express = require("express");
var app = express();
const customerRouterApp = require("./routes/customer");

var dbConnectionDetails = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Harsh@2913",
  database: "gst_bill_system",
};

app.use((request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Headers", "*");
  response.setHeader("Access-Control-Allow-Methods", "*");
  response.setHeader("content-type", "application/json");
  next();
});

app.use(express.json());

// GET all employees
app.get("/emps", (request, response) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  connection.connect();
  connection.query("SELECT * FROM Emp", (error, result) => {
    if (error == null) {
      response.json(result);
    } else {
      response.status(500).json(error);
    }
    connection.end();
  });
});

// ADD employee
app.post("/emps", (request, response) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  connection.connect();

  const queryText = "INSERT INTO Emp(Name, Address) VALUES (?, ?)";
  const values = [request.body.name, request.body.address];

  connection.query(queryText, values, (error, result) => {
    if (error == null) {
      response.json({ message: "Employee added", insertId: result.insertId });
    } else {
      response.status(500).json(error);
    }
    connection.end();
  });
});

// UPDATE employee
app.put("/emps/:No", (request, response) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  connection.connect();

  const queryText = "UPDATE Emp SET Name = ?, Address = ? WHERE No = ?";
  const values = [request.body.name, request.body.address, request.params.No];

  connection.query(queryText, values, (error, result) => {
    if (error == null) {
      response.json({ message: "Employee updated", affectedRows: result.affectedRows });
    } else {
      response.status(500).json(error);
    }
    connection.end();
  });
});

// DELETE employee
app.delete("/emps/:No", (request, response) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  connection.connect();

  const queryText = "DELETE FROM Emp WHERE No = ?";
  const values = [request.params.No];

  connection.query(queryText, values, (error, result) => {
    if (error == null) {
      response.json({ message: "Employee deleted", affectedRows: result.affectedRows });
    } else {
      response.status(500).json(error);
    }
    connection.end();
  });
});

app.use("/customer", customerRouterApp);

app.listen(9000, () => {
  console.log("Server started listening at port 9000");
});