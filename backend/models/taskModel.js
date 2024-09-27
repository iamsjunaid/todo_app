const pool = require("../db/DBconfig");

// Function to get all tasks
const getAllTasks = async () => {
  const result = await pool.query("SELECT * FROM tasks ORDER BY id");
  return result.rows;
};

// Function to create a new task
const createTask = async (task) => {
  const result = await pool.query(
    "INSERT INTO tasks (task) VALUES ($1) RETURNING *",
    [task]
  );
  return result.rows[0];
};

// Function to update a task
const updateTask = async (id, task, status) => {
  let query, values;

  if (task) {
    query = "UPDATE tasks SET task = $2, status = $3 WHERE id = $1 RETURNING *";
    values = [id, task, status];
  } else {
    query = "UPDATE tasks SET status = $2 WHERE id = $1 RETURNING *";
    values = [id, status];
  }

  const result = await pool.query(query, values);
  return result.rows[0];
};

// Function to delete a task
const deleteTask = async (id) => {
  const result = await pool.query(
    "DELETE FROM tasks WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};

// Export the model functions
module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
