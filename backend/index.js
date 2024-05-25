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
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/maingroups", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM MainGroups");
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
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
