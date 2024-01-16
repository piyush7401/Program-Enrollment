const express = require("express");
const { registerController, loginController } = require("../controller/authController");

const router = express.Router();

// Registration route
router.post("/register", registerController);

router.post("/login", loginController);

module.exports = router;
