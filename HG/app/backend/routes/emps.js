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

//------------------------User Table------------------------------------------------->
// API's for user table
app.get("/user", (request, response) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  connection.connect();
  connection.query("select * from USER", (error, result) => {
    // console.log(result);
    if (error == null) {
      response.write(JSON.stringify(result));
    } else {
      response.write(JSON.stringify(error));
    }
    connection.end();
    response.end();
  });
});

// post API for user table
app.post("/user", (request, response) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  connection.connect();

  //var queryText = `insert into Emp(Name, Address) values('${name}', '${address}');`;

  var queryText = `insert into user(user_email ,
    password ,
    last_login,
    first_name ,
    last_name ,
    mobile_no) 
                      values('${request.body.user_email}', '${request.body.password}','${request.body.last_login = new Date()}','${request.body.first_name}','${request.body.last_name}','${request.body.mobile_no}');`;

  console.log("query generated is ");
  console.log(queryText);

  connection.query(queryText, (error, result) => {
    // console.log(result);
    if (error == null) {
      response.write(JSON.stringify(result));
    } else {
      response.write(JSON.stringify(error));
    }
    connection.end();
    response.end();
  });
});

//Put API for user table
app.put("/user/:id", (request, response) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  const userId = request.params.id; // Extracting user ID from URL parameter

  var queryText = `UPDATE user SET 
        user_email = '${request.body.user_email}', 
        password = '${request.body.password}', 
        last_login = '${request.body.last_login}', 
        first_name = '${request.body.first_name}', 
        last_name = '${request.body.last_name}', 
        mobile_no = '${request.body.mobile_no}' 
    WHERE id = '${userId}';`;

  console.log("Query generated is: ");
  console.log(queryText);

  connection.connect();
  connection.query(queryText, (error, result) => {
    if (error == null) {
      response.write(
        JSON.stringify({
          message: "User updated successfully",
          affectedRows: result.affectedRows,
        })
      );
    } else {
      response.write(JSON.stringify(error));
    }
    connection.end();
    response.end();
  });
});

//Delete API for user table
app.delete("/user/:id", (request, response) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  const userId = request.params.id; // Extracting user ID from URL parameter

  connection.connect();
  connection.query(
    "DELETE FROM user WHERE id = ?",
    [userId],
    (error, result) => {
      if (error == null) {
        if (result.affectedRows > 0) {
          response.json({
            message: "User deleted successfully",
            affectedRows: result.affectedRows,
          });
        } else {
          response.json({ message: "User not found or already deleted" });
        }
      } else {
        response.json(error);
      }
      connection.end();
    }
  );
});
//------------------------Company Table------------------------------------------------->
// GET API for Company table
app.get("/company", (request, response) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  connection.connect();
  connection.query("select * from company", (error, result) => {
    // console.log(result);
    if (error == null) {
      response.write(JSON.stringify(result));
    } else {
      response.write(JSON.stringify(error));
    }
    connection.end();
    response.end();
  });
});

//Post API for company
app.post("/company", (request, response) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  const queryText = `INSERT INTO company (company_name, country_id, company_address, business_gstno, business_pan, user_id) 
                       VALUES (?, ?, ?, ?, ?, ?)`;

  const values = [
    request.body.company_name,
    request.body.country_id,
    request.body.company_address,
    request.body.business_gstno,
    request.body.business_pan,
    request.body.user_id,
  ];

  connection.connect();
  connection.query(queryText, values, (error, result) => {
    if (error == null) {
      response.json({
        message: "Company added successfully",
        companyId: result.insertId,
      });
    } else {
      response.json(error);
    }
    connection.end();
  });
});

