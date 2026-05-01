const express = require("express");

const router = express.Router();

const {

  signup,
  login,
  getUsers

} = require("../controllers/authController");

const authMiddleware =
  require("../middleware/authMiddleware");


// Signup
router.post(
  "/signup",
  signup
);


// Login
router.post(
  "/login",
  login
);


// Get Users 
router.get(
  "/users",
  authMiddleware,
  getUsers
);

module.exports = router;