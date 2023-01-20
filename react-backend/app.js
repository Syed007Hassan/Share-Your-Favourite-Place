//MVC - Model View Controller following this pattern
const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const HttpError = require("./models/http-error");

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  {
    res.setHeader("Access-control-Allow-Origin", "*");
    res.setHeader(
      "Access-control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-control-Allow-Methods", "GET, POST, PATCH, DELETE");
  }
  next();
});

app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use("/api/places", placesRoutes); // => /api/places...
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }

  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

module.exports = app;

// const http = require("http");

// let port = 3000;

// const server = http.createServer((req, res) => {
//   console.log("Server is running on port " + port);
//   console.log(req.method, req.url);
//   res.end("Hello World");
// });

// server.listen(port);
