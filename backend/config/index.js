// index.js

const express = require("express");
const sequelize = require("./config/database");
const MainGroup = require("./models/MainGroup");

const app = express();
app.use(express.json());

app.get("/main-groups", async (req, res) => {
    try {
        const mainGroups = await MainGroup.findAll();
        res.json(mainGroups);
    } catch (error) {
        res.status(500).send("Error retrieving main groups");
    }
});

// Sunucuyu başlat
const PORT = 3000;
app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    // Veritabanı bağlantısını test et
    try {
        await sequelize.authenticate();
        console.log("Database connected!");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
});
