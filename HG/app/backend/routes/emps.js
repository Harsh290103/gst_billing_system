const mysql = require("mysql2");
const express = require("express");
var app = express.Router();

var dbConnectionDetails = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Harsh@2913",
  database: "gst_bill_system",
};

//------------------------User Table-------------------------------

// GET all users
app.get("/user", (req, res) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  connection.connect();
  connection.query("SELECT * FROM user", (error, result) => {
    if (error) res.status(500).json({ error: error.message });
    else res.json(result);
    connection.end();
  });
});

// POST user
app.post("/user", (req, res) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  connection.connect();
  const query = `INSERT INTO user (user_email, password, last_login, first_name, last_name, mobile_no) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [
    req.body.user_email,
    req.body.password,
    new Date(),
    req.body.first_name,
    req.body.last_name,
    req.body.mobile_no,
  ];
  connection.query(query, values, (error, result) => {
    if (error) res.status(500).json({ error: error.message });
    else res.json({ message: "User added successfully", userId: result.insertId });
    connection.end();
  });
});

// PUT user
app.put("/user/:id", (req, res) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  connection.connect();
  const query = `UPDATE user SET user_email = ?, password = ?, last_login = ?, first_name = ?, last_name = ?, mobile_no = ? WHERE id = ?`;
  const values = [
    req.body.user_email,
    req.body.password,
    req.body.last_login,
    req.body.first_name,
    req.body.last_name,
    req.body.mobile_no,
    req.params.id,
  ];
  connection.query(query, values, (error, result) => {
    if (error) res.status(500).json({ error: error.message });
    else if (result.affectedRows === 0) res.status(404).json({ message: "User not found" });
    else res.json({ message: "User updated successfully" });
    connection.end();
  });
});

// DELETE user
app.delete("/user/:id", (req, res) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  connection.connect();
  connection.query("DELETE FROM user WHERE id = ?", [req.params.id], (error, result) => {
    if (error) res.status(500).json({ error: error.message });
    else if (result.affectedRows === 0) res.status(404).json({ message: "User not found or already deleted" });
    else res.json({ message: "User deleted successfully" });
    connection.end();
  });
});

//------------------------Company Table-------------------------------

// GET all companies
app.get("/company", (req, res) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  connection.connect();
  connection.query("SELECT * FROM company", (error, result) => {
    if (error) res.status(500).json({ error: error.message });
    else res.json(result);
    connection.end();
  });
});

// POST company
app.post("/company", (req, res) => {
  console.log("Company POST body:", req.body); // <-- Add this line
  const connection = mysql.createConnection(dbConnectionDetails);
  connection.connect();
  const query = `INSERT INTO company (company_name, country_id, company_address, business_gstno, business_pan, user_id) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [
    req.body.company_name,
    req.body.country_id,
    req.body.company_address,
    req.body.business_gstno,
    req.body.business_pan,
    req.body.user_id,
  ];
  connection.query(query, values, (error, result) => {
    if (error) {
      console.error("Company insert error:", error); // <-- Add this line
      res.status(500).json({ error: error.message });
    } else {
      res.json({ message: "Company added successfully", companyId: result.insertId });
    }
    connection.end();
  });
});

// PUT company
app.put("/company/:id", (req, res) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  connection.connect();
  const query = `UPDATE company SET company_name = ?, country_id = ?, company_address = ?, business_gstno = ?, business_pan = ?, user_id = ? WHERE id = ?`;
  const values = [
    req.body.company_name,
    req.body.country_id,
    req.body.company_address,
    req.body.business_gstno,
    req.body.business_pan,
    req.body.user_id,
    req.params.id,
  ];
  connection.query(query, values, (error, result) => {
    if (error) res.status(500).json({ error: error.message });
    else if (result.affectedRows === 0) res.status(404).json({ message: "Company not found or no changes made" });
    else res.json({ message: "Company updated successfully" });
    connection.end();
  });
});

