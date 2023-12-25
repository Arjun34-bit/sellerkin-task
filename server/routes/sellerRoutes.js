const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/sellerController");

// Register a new seller
router.post("/register", register);

// Login an existing seller
router.post("/login", login);

module.exports = router;
