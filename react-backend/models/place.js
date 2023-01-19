const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//schema is a blueprint for how data should look like in the database

const placeSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  //creator is a reference to the user who created the place and it is a relation
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

//model is a class with which we can create documents in the database

module.exports = mongoose.model("Place", placeSchema);