// DELETE company
app.delete("/company/:id", (req, res) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  connection.connect();
  connection.query("DELETE FROM company WHERE id = ?", [req.params.id], (error, result) => {
    if (error) res.status(500).json({ error: error.message });
    else if (result.affectedRows === 0) res.status(404).json({ message: "Company not found or already deleted" });
    else res.json({ message: "Company deleted successfully" });
    connection.end();
  });
});

//------------------------Country Table-------------------------------

// GET all countries
app.get("/country", (req, res) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  connection.connect();
  connection.query("SELECT * FROM country", (error, result) => {
    if (error) res.status(500).json({ error: error.message });
    else res.json(result);
    connection.end();
  });
});

// POST country
app.post("/country", (req, res) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  connection.connect();
  const query = `INSERT INTO country (country_name) VALUES (?)`;
  connection.query(query, [req.body.country_name], (error, result) => {
    if (error) res.status(500).json({ error: error.message });
    else res.json({ message: "Country added successfully", countryId: result.insertId });
    connection.end();
  });
});

// PUT country
app.put("/country/:id", (req, res) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  connection.connect();
  const query = `UPDATE country SET country_name = ? WHERE id = ?`;
  connection.query(query, [req.body.country_name, req.params.id], (error, result) => {
    if (error) res.status(500).json({ error: error.message });
    else if (result.affectedRows === 0) res.status(404).json({ message: "Country not found or no changes made" });
    else res.json({ message: "Country updated successfully" });
    connection.end();
  });
});

// DELETE country
app.delete("/country/:id", (req, res) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  connection.connect();
  connection.query("DELETE FROM country WHERE id = ?", [req.params.id], (error, result) => {
    if (error) res.status(500).json({ error: error.message });
    else if (result.affectedRows === 0) res.status(404).json({ message: "Country not found or already deleted" });
    else res.json({ message: "Country deleted successfully" });
    connection.end();
  });
});

//------------------------Invoices Table-------------------------------

// GET all invoices
app.get("/invoices", (req, res) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  connection.connect();
  connection.query("SELECT * FROM invoices", (error, result) => {
    if (error) res.status(500).json({ error: error.message });
    else res.json(result);
    connection.end();
  });
});

// POST invoice
app.post("/invoices", (req, res) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  connection.connect();
  const query = `INSERT INTO invoices (invoice_no, invoice_date, due_date, company_id) VALUES (?, ?, ?, ?)`;
  const values = [
    req.body.invoice_no,
    req.body.invoice_date,
    req.body.due_date,
    req.body.company_id,
  ];
  connection.query(query, values, (error, result) => {
    if (error) res.status(500).json({ error: error.message });
    else res.json({ message: "Invoice added successfully", invoiceId: result.insertId });
    connection.end();
  });
});

// PUT invoice
app.put("/invoices/:id", (req, res) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  connection.connect();
  const query = `UPDATE invoices SET invoice_no = ?, invoice_date = ?, due_date = ?, company_id = ? WHERE id = ?`;
  const values = [
    req.body.invoice_no,
    req.body.invoice_date,
    req.body.due_date,
    req.body.company_id,
    req.params.id,
  ];
  connection.query(query, values, (error, result) => {
    if (error) res.status(500).json({ error: error.message });
    else if (result.affectedRows === 0) res.status(404).json({ message: "Invoice not found or no changes made" });
    else res.json({ message: "Invoice updated successfully" });
    connection.end();
  });
});

// DELETE invoice
app.delete("/invoices/:id", (req, res) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  connection.connect();
  connection.query("DELETE FROM invoices WHERE id = ?", [req.params.id], (error, result) => {
    if (error) res.status(500).json({ error: error.message });
    else if (result.affectedRows === 0) res.status(404).json({ message: "Invoice not found or already deleted" });
    else res.json({ message: "Invoice deleted successfully" });
    connection.end();
  });
});

//------------------------Customer Table-------------------------------

