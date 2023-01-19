const express = require("express");

//controllers for places imported here
const placesControllers = require("../controllers/places-controllers");
const HttpError = require("../models/http-error");

//express-validator for validation
const { check } = require("express-validator");

const router = express.Router();

//using different controllers for different routes

router.get("/:pid", placesControllers.getPlaceById);

router.get("/user/:uid", placesControllers.getPlacesByUserId);

router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  placesControllers.createPlace
);

router.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  placesControllers.updatePlace
);

router.delete("/:pid", placesControllers.deletePlace);

module.exports = router;
