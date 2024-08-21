const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const upload = require("../middleware/upload");

router.post("/register/admin", authController.registerAdmin);
router.post(
  "/register/user",
  upload.single("photo"),
  authController.registerUser
);
router.post("/login", authController.login);
router.get("/confirm/:token", authController.confirmEmail);

module.exports = router;