// GET all customers
app.get("/customers", (req, res) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  connection.connect();
  connection.query("SELECT * FROM customer", (error, result) => {
    if (error) res.status(500).json({ error: error.message });
    else res.json(result);
    connection.end();
  });
});

// POST customer
app.post("/customers", (req, res) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  connection.connect();
  const query = `INSERT INTO customer (company_name, client_industry, country_id, company_id, category_id, business_gstno, business_pan) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    req.body.company_name,
    req.body.client_industry,
    req.body.country_id,
    req.body.company_id,
    req.body.category_id,
    req.body.business_gstno,
    req.body.business_pan,
  ];
  connection.query(query, values, (error, result) => {
    if (error) res.status(500).json({ error: error.message });
    else res.json({ message: "Customer added successfully", customerId: result.insertId });
    connection.end();
  });
});

// PUT customer
app.put("/customers/:id", (req, res) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  connection.connect();
  const query = `UPDATE customer SET company_name = ?, client_industry = ?, country_id = ?, company_id = ?, category_id = ?, business_gstno = ?, business_pan = ? WHERE id = ?`;
  const values = [
    req.body.company_name,
    req.body.client_industry,
    req.body.country_id,
    req.body.company_id,
    req.body.category_id,
    req.body.business_gstno,
    req.body.business_pan,
    req.params.id,
  ];
  connection.query(query, values, (error, result) => {
    if (error) res.status(500).json({ error: error.message });
    else if (result.affectedRows === 0) res.status(404).json({ message: "Customer not found or no changes made" });
    else res.json({ message: "Customer updated successfully" });
    connection.end();
  });
});

// DELETE customer
app.delete("/customers/:id", (req, res) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  connection.connect();
  connection.query("DELETE FROM customer WHERE id = ?", [req.params.id], (error, result) => {
    if (error) res.status(500).json({ error: error.message });
    else if (result.affectedRows === 0) res.status(404).json({ message: "Customer not found or already deleted" });
    else res.json({ message: "Customer deleted successfully" });
    connection.end();
  });
});

//------------------------ConfigureTax Table-------------------------------

// GET all configure_tax
app.get("/configure_tax", (req, res) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  connection.connect();
  connection.query("SELECT * FROM configure_tax", (error, result) => {
    if (error) res.status(500).json({ error: error.message });
    else res.json(result);
    connection.end();
  });
});

// POST configure_tax
app.post("/configure_tax", (req, res) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  connection.connect();
  const query = `INSERT INTO configure_tax (category_id, invoice_id, select_tax_type, gst_type) VALUES (?, ?, ?, ?)`;
  const values = [
    req.body.category_id,
    req.body.invoice_id,
    req.body.select_tax_type,
    req.body.gst_type,
  ];
  connection.query(query, values, (error, result) => {
    if (error) res.status(500).json({ error: error.message });
    else res.json({ message: "Tax configuration added successfully", taxId: result.insertId });
    connection.end();
  });
});

// PUT configure_tax
app.put("/configure_tax/:id", (req, res) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  connection.connect();
  const query = `UPDATE configure_tax SET category_id = ?, invoice_id = ?, select_tax_type = ?, gst_type = ? WHERE id = ?`;
  const values = [
    req.body.category_id,
    req.body.invoice_id,
    req.body.select_tax_type,
    req.body.gst_type,
    req.params.id,
  ];
  connection.query(query, values, (error, result) => {
    if (error) res.status(500).json({ error: error.message });
    else if (result.affectedRows === 0) res.status(404).json({ message: "Tax configuration not found or no changes made" });
    else res.json({ message: "Tax configuration updated successfully" });
    connection.end();
  });
});

// DELETE configure_tax
app.delete("/configure_tax/:id", (req, res) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  connection.connect();
  connection.query("DELETE FROM configure_tax WHERE id = ?", [req.params.id], (error, result) => {
    if (error) res.status(500).json({ error: error.message });
    else if (result.affectedRows === 0) res.status(404).json({ message: "Tax configuration not found or already deleted" });
    else res.json({ message: "Tax configuration deleted successfully" });
    connection.end();
  });
});

//------------------------Invoice Product Table-------------------------------

// GET all invoice_product
app.get("/invoice_product", (req, res) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  connection.connect();
  connection.query("SELECT * FROM invoice_product", (error, result) => {
    if (error) res.status(500).json({ error: error.message });
    else res.json(result);
    connection.end();
  });
});

// POST invoice_product
app.post("/invoice_product", (req, res) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  connection.connect();
  const query = `INSERT INTO invoice_product (invoice_id, category_id, product_name, quantity, product_rate, amount, total) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    req.body.invoice_id,
    req.body.category_id,
    req.body.product_name,
    req.body.quantity,
    req.body.product_rate,
    req.body.amount,
    req.body.total,
  ];
  connection.query(query, values, (error, result) => {
    if (error) res.status(500).json({ error: error.message });
    else res.status(201).json({ message: "Invoice product added successfully", productId: result.insertId });
    connection.end();
  });
});

