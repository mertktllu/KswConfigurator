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
      .query(
        "SELECT * FROM Users WHERE Email = @Email AND Password = @Password"
      );

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

// New GET endpoint to fetch Gattung information
app.get("/gattungs", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Gattungs");
    res.json(result.recordset);
    console.log("Gattungg");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/maingroups", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM MainGroups");
    res.json(result.recordset);
    console.log("MainGroup");
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
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get all requests.
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

app.get("/datauploadrequests/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await poolPromise;
    const result = await pool.request().input("ID", sql.Int, id).query("SELECT * FROM DataUploadRequests WHERE ID = @ID");

    if (result.recordset.length > 0) {
      res.json(result.recordset[0]);
    } else {
      res.status(404).send("Request not found.");
    }
  } catch (error) {
    console.error("Error fetching data upload request:", error);
    res.status(500).send("An error occurred while fetching the data upload request.");
  }
});

app.post("/datauploadrequests", async (req, res) => {
  const { UserID, Description, RequestStatus, RequestDate } = req.body;

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("UserID", sql.Int, UserID)
      .input("Description", sql.NVarChar, Description)
      .input("RequestStatus", sql.Bit, RequestStatus)
      .input("RequestDate", sql.DateTime, RequestDate)
      .query("INSERT INTO DataUploadRequests (UserID, Description, RequestStatus, RequestDate) VALUES (@UserID, @Description, @RequestStatus, @RequestDate)");

    res.status(201).send("Data upload request created successfully.");
  } catch (error) {
    console.error("Error creating data upload request:", error);
    res.status(500).send("An error occurred while creating the data upload request.");
  }
});

app.put("/datauploadrequests/:id", async (req, res) => {
  const { id } = req.params;
  const { UserID, Description, RequestStatus, RequestDate } = req.body;

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("ID", sql.Int, id)
      .input("UserID", sql.Int, UserID)
      .input("Description", sql.NVarChar, Description)
      .input("RequestStatus", sql.Bit, RequestStatus)
      .input("RequestDate", sql.DateTime, RequestDate)
      .query("UPDATE DataUploadRequests SET UserID = @UserID, Description = @Description, RequestStatus = @RequestStatus, RequestDate = @RequestDate WHERE ID = @ID");

    res.send("Data upload request updated successfully.");
  } catch (error) {
    console.error("Error updating data upload request:", error);
    res.status(500).send("An error occurred while updating the data upload request.");
  }
});

app.delete("/datauploadrequests/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await poolPromise;
    const result = await pool.request().input("ID", sql.Int, id).query("DELETE FROM DataUploadRequests WHERE ID = @ID");

    res.send("Data upload request deleted successfully.");
  } catch (error) {
    console.error("Error deleting data upload request:", error);
    res.status(500).send("An error occurred while deleting the data upload request.");
  }
});






app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
