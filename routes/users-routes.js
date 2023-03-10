const express = require("express");
const fileUpload = require("../middleware/file-upload");

const usersController = require("../controllers/users-controllers");

const router = express.Router();

//express-validator for validation
const { check } = require("express-validator");

router.get("/", usersController.getUsers);

router.post(
  "/signup",
  //multer middleware for file upload
  fileUpload.single("image"),
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersController.signup
);

router.post("/login", usersController.login);

module.exports = router;
