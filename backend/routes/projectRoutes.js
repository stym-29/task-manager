const express = require("express");

const router = express.Router();

const {

  createProject,
  getProjects,
  deleteProject

} = require("../controllers/projectController");

const authMiddleware =
  require("../middleware/authMiddleware");

const roleMiddleware =
  require("../middleware/roleMiddleware");


// Admin Only — Create Project
router.post(
  "/",
  authMiddleware,
  roleMiddleware("Admin"),
  createProject
);


// All Users — View Projects
router.get(
  "/",
  authMiddleware,
  getProjects
);


// Admin Only — Delete
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("Admin"),
  deleteProject
);

module.exports = router;