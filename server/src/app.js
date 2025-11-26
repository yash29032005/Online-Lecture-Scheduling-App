const express = require("express");
const cors = require("cors");

const apiRoutes = require("./routes");

const app = express();
app.use(
  cors({
    origin: `${process.env.WEB_URL}`,
  })
);
app.use(express.json());

app.use("/api", apiRoutes);

module.exports = app;