// PUT invoice_product
app.put("/invoice_product/:id", (req, res) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  connection.connect();
  const query = `UPDATE invoice_product SET invoice_id = ?, category_id = ?, product_name = ?, quantity = ?, product_rate = ?, amount = ?, total = ? WHERE id = ?`;
  const values = [
    req.body.invoice_id,
    req.body.category_id,
    req.body.product_name,
    req.body.quantity,
    req.body.product_rate,
    req.body.amount,
    req.body.total,
    req.params.id,
  ];
  connection.query(query, values, (error, result) => {
    if (error) res.status(500).json({ error: error.message });
    else if (result.affectedRows === 0) res.status(404).json({ message: "Invoice product not found" });
    else res.json({ message: "Invoice product updated successfully" });
    connection.end();
  });
});

// DELETE invoice_product
app.delete("/invoice_product/:id", (req, res) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  connection.connect();
  connection.query("DELETE FROM invoice_product WHERE id = ?", [req.params.id], (error, result) => {
    if (error) res.status(500).json({ error: error.message });
    else if (result.affectedRows === 0) res.status(404).json({ message: "Invoice product not found" });
    else res.json({ message: "Invoice product deleted successfully" });
    connection.end();
  });
});

//------------------------Category Table-------------------------------

// GET all categories
app.get("/category", (req, res) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  connection.connect();
  connection.query("SELECT * FROM category", (error, result) => {
    if (error) res.status(500).json({ error: error.message });
    else res.json(result);
    connection.end();
  });
});

// POST category
app.post("/category", (req, res) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  connection.connect();
  const query = "INSERT INTO category (category_name, gst_value) VALUES (?, ?)";
  connection.query(query, [req.body.category_name, req.body.gst_value], (error, result) => {
    if (error) res.status(500).json({ error: error.message });
    else res.status(201).json({ message: "Category added successfully", categoryId: result.insertId });
    connection.end();
  });
});

// PUT category
app.put("/category/:id", (req, res) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  connection.connect();
  const query = "UPDATE category SET category_name = ?, gst_value = ? WHERE id = ?";
  connection.query(query, [req.body.category_name, req.body.gst_value, req.params.id], (error, result) => {
    if (error) res.status(500).json({ error: error.message });
    else if (result.affectedRows === 0) res.status(404).json({ message: "Category not found" });
    else res.json({ message: "Category updated successfully" });
    connection.end();
  });
});

// DELETE category
app.delete("/category/:id", (req, res) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  connection.connect();
  connection.query("DELETE FROM category WHERE id = ?", [req.params.id], (error, result) => {
    if (error) res.status(500).json({ error: error.message });
    else if (result.affectedRows === 0) res.status(404).json({ message: "Category not found" });
    else res.json({ message: "Category deleted successfully" });
    connection.end();
  });
});

module.exports = app;