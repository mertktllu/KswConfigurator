const express = require("express");
const { sql, poolPromise } = require("./db");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("Email", sql.NVarChar, email)
      .input("Password", sql.NVarChar, password)
      .query("SELECT * FROM Users WHERE Email = @Email AND Password = @Password");

    if (result.recordset.length > 0) {
      const user = result.recordset[0];
      res.json({ success: true, role: user.Role });
    } else {
      res.json({ success: false, message: "Incorrect username or password." });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

app.get("/users", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT UserID, Name FROM Users");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/gattungs", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT GattungID, Name, MainGroupID FROM Gattungs");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/maingroups", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT MainGroupID, Name FROM MainGroups");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/products", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Products");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/types", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Types");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/deleteOption", async (req, res) => {
  const { ProductID, Option } = req.body;

  try {
    const pool = await poolPromise;
    // İlgili product'ı al
    const productResult = await pool
      .request()
      .input("ProductID", sql.Int, ProductID)
      .query("SELECT * FROM Products WHERE ProductID = @ProductID");

    if (productResult.recordset.length === 0) {
      return res.status(404).send("Product not found");
    }

    const product = productResult.recordset[0];
    const options = JSON.parse(product.Options.replace(/'/g, '"'));

    // Seçeneği listeden çıkar
    const updatedOptions = options.filter(opt => opt !== Option);

    // Güncellenmiş seçenekleri veritabanına yaz
    await pool
      .request()
      .input("Options", sql.NVarChar, JSON.stringify(updatedOptions).replace(/"/g, "'"))
      .input("ProductID", sql.Int, ProductID)
      .query("UPDATE Products SET Options = @Options WHERE ProductID = @ProductID");

    res.status(200).send("Option deleted successfully");
  } catch (error) {
    console.error("Error deleting option:", error);
    res.status(500).send("An error occurred while deleting the option");
  }
});


app.get("/datauploadrequests", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM DataUploadRequests");
    res.json(result.recordset);
  } catch (error) {
    console.error("Error fetching data upload requests:", error);
    res.status(500).send("An error occurred while fetching data upload requests.");
  }
});
app.post("/addOption", async (req, res) => {
  const { ProductID, Option } = req.body;

  try {
    const pool = await poolPromise;
    // İlgili product'ı al
    const productResult = await pool
      .request()
      .input("ProductID", sql.Int, ProductID)
      .query("SELECT * FROM Products WHERE ProductID = @ProductID");

    if (productResult.recordset.length === 0) {
      return res.status(404).send("Product not found");
    }

    const product = productResult.recordset[0];
    const options = JSON.parse(product.Options.replace(/'/g, '"'));

    // Yeni seçeneği ekle
    options.push(Option);

    // Güncellenmiş seçenekleri veritabanına yaz
    await pool
      .request()
      .input("Options", sql.NVarChar, JSON.stringify(options).replace(/"/g, "'"))
      .input("ProductID", sql.Int, ProductID)
      .query("UPDATE Products SET Options = @Options WHERE ProductID = @ProductID");

    res.status(201).send("Option added successfully");
  } catch (error) {
    console.error("Error adding option:", error);
    res.status(500).send("An error occurred while adding the option");
  }
});



app.post("/datauploadrequests", async (req, res) => {
  const { UserID, TableName, RequestDetails, RequestStatus, RequestDate, ActionType } = req.body;

  console.log("Received data:", req.body); // Gelen verileri kontrol etmek için

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("UserID", sql.Int, UserID)
      .input("TableName", sql.NVarChar, TableName)
      .input("RequestDetails", sql.NVarChar, RequestDetails)
      .input("RequestStatus", sql.Bit, RequestStatus)
      .input("RequestDate", sql.DateTime, RequestDate)
      .input("ActionType", sql.NVarChar, ActionType)
      .query("INSERT INTO DataUploadRequests (UserID, TableName, RequestDetails, RequestStatus, RequestDate, ActionType) VALUES (@UserID, @TableName, @RequestDetails, @RequestStatus, @RequestDate, @ActionType)");

    res.status(201).send("Data upload request created successfully.");
  } catch (error) {
    console.error("Error creating data upload request:", error);
    res.status(500).send("An error occurred while creating the data upload request.");
  }
});


app.put("/datauploadrequests/:id", async (req, res) => {
  const { id } = req.params;
  const { RequestStatus } = req.body; 

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("ID", sql.Int, id)
      .input("RequestStatus", sql.Int, RequestStatus) // Ensure this is sql.Int
      .query("UPDATE DataUploadRequests SET RequestStatus = @RequestStatus WHERE RequestID = @ID");

    if (result.rowsAffected[0] > 0) {
      res.send("Data upload request updated successfully.");
    } else {
      res.status(404).send("Request not found.");
    }
  } catch (error) {
    console.error("Error updating data upload request:", error);
    res.status(500).send("An error occurred while updating the data upload request.");
  }
});
app.delete("/datauploadrequests/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await poolPromise;
    const result = await pool.request().input("ID", sql.Int, id).query("DELETE FROM DataUploadRequests WHERE RequestID = @ID");

    res.send("Data upload request deleted successfully.");
  } catch (error) {
    console.error("Error deleting data upload request:", error);
    res.status(500).send("An error occurred while deleting the data upload request.");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
app.post("/approveRequest/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("RequestID", sql.Int, id)
      .query("SELECT * FROM DataUploadRequests WHERE RequestID = @RequestID");

    if (result.recordset.length === 0) {
      return res.status(404).send("Request not found");
    }

    const request = result.recordset[0];
    const { ActionType, RequestDetails } = request;

    // İlgili tabloyu ve işlemi belirleyin
    let query = "";
    if (ActionType === "Add MainGroup") {
      const details = RequestDetails.match(/Details: (.*)/)[1];
      query = `INSERT INTO MainGroups (Name) VALUES ('${details}')`;
    } else if (ActionType === "Delete MainGroup") {
      const mainGroupId = RequestDetails.match(/MainGroupID: (\d+)/)[1];
      query = `DELETE FROM MainGroups WHERE MainGroupID = ${mainGroupId}`;
    } else if (ActionType === "Edit MainGroup") {
      const mainGroupId = RequestDetails.match(/MainGroupID: (\d+)/)[1];
      const newName = RequestDetails.match(/New Name: (.*)/)[1];
      query = `UPDATE MainGroups SET Name = '${newName}' WHERE MainGroupID = ${mainGroupId}`;
    } else if (ActionType === "Add Gattung") {
      const details = RequestDetails.match(/Details: (.*)/)[1];
      const mainGroupId = request.MainGroupID;
      query = `INSERT INTO Gattungs (Name, MainGroupID) VALUES ('${details}', ${mainGroupId})`;
    } else if (ActionType === "Delete Gattung") {
      const gattungId = RequestDetails.match(/GattungID: (\d+)/)[1];
      query = `DELETE FROM Gattungs WHERE GattungID = ${gattungId}`;
    } else if (ActionType === "Edit Gattung") {
      const gattungId = RequestDetails.match(/GattungID: (\d+)/)[1];
      const newName = RequestDetails.match(/New Name: (.*)/)[1];
      query = `UPDATE Gattungs SET Name = '${newName}' WHERE GattungID = ${gattungId}`;
    }

    // İşlemi veritabanında gerçekleştirin
    if (query) {
      await pool.request().query(query);

      // İsteği onaylanmış olarak güncelleyin
      await pool
        .request()
        .input("RequestID", sql.Int, id)
        .query("UPDATE DataUploadRequests SET RequestStatus = 1 WHERE RequestID = @RequestID");

      return res.send("Request approved and applied successfully");
    } else {
      return res.status(400).send("Invalid action type");
    }
  } catch (error) {
    console.error("Error approving request:", error);
    return res.status(500).send("An error occurred while approving the request");
  }
});