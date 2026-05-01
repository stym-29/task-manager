const Project =
require("../models/Project");

// Create Project
exports.createProject =
async (req, res) => {

  try {

    const project =
      await Project.create({

        name: req.body.name,

        createdBy: req.user.id

      });

    res.status(201)
       .json(project);

  } catch (error) {

    console.log("Create Error:",
      error.message);

    res.status(500).json({
      message: error.message
    });

  }

};

// Get Projects
exports.getProjects =
async (req, res) => {

  try {

    const projects =
      await Project.find();

    res.json(projects);

  } catch (error) {

    console.log("Fetch Error:",
      error.message);

    res.status(500).json({
      message: error.message
    });

  }

};

// Delete Project
exports.deleteProject =
async (req, res) => {

  try {

    await Project
      .findByIdAndDelete(
        req.params.id
      );

    res.json({
      message:
      "Project deleted"
    });

  } catch (error) {

    console.log("Delete Error:",
      error.message);

    res.status(500).json({
      message: error.message
    });

  }

};