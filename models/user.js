const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

//schema is a blueprint for how data should look like in the database

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  image: { type: String, required: true },
  //places is a reference to the places created by the user and it is a relation
  //a user can have many places but a place belongs to only one user
  places: [{ type: mongoose.Types.ObjectId, required: true, ref: "Place" }],
});

userSchema.plugin(uniqueValidator);

//model is a class with which we can create documents in the database

module.exports = mongoose.model("User", userSchema);