//Put API for company
app.put("/company/:id", (request, response) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  const companyId = request.params.id; // Extract company ID from URL parameter
  const queryText = `UPDATE company SET 
        company_name = ?, 
        country_id = ?, 
        company_address = ?, 
        business_gstno = ?, 
        business_pan = ?, 
        user_id = ? 
    WHERE id = ?`;

  const values = [
    request.body.company_name,
    request.body.country_id,
    request.body.company_address,
    request.body.business_gstno,
    request.body.business_pan,
    request.body.user_id,
    companyId,
  ];

  connection.connect();
  connection.query(queryText, values, (error, result) => {
    if (error == null) {
      if (result.affectedRows > 0) {
        response.json({
          message: "Company updated successfully",
          affectedRows: result.affectedRows,
        });
      } else {
        response.json({ message: "Company not found or no changes made" });
      }
    } else {
      response.json(error);
    }
    connection.end();
  });
});

//Delete API for company
app.delete("/company/:id", (request, response) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  const companyId = request.params.id; // Extract company ID from URL parameter

  connection.connect();
  connection.query(
    "DELETE FROM company WHERE id = ?",
    [companyId],
    (error, result) => {
      if (error == null) {
        if (result.affectedRows > 0) {
          response.json({
            message: "Company deleted successfully",
            affectedRows: result.affectedRows,
          });
        } else {
          response.json({ message: "Company not found or already deleted" });
        }
      } else {
        response.json(error);
      }
      connection.end();
    }
  );
});

//------------------------Country Table------------------------------------------------->
// API's for country table
app.get("/country", (request, response) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  connection.connect();
  connection.query("select * from country", (error, result) => {
    // console.log(result);
    if (error == null) {
      response.write(JSON.stringify(result));
    } else {
      response.write(JSON.stringify(error));
    }
    connection.end();
    response.end();
  });
});

//POST API for country
app.post("/country", (request, response) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  const queryText = `INSERT INTO country (country_name) VALUES (?)`;

  const values = [request.body.country_name];

  connection.connect();
  connection.query(queryText, values, (error, result) => {
    if (error == null) {
      response.json({
        message: "Country added successfully",
        countryId: result.insertId,
      });
    } else {
      response.json(error);
    }
    connection.end();
  });
});

//PUT Api for Country
app.put("/country/:id", (request, response) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  const countryId = request.params.id; // Extract country ID from URL parameter
  const queryText = `UPDATE country SET country_name = ? WHERE id = ?`;

  const values = [request.body.country_name, countryId];

  connection.connect();
  connection.query(queryText, values, (error, result) => {
    if (error == null) {
      if (result.affectedRows > 0) {
        response.json({
          message: "Country updated successfully",
          affectedRows: result.affectedRows,
        });
      } else {
        response.json({ message: "Country not found or no changes made" });
      }
    } else {
      response.json(error);
    }
    connection.end();
  });
});

//Delete API for Country
app.delete("/country/:id", (request, response) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  const countryId = request.params.id;

  connection.connect();
  connection.query(
    "DELETE FROM country WHERE id = ?",
    [countryId],
    (error, result) => {
      if (error == null) {
        response.write(
          JSON.stringify({
            message: "Country deleted successfully",
            affectedRows: result.affectedRows,
          })
        );
      } else {
        response.write(JSON.stringify(error));
      }
      connection.end();
      response.end();
    }
  );
});

//------------------------Invoices Table------------------------------------------------->

//GET API for invoices
app.get("/invoices", (request, response) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  connection.connect();
  connection.query("SELECT * FROM invoices", (error, result) => {
    if (error == null) {
      response.json(result); // Sending retrieved invoice data as JSON
    } else {
      response.json(error); // Sending error response
    }
    connection.end();
  });
});
//POST API for invoices
app.post("/invoices", (request, response) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  const queryText = `INSERT INTO invoices (invoice_no, invoice_date, due_date, company_id) VALUES (?, ?, ?, ?)`;

  const values = [
    request.body.invoice_no,
    request.body.invoice_date,
    request.body.due_date,
    request.body.company_id,
  ];

  connection.connect();
  connection.query(queryText, values, (error, result) => {
    if (error == null) {
      response.json({
        message: "Invoice added successfully",
        invoiceId: result.insertId,
      });
    } else {
      response.json(error);
    }
    connection.end();
  });
});

//PUT API for invoices
app.put("/invoices/:id", (request, response) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  const invoiceId = request.params.id;
  const queryText = `UPDATE invoices SET invoice_no = ?, invoice_date = ?, due_date = ?, company_id = ? WHERE id = ?`;
  const values = [
    request.body.invoice_no,
    request.body.invoice_date,
    request.body.due_date,
    request.body.company_id,
    invoiceId,
  ];
  connection.connect();
  connection.query(queryText, values, (error, result) => {
    if (error == null) {
      if (result.affectedRows > 0) {
        response.json({
          message: "Invoice updated successfully",
          affectedRows: result.affectedRows,
        });
      } else {
        response.json({ message: "Invoice not found or no changes made" });
      }
    } else {
      response.json(error);
    }
    connection.end();
  });
});

//delete API for invoices
app.delete("/invoices/:id", (request, response) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  const invoiceId = request.params.id;
  connection.connect();
  connection.query(
    "DELETE FROM invoices WHERE id = ?",
    [invoiceId],
    (error, result) => {
      if (error == null) {
        if (result.affectedRows > 0) {
          response.json({
            message: "Invoice deleted successfully",
            affectedRows: result.affectedRows,
          });
        } else {
          response.json({ message: "Invoice not found or already deleted" });
        }
      } else {
        response.json(error);
      }
      connection.end();
    }
  );
});

//------------------------Customer Table------------------------------------------------->
//GET API for customer table
app.get("/customers", (request, response) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  connection.connect();
  connection.query("SELECT * FROM customer", (error, result) => {
    if (error == null) {
      response.json(result); // Returning the customer data as JSON
    } else {
      response.json(error); // Sending the error message
    }
    connection.end();
  });
});

