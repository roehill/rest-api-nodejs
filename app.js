const express = require("express");

const app = express();

app.listen(9000);

// ROUTES
const articlesRoutes = require("./routes/articlesRoutes");
app.use("/api/v1/articles", articlesRoutes);
