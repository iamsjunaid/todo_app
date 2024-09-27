// controllers/taskController.js
const taskModel = require("../models/taskModel");

// Get all tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await taskModel.getAllTasks();
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Create a new task
const addTask = async (req, res) => {
  const { task } = req.body;
  try {
    const newTask = await taskModel.createTask(task);
    res.json(newTask);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Update a task
const modifyTask = async (req, res) => {
  const { id } = req.params;
  const { task, status } = req.body;
  try {
    const updatedTask = await taskModel.updateTask(id, task || null, status);
    if (!updatedTask) {
      return res.status(404).send("Task not found");
    }
    res.json(updatedTask);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Delete a task
const removeTask = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await taskModel.deleteTask(id);
    if (!deletedTask) {
      return res.status(404).send("Task not found");
    }
    res.json(deletedTask);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Export the controller functions
module.exports = {
  getTasks,
  addTask,
  modifyTask,
  removeTask,
};