//POST API for customer table
app.post("/customers", (request, response) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  const queryText = `INSERT INTO customer (company_name, client_industry, country_id, company_id, category_id, business_gstno, business_pan) 
                       VALUES (?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    request.body.company_name,
    request.body.client_industry,
    request.body.country_id,
    request.body.company_id,
    request.body.category_id,
    request.body.business_gstno,
    request.body.business_pan,
  ];

  connection.connect();
  connection.query(queryText, values, (error, result) => {
    if (error == null) {
      response.json({
        message: "Customer added successfully",
        customerId: result.insertId,
      });
    } else {
      response.json(error);
    }
    connection.end();
  });
});

//PUT API for customer table
app.put("/customers/:id", (request, response) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  const customerId = request.params.id;
  const queryText = `UPDATE customer SET 
        company_name = ?, 
        client_industry = ?, 
        country_id = ?, 
        company_id = ?, 
        category_id = ?, 
        business_gstno = ?, 
        business_pan = ? 
    WHERE id = ?`;

  const values = [
    request.body.company_name,
    request.body.client_industry,
    request.body.country_id,
    request.body.company_id,
    request.body.category_id,
    request.body.business_gstno,
    request.body.business_pan,
    customerId,
  ];

  connection.connect();
  connection.query(queryText, values, (error, result) => {
    if (error == null) {
      if (result.affectedRows > 0) {
        response.json({
          message: "Customer updated successfully",
          affectedRows: result.affectedRows,
        });
      } else {
        response.json({ message: "Customer not found or no changes made" });
      }
    } else {
      response.json(error);
    }
    connection.end();
  });
});

//DELETE API for customer table
app.delete("/customers/:id", (request, response) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  const customerId = request.params.id;

  connection.connect();
  connection.query(
    "DELETE FROM customer WHERE id = ?",
    [customerId],
    (error, result) => {
      if (error == null) {
        if (result.affectedRows > 0) {
          response.json({
            message: "Customer deleted successfully",
            affectedRows: result.affectedRows,
          });
        } else {
          response.json({ message: "Customer not found or already deleted" });
        }
      } else {
        response.json(error);
      }
      connection.end();
    }
  );
});

//------------------------ConfigureTax Table------------------------------------------------->
//GET API for customer table

app.get("/configure_tax", (request, response) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  connection.connect();
  connection.query("SELECT * FROM configure_tax", (error, result) => {
    if (error == null) {
      response.json(result);
    } else {
      response.json(error);
    }
    connection.end();
  });
});

//POST API for ConfigureTax table
app.post("/configure_tax", (request, response) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  const queryText = `INSERT INTO configure_tax (category_id, invoice_id, select_tax_type, gst_type) VALUES (?, ?, ?, ?)`;

  const values = [
    request.body.category_id,
    request.body.invoice_id,
    request.body.select_tax_type,
    request.body.gst_type,
  ];

  connection.connect();
  connection.query(queryText, values, (error, result) => {
    if (error == null) {
      response.json({
        message: "Tax configuration added successfully",
        taxId: result.insertId,
      });
    } else {
      response.json(error);
    }
    connection.end();
  });
});

//PUT API for ConfigureTax table
app.put("/configure_tax/:id", (request, response) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  const taxId = request.params.id; // Extract tax configuration ID from the URL parameter
  const queryText = `UPDATE configure_tax SET 
        category_id = ?, 
        invoice_id = ?, 
        select_tax_type = ?, 
        gst_type = ? 
    WHERE id = ?`;

  const values = [
    request.body.category_id,
    request.body.invoice_id,
    request.body.select_tax_type,
    request.body.gst_type,
    taxId,
  ];

  connection.connect();
  connection.query(queryText, values, (error, result) => {
    if (error == null) {
      if (result.affectedRows > 0) {
        response.json({
          message: "Tax configuration updated successfully",
          affectedRows: result.affectedRows,
        });
      } else {
        response.json({
          message: "Tax configuration not found or no changes made",
        });
      }
    } else {
      response.json(error);
    }
    connection.end();
  });
});

//DELETE API for ConfigureTax table
app.delete("/configure_tax/:id", (request, response) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  const taxId = request.params.id;

  connection.connect();
  connection.query(
    "DELETE FROM configure_tax WHERE id = ?",
    [taxId],
    (error, result) => {
      if (error == null) {
        if (result.affectedRows > 0) {
          response.json({
            message: "Tax configuration deleted successfully",
            affectedRows: result.affectedRows,
          });
        } else {
          response.json({
            message: "Tax configuration not found or already deleted",
          });
        }
      } else {
        response.json(error);
      }
      connection.end();
    }
  );
});

//------------------------Invoice Product Table------------------------------------------------->
//GET API for Invoice Product
app.get("/invoice_product", (request, response) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  connection.connect();
  connection.query("SELECT * FROM invoice_product", (error, result) => {
    if (error == null) {
      response.json(result); // Returning the invoice product data as JSON
    } else {
      response.json(error); // Sending the error message
    }
    connection.end();
  });
});
//POST API for Invoice Product
app.post("/invoice_product", (request, response) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  const {
    invoice_id,
    category_id,
    product_name,
    quantity,
    product_rate,
    amount,
    total,
  } = request.body;

  const query = `
        INSERT INTO invoice_product (invoice_id, category_id, product_name, quantity, product_rate, amount, total) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
  connection.query(
    query,
    [
      invoice_id,
      category_id,
      product_name,
      quantity,
      product_rate,
      amount,
      total,
    ],
    (error, result) => {
      if (error) {
        response.status(500).json({ error: error.message });
      } else {
        response
          .status(201)
          .json({
            message: "Invoice product added successfully",
            productId: result.insertId,
          });
      }
    }
  );
});

