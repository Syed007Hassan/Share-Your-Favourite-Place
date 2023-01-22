const express = require("express");

//controllers for places imported here
const placesControllers = require("../controllers/places-controllers");
const HttpError = require("../models/http-error");

//express-validator for validation
const { check } = require("express-validator");

const router = express.Router();
const fileUpload = require("../middleware/file-upload");
const checkAuth = require("../middleware/check-auth");

//using different controllers for different routes

router.get("/:pid", placesControllers.getPlaceById);

router.get("/user/:uid", placesControllers.getPlacesByUserId);

//the below line of code will make sure that the checkAuth middleware is executed before the below routes
router.use(checkAuth);

router.post(
  "/",
  fileUpload.single("image"),
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
