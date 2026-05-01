const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true
  },

  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },

  dueDate: {
    type: Date,
    required: true
  },

  status: {
    type: String,
    enum: ["Pending", "Completed"],
    default: "Pending"
  }

}, { timestamps: true });

module.exports =
  mongoose.model("Task", taskSchema);