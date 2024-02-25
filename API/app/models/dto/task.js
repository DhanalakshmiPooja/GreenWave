const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const taskSchema = new Schema({
  taskId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  assignDate: { type: String, required: true },
  assignTo: { type: String, required: true },
  dueDate: { type: String, required: true },
  status: { type: Boolean, required: true },
});

const task = mongoose.model("task", taskSchema);

module.exports = task;