//PUT API for Invoice Product
app.put("/invoice_product/:id", (request, response) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  const { id } = request.params;
  const {
    invoice_id,
    category_id,
    product_name,
    quantity,
    product_rate,
    amount,
    total,
  } = request.body;

  const query = `
        UPDATE invoice_product 
        SET invoice_id = ?, category_id = ?, product_name = ?, quantity = ?, product_rate = ?, amount = ?, total = ? 
        WHERE id = ?
    `;

  connection.query(
    query,
    [
      invoice_id,
      category_id,
      product_name,
      quantity,
      product_rate,
      amount,
      total,
      id,
    ],
    (error, result) => {
      if (error) {
        response.status(500).json({ error: error.message });
      } else if (result.affectedRows === 0) {
        response.status(404).json({ message: "Invoice product not found" });
      } else {
        response.json({ message: "Invoice product updated successfully" });
      }
    }
  );
});

//DELETE API for Invoice Product
app.delete("/invoice_product/:id", (request, response) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  const { id } = request.params;
  const query = "DELETE FROM invoice_product WHERE id = ?";

  connection.query(query, [id], (error, result) => {
    if (error) {
      response.status(500).json({ error: error.message });
    } else if (result.affectedRows === 0) {
      response.status(404).json({ message: "Invoice product not found" });
    } else {
      response.json({ message: "Invoice product deleted successfully" });
    }
  });
});

//------------------------category Product Table------------------------------------------------->

//API For Get Category table
app.get("/category", (request, response) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  const query = "SELECT * FROM category";

  connection.query(query, (error, result) => {
    if (error) {
      response.status(500).json({ error: error.message });
    } else {
      response.json(result);
    }
  });
});
//API For POST Category table
app.post("/category", (request, response) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  const { category_name, gst_value } = request.body;
  const query = "INSERT INTO category (category_name, gst_value) VALUES (?, ?)";

  connection.query(query, [category_name, gst_value], (error, result) => {
    if (error) {
      response.status(500).json({ error: error.message });
    } else {
      response
        .status(201)
        .json({
          message: "Category added successfully",
          categoryId: result.insertId,
        });
    }
  });
});
//API For PUT Category table
app.put("/category/:id", (request, response) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  const { id } = request.params;
  const { category_name, gst_value } = request.body;

  const query =
    "UPDATE category SET category_name = ?, gst_value = ? WHERE id = ?";

  connection.query(query, [category_name, gst_value, id], (error, result) => {
    if (error) {
      response.status(500).json({ error: error.message });
    } else if (result.affectedRows === 0) {
      response.status(404).json({ message: "Category not found" });
    } else {
      response.json({ message: "Category updated successfully" });
    }
  });
});

//API For DELETE Category table
app.delete("/category/:id", (request, response) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  const { id } = request.params;
  const query = "DELETE FROM category WHERE id = ?";

  connection.query(query, [id], (error, result) => {
    if (error) {
      response.status(500).json({ error: error.message });
    } else if (result.affectedRows === 0) {
      response.status(404).json({ message: "Category not found" });
    } else {
      response.json({ message: "Category deleted successfully" });
    }
  });
});

app.put("/:No", (request, response) => {
  connection.connect();

  var queryText = `update Emp set Name = '${request.body.name}', 
                                    Address = '${request.body.address}' 
                                    where No = ${request.params.No};`;

  console.log("query generated is ");
  console.log(queryText);

  connection.query(queryText, (error, result) => {
    // console.log(result);
    if (error == null) {
      response.write(JSON.stringify(result));
    } else {
      response.write(JSON.stringify(error));
    }
    connection.end();
    response.end();
  });
});

app.delete("/:No", (request, response) => {
  connection.connect();

  var queryText = `delete from Emp where No = ${request.params.No};`;

  console.log("query generated is ");
  console.log(queryText);

  connection.query(queryText, (error, result) => {
    // console.log(result);
    if (error == null) {
      response.write(JSON.stringify(result));
    } else {
      response.write(JSON.stringify(error));
    }
    connection.end();
    response.end();
  });
});

module.exports = app;
