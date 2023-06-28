const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const multer = require("multer");

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

// MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// UPLOADING IMAGES
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single("image"));

// ROUTES
const articlesRoutes = require("./routes/articlesRoutes");
app.use("/api/v1/articles", articlesRoutes);
