const express = require("express");
const { config, setupMiddlewares } = require("./config/serverConfig");
const todoRoutes = require("./routes/todoRoute");

const app = express();

setupMiddlewares(app);

// Route use
app.use("/todos", todoRoutes);

// Server kontrol
app.get("/", (req, res) => {
  res.json({
    message: "Servera hoşgeldin",
  });
});

app.listen(3010, (req, res) => {
  console.log("Server aktif -> http://localhost:3010");
});
