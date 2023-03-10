const app = require("./app.js");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

mongoose.set("strictQuery", false);

// serving the frontend
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

let PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  //connect to MongoDB by specifying port to access MongoDB server
  main().catch((err) => console.log(err));

  //creating a Places db after / localhost
  async function main() {
    await mongoose.connect(
      "mongodb+srv://admin-hassan:" +
        process.env.MONGOATLASPASWORD +
        "@cluster0.yipmq.mongodb.net/places"
    );
    console.log("MongoDB Server is up and running");
  }

  console.log(`Node server is running on PORT: ${PORT}`);
});
