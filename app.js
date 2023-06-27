const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// ENV FILE ACCESS
dotenv.config();

// DATABASE & SERVER
const app = express();
const PORT = process.env.PORT || 9000;

mongoose
  .connect(process.env.DATABASE)
  .then((result) => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((error) => console.log(error));

// ROUTES
const articlesRoutes = require("./routes/articlesRoutes");
app.use("/api/v1/articles", articlesRoutes);
