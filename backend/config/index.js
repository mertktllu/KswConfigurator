const express = require("express");
const { Sequelize } = require("sequelize");
const MainGroup = require("./models/MainGroup");

const app = express();
app.use(express.json());

// Sequelize bağlantısı
const sequelize = new Sequelize("DESKTOP-AB3LDT8", null, null, {
    host: "localhost",
    dialect: "mssql",
    dialectOptions: {
        options: {
            encrypt: true,
            enableArithAbort: true,
            trustedConnection: true, // Windows Authentication kullanmak için
        },
    },
});

// Veritabanına bağlanma ve sunucuyu başlatma
sequelize.authenticate()
    .then(() => {
        console.log("Database connected!");
        const PORT = 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Unable to connect to the database:", error);
    });

// Ana grupları almak için GET endpoint'i
app.get("/main-groups", async (req, res) => {
    try {
        const mainGroups = await MainGroup.findAll();
        res.json(mainGroups);
    } catch (error) {
        res.status(500).send("Error retrieving main groups");
    }
});

// Yeni bir ana grubu oluşturmak için POST endpoint'i
app.post("/main-groups", async (req, res) => {
    try {
        const { Name } = req.body;
        const newMainGroup = await MainGroup.create({ Name });
        res.json(newMainGroup);
    } catch (error) {
        res.status(500).send("Error creating new main group");
    }
});
