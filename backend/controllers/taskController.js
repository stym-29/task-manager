exports.createTask
exports.getTasks
exports.updateTask
exports.deleteTask

const Task = require("../models/Task");

// Create Task
exports.createTask = async (req, res) => {

  const {
    title,
    projectId,
    assignedTo,
    dueDate
  } = req.body;

  try {

    const task =
      await Task.create({

        title,

        project: projectId,

        assignedTo:
          assignedTo || null,

        dueDate

      });

    res.status(201).json(task);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// Get Tasks
exports.getTasks = async (req, res) => {

  try {

    const tasks =
      await Task.find()

        .populate("project", "name")

        .populate(
          "assignedTo",
          "name email"
        );

    res.json(tasks);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// Update Task Status
exports.updateTask = async (req, res) => {

  try {

    const task =
      await Task.findByIdAndUpdate(

        req.params.id,

        req.body,

        { new: true }

      );

    res.json(task);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// Delete Task
exports.deleteTask = async (req, res) => {

  try {

    await Task.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Task deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};