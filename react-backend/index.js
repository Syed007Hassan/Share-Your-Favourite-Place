const app = require("./app.js");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

mongoose.set("strictQuery", false);

// PORT
const PORT = 5000;

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

app.use(express.static(path.join(__dirname, "/react-frontend/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "/react-frontend/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});
