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
    const result = await pool
      .request()
      .query("SELECT GattungID, Name, MainGroupID FROM Gattungs");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/maingroups", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query("SELECT MainGroupID, Name FROM MainGroups");
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
app.get("/products/byMainGroup/:mainGroupId", async (req, res) => {
  const { mainGroupId } = req.params;

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("MainGroupID", sql.Int, mainGroupId)
      .query("SELECT * FROM Products WHERE MainGroupID = @MainGroupID");
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
    const updatedOptions = options.filter((opt) => opt !== Option);

    // Güncellenmiş seçenekleri veritabanına yaz
    await pool
      .request()
      .input(
        "Options",
        sql.NVarChar,
        JSON.stringify(updatedOptions).replace(/"/g, "'")
      )
      .input("ProductID", sql.Int, ProductID)
      .query(
        "UPDATE Products SET Options = @Options WHERE ProductID = @ProductID"
      );

    res.status(200).send("Option deleted successfully");
  } catch (error) {
    console.error("Error deleting option:", error);
    res.status(500).send("An error occurred while deleting the option");
  }
});

app.get("/datauploadrequests", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query("SELECT * FROM DataUploadRequests");
    res.json(result.recordset);
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
      .input(
        "Options",
        sql.NVarChar,
        JSON.stringify(options).replace(/"/g, "'")
      )
      .input("ProductID", sql.Int, ProductID)
      .query(
        "UPDATE Products SET Options = @Options WHERE ProductID = @ProductID"
      );

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

  console.log("Received data:", req.body); // Gelen verileri kontrol etmek için

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("UserID", sql.Int, UserID)
      .input("TableName", sql.NVarChar, TableName)
      .input("RequestDetails", sql.NVarChar, RequestDetails)
      .input("RequestStatus", sql.Bit, RequestStatus)
      .input("RequestDate", sql.DateTime, RequestDate)
      .input("ActionType", sql.NVarChar, ActionType)
      .query(
        "INSERT INTO DataUploadRequests (UserID, TableName, RequestDetails, RequestStatus, RequestDate, ActionType) VALUES (@UserID, @TableName, @RequestDetails, @RequestStatus, @RequestDate, @ActionType)"
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
  const { RequestStatus } = req.body;

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("ID", sql.Int, id)
      .input("RequestStatus", sql.Int, RequestStatus)
      .query(
        "UPDATE DataUploadRequests SET RequestStatus = @RequestStatus WHERE RequestID = @ID"
      );

    if (result.rowsAffected[0] > 0) {
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
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("ID", sql.Int, id)
      .query("DELETE FROM DataUploadRequests WHERE RequestID = @ID");

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
          query = `INSERT INTO MainGroups (Name, Value) VALUES (@details, @details)`;
          inputs = [{ name: "details", type: sql.NVarChar, value: details }];
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
          query = `DELETE FROM MainGroups WHERE MainGroupID = @mainGroupId`;
          inputs = [{ name: "mainGroupId", type: sql.Int, value: mainGroupId }];
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
          query = `UPDATE MainGroups SET Name = @newName, Value = @newName WHERE MainGroupID = @mainGroupId`;
          inputs = [
            { name: "newName", type: sql.NVarChar, value: newName },
            { name: "mainGroupId", type: sql.Int, value: mainGroupId },
          ];
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
          query = `INSERT INTO Gattungs (Name, MainGroupID, Value) VALUES (@gattungName, @mainGroupId, @gattungName)`;
          inputs = [
            { name: "gattungName", type: sql.NVarChar, value: gattungName },
            { name: "mainGroupId", type: sql.Int, value: mainGroupId },
          ];
        } else {
          return res.status(400).send("Invalid format for Add Gattung");
        }
        break;

      case "Delete Gattung":
        const deleteGattungIdMatch = RequestDetails.match(/GattungID: (\d+)/);
        if (deleteGattungIdMatch && deleteGattungIdMatch[1]) {
          const gattungId = deleteGattungIdMatch[1];
          query = `DELETE FROM Gattungs WHERE GattungID = @gattungId`;
          inputs = [{ name: "gattungId", type: sql.Int, value: gattungId }];
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
          query = `UPDATE Gattungs SET Name = @newName, Value = @newName WHERE GattungID = @gattungId`;
          inputs = [
            { name: "newName", type: sql.NVarChar, value: newName },
            { name: "gattungId", type: sql.Int, value: gattungId },
          ];
          await pool
            .request()
            .input("mainGroupId", sql.Int, mainGroupId)
            .input("gattungId", sql.Int, gattungId)
            .query(
              "UPDATE Gattungs SET MainGroupID = @mainGroupId WHERE GattungID = @gattungId"
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
          query = `INSERT INTO Products (MainGroupID, GattungID, Name, Options, InputType, InputPlaceholder) VALUES (@MainGroupID, @GattungID, @Name, @Options, @InputType, @InputPlaceholder)`;
          inputs = [
            { name: "MainGroupID", type: sql.Int, value: MainGroupID },
            { name: "GattungID", type: sql.Int, value: GattungID },
            { name: "Name", type: sql.NVarChar, value: Name },
            {
              name: "Options",
              type: sql.NVarChar,
              value: JSON.stringify(Options).replace(/"/g, "'"),
            },
            { name: "InputType", type: sql.NVarChar, value: InputType },
            {
              name: "InputPlaceholder",
              type: sql.NVarChar,
              value: InputPlaceholder,
            },
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
          const productResult = await pool
            .request()
            .input("ProductID", sql.Int, productId)
            .query("SELECT * FROM Products WHERE ProductID = @ProductID");
          if (productResult.recordset.length === 0) {
            return res.status(404).send("Product not found");
          }
          const product = productResult.recordset[0];
          const options = JSON.parse(product.Options.replace(/'/g, '"'));
          const updatedOptions = options.filter((opt) => opt !== option);
          query = `UPDATE Products SET Options = @options WHERE ProductID = @productId`;
          inputs = [
            {
              name: "options",
              type: sql.NVarChar,
              value: JSON.stringify(updatedOptions).replace(/"/g, "'"),
            },
            { name: "productId", type: sql.Int, value: productId },
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
        const requestQuery = pool.request();
        inputs.forEach((input) =>
          requestQuery.input(input.name, input.type, input.value)
        );
        await requestQuery.query(query);
        await pool
          .request()
          .input("RequestID", sql.Int, id)
          .query("DELETE FROM DataUploadRequests WHERE RequestID = @RequestID");
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
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("ID", sql.Int, id)
      .query("DELETE FROM DataUploadRequests WHERE RequestID = @ID");

    if (result.rowsAffected[0] > 0) {
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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
