// routes/taskRoutes.js
const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// Define routes and map them to controller methods
router.get("/tasks", taskController.getTasks);
router.post("/tasks", taskController.addTask);
router.put("/tasks/:id", taskController.modifyTask);
router.delete("/tasks/:id", taskController.removeTask);

module.exports = router;
