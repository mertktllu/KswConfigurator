const express = require('express');
const path = require('path');
const app = express();

const db = require('./db'); // db.js dosyasını burada kullanıyoruz
require('dotenv').config();
// CORS ayarları
const cors = require('cors');
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.post('/maingroups', async (req, res) => {
  const { name } = req.body;
  try {
    const result = await db.query('INSERT INTO MainGroups (Name) VALUES ($1) RETURNING *', [name]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding main group', err.stack);
    res.status(500).send('Error adding main group');
  }
});
app.get('/test-db', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.json(result.rows);
  } catch (err) {
    console.error('Database connection error', err.stack);
    res.status(500).send('Database connection error');
  }
});














app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login request received:', { email, password });

  try {
    const result = await db.query(
      'SELECT * FROM Users WHERE Email = $1 AND Password = $2',
      [email, password]
    );

    console.log('Database query result:', result.rows);

    if (result.rows.length > 0) {
      const user = result.rows[0];
      console.log('User found:', user);
      res.json({ success: true, role: user.role.trim() }); // Boşlukları kaldırarak rol döndür
    } else {
      console.log('Incorrect username or password');
      res.json({ success: false, message: 'Incorrect username or password.' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.json({ success: false, message: error.message });
  }
});


app.get("/users", async (req, res) => {
  try {
    const result = await db.query("SELECT UserID, Name FROM Users");
    res.json(result.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/gattungs", async (req, res) => {
  try {
    const result = await db.query("SELECT GattungID, Name, MainGroupID FROM Gattungs");
    res.json(result.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.get('/maingroups', async (req, res) => {
  console.log('Fetching main groups...');
  try {
    const result = await db.query('SELECT MainGroupID, Name FROM MainGroups');
    console.log('Query result:', result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching main groups:', error);
    res.status(500).send(error.message);
  }
});


app.get("/products", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM Products");
    res.json(result.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/products/byMainGroup/:mainGroupId", async (req, res) => {
  const { mainGroupId } = req.params;

  try {
    const result = await db.query(
      "SELECT * FROM Products WHERE MainGroupID = $1",
      [mainGroupId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/types", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM Types");
    res.json(result.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/deleteOption", async (req, res) => {
  const { ProductID, Option } = req.body;

  try {
    const productResult = await db.query("SELECT * FROM Products WHERE ProductID = $1", [ProductID]);

    if (productResult.rows.length === 0) {
      return res.status(404).send("Product not found");
    }

    const product = productResult.rows[0];
    const options = JSON.parse(product.options.replace(/'/g, '"'));

    // Seçeneği listeden çıkar
    const updatedOptions = options.filter((opt) => opt !== Option);

    // Güncellenmiş seçenekleri veritabanına yaz
    await db.query("UPDATE Products SET Options = $1 WHERE ProductID = $2", [
      JSON.stringify(updatedOptions).replace(/"/g, "'"),
      ProductID,
    ]);

    res.status(200).send("Option deleted successfully");
  } catch (error) {
    console.error("Error deleting option:", error);
    res.status(500).send("An error occurred while deleting the option");
  }
});

app.get("/datauploadrequests", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM DataUploadRequests");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching data upload requests:", error);
    res
      .status(500)
      .send("An error occurred while fetching data upload requests.");
  }
});

app.post("/addOption", async (req, res) => {
  const { ProductID, Option } = req.body;

  try {
    const productResult = await db.query("SELECT * FROM Products WHERE ProductID = $1", [ProductID]);

    if (productResult.rows.length === 0) {
      return res.status(404).send("Product not found");
    }

    const product = productResult.rows[0];
    const options = JSON.parse(product.options.replace(/'/g, '"'));

    // Yeni seçeneği ekle
    options.push(Option);

    // Güncellenmiş seçenekleri veritabanına yaz
    await db.query("UPDATE Products SET Options = $1 WHERE ProductID = $2", [
      JSON.stringify(options).replace(/"/g, "'"),
      ProductID,
    ]);

    res.status(201).send("Option added successfully");
  } catch (error) {
    console.error("Error adding option:", error);
    res.status(500).send("An error occurred while adding the option");
  }
});

app.post("/datauploadrequests", async (req, res) => {
  const {
    UserID,
    TableName,
    RequestDetails,
    RequestStatus,
    RequestDate,
    ActionType,
  } = req.body;

  console.log("Received data:", req.body);

  try {
    await db.query(
      "INSERT INTO DataUploadRequests (UserID, TableName, RequestDetails, RequestStatus, RequestDate, ActionType) VALUES ($1, $2, $3, $4, $5, $6)",
      [UserID, TableName, RequestDetails, RequestStatus, RequestDate, ActionType]
    );

    res.status(201).send("Data upload request created successfully.");
  } catch (error) {
    console.error("Error creating data upload request:", error);
    res
      .status(500)
      .send("An error occurred while creating the data upload request.");
  }
});

app.put("/datauploadrequests/:id", async (req, res) => {
  const { id } = req.params;
  const { requeststatus } = req.body;

  try {
    const result = await db.query(
      "UPDATE DataUploadRequests SET requeststatus = $1 WHERE requestid = $2",
      [requeststatus, id]
    );

    if (result.rowCount > 0) {
      res.send("Data upload request updated successfully.");
    } else {
      res.status(404).send("Request not found.");
    }
  } catch (error) {
    console.error("Error updating data upload request:", error);
    res
      .status(500)
      .send("An error occurred while updating the data upload request.");
  }
});

app.delete("/datauploadrequests/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM DataUploadRequests WHERE RequestID = $1", [id]);

    res.send("Data upload request deleted successfully.");
  } catch (error) {
    console.error("Error deleting data upload request:", error);
    res
      .status(500)
      .send("An error occurred while deleting the data upload request.");
  }
});

app.post("/approveRequest/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query("SELECT * FROM DataUploadRequests WHERE RequestID = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).send("Request not found");
    }

    const request = result.rows[0];
    const { ActionType, RequestDetails } = request;

    if (!RequestDetails) {
      return res.status(400).send("RequestDetails is undefined or null");
    }

    let query = "";
    let inputs = [];

    switch (ActionType) {
      case "Add MainGroup":
        const addDetailsMatch = RequestDetails.match(/Details: (.*)/);
        if (addDetailsMatch && addDetailsMatch[1]) {
          const details = addDetailsMatch[1];
          query = `INSERT INTO MainGroups (Name, Value) VALUES ($1, $1)`;
          inputs = [details];
        } else {
          return res
            .status(400)
            .send("Invalid Details format for Add MainGroup");
        }
        break;

      case "Delete MainGroup":
        const deleteMainGroupIdMatch =
          RequestDetails.match(/MainGroupID: (\d+)/);
        if (deleteMainGroupIdMatch && deleteMainGroupIdMatch[1]) {
          const mainGroupId = deleteMainGroupIdMatch[1];
          query = `DELETE FROM MainGroups WHERE MainGroupID = $1`;
          inputs = [mainGroupId];
        } else {
          return res
            .status(400)
            .send("Invalid MainGroupID format for Delete MainGroup");
        }
        break;

      case "Edit MainGroup":
        const editMainGroupIdMatch = RequestDetails.match(/MainGroupID: (\d+)/);
        const newMainGroupNameMatch = RequestDetails.match(/New Name: (.*)/);
        if (
          editMainGroupIdMatch &&
          editMainGroupIdMatch[1] &&
          newMainGroupNameMatch &&
          newMainGroupNameMatch[1]
        ) {
          const mainGroupId = editMainGroupIdMatch[1];
          const newName = newMainGroupNameMatch[1];
          query = `UPDATE MainGroups SET Name = $1, Value = $1 WHERE MainGroupID = $2`;
          inputs = [newName, mainGroupId];
        } else {
          return res.status(400).send("Invalid format for Edit MainGroup");
        }
        break;

      case "Add Gattung":
        const addGattungDetailsMatch = RequestDetails.match(
          /Details: (.*), MainGroupID: (\d+)/
        );
        if (
          addGattungDetailsMatch &&
          addGattungDetailsMatch[1] &&
          addGattungDetailsMatch[2]
        ) {
          const gattungName = addGattungDetailsMatch[1];
          const mainGroupId = addGattungDetailsMatch[2];
          query = `INSERT INTO Gattungs (Name, MainGroupID, Value) VALUES ($1, $2, $1)`;
          inputs = [gattungName, mainGroupId];
        } else {
          return res.status(400).send("Invalid format for Add Gattung");
        }
        break;

      case "Delete Gattung":
        const deleteGattungIdMatch = RequestDetails.match(/GattungID: (\d+)/);
        if (deleteGattungIdMatch && deleteGattungIdMatch[1]) {
          const gattungId = deleteGattungIdMatch[1];
          query = `DELETE FROM Gattungs WHERE GattungID = $1`;
          inputs = [gattungId];
        } else {
          return res
            .status(400)
            .send("Invalid GattungID format for Delete Gattung");
        }
        break;

      case "Edit Gattung":
        const editGattungIdMatch = RequestDetails.match(/GattungID: (\d+)/);
        const newGattungNameMatch = RequestDetails.match(/New Name: ([^,]*)/);
        const mainGroupIdMatch = RequestDetails.match(/MainGroupID: (\d+)/);
        if (
          editGattungIdMatch &&
          editGattungIdMatch[1] &&
          newGattungNameMatch &&
          newGattungNameMatch[1] &&
          mainGroupIdMatch &&
          mainGroupIdMatch[1]
        ) {
          const gattungId = editGattungIdMatch[1];
          const newName = newGattungNameMatch[1];
          const mainGroupId = mainGroupIdMatch[1];
          query = `UPDATE Gattungs SET Name = $1, Value = $1 WHERE GattungID = $2`;
          inputs = [newName, gattungId];
          await db.query(
            "UPDATE Gattungs SET MainGroupID = $1 WHERE GattungID = $2",
            [mainGroupId, gattungId]
          );
        } else {
          return res.status(400).send("Invalid format for Edit Gattung");
        }
        break;

      case "Add Product":
        try {
          const productDetails = JSON.parse(RequestDetails);
          const {
            Name,
            Options,
            MainGroupID,
            GattungID,
            InputType,
            InputPlaceholder,
          } = productDetails;
          query = `INSERT INTO Products (MainGroupID, GattungID, Name, Options, InputType, InputPlaceholder) VALUES ($1, $2, $3, $4, $5, $6)`;
          inputs = [
            MainGroupID,
            GattungID,
            Name,
            JSON.stringify(Options).replace(/"/g, "'"),
            InputType,
            InputPlaceholder,
          ];
        } catch (err) {
          console.error("Error parsing product details:", err);
          return res.status(400).send("Error parsing product details");
        }
        break;

      case "Delete Option":
        const deleteOptionProductIdMatch =
          RequestDetails.match(/ProductID: (\d+)/);
        const deleteOptionMatch = RequestDetails.match(/Option: (.*)/);
        if (
          deleteOptionProductIdMatch &&
          deleteOptionProductIdMatch[1] &&
          deleteOptionMatch &&
          deleteOptionMatch[1]
        ) {
          const productId = deleteOptionProductIdMatch[1];
          const option = deleteOptionMatch[1];
          const productResult = await db.query("SELECT * FROM Products WHERE ProductID = $1", [productId]);
          if (productResult.rows.length === 0) {
            return res.status(404).send("Product not found");
          }
          const product = productResult.rows[0];
          const options = JSON.parse(product.options.replace(/'/g, '"'));
          const updatedOptions = options.filter((opt) => opt !== option);
          query = `UPDATE Products SET Options = $1 WHERE ProductID = $2`;
          inputs = [
            JSON.stringify(updatedOptions).replace(/"/g, "'"),
            productId,
          ];
        } else {
          return res.status(400).send("Invalid format for Delete Option");
        }
        break;

      default:
        return res.status(400).send("Invalid action type");
    }

    if (query) {
      try {
        await db.query(query, inputs);
        await db.query("DELETE FROM DataUploadRequests WHERE RequestID = $1", [id]);
        return res.send("Request approved and applied successfully");
      } catch (err) {
        console.error("Error executing query:", err);
        return res.status(500).send("Error executing query");
      }
    } else {
      return res.status(400).send("No query to execute");
    }
  } catch (error) {
    console.error("Error approving request:", error);
    return res
      .status(500)
      .send("An error occurred while approving the request");
  }
});

app.post("/denyRequest/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query("DELETE FROM DataUploadRequests WHERE requestid = $1", [id]);

    if (result.rowCount > 0) {
      res.send("Data upload request denied successfully.");
    } else {
      res.status(404).send("Request not found.");
    }
  } catch (error) {
    console.error("Error denying data upload request:", error);
    res
      .status(500)
      .send("An error occurred while denying the data upload request.");
  }
});

// Statik dosyaları sunmak
app.use(express.static(path.join(__dirname, '../dist')));

// Assets klasörünü sunmak
app.use('/assets', express.static(path.join(__dirname, '../dist/assets')));

// Static klasörünü sunmak
app.use('/static', express.static(path.join(__dirname, '../dist/static')));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});