"use client";
import { useEffect, useState } from "react";

import { getTasks, addTask, updateTask, deleteTask } from "@/lib/api";

import TasksList from "./pages/tasksList";
import TaskForm from "./pages/taskForm";

export default function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks()
      .then((res) => setTasks(res.data))
      .catch((err) => console.log("Error fetching tasks:", err));
  }, []);

  // Add a new task
  const handleAddTask = (newTask) => {
    addTask(newTask)
      .then((response) => {
        setTasks([...tasks, response.data]); // Add the new task to the existing list
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  const handleToggleStatus = async (id, currentTaskDescription, currentStatus) => {
    const newStatus = currentStatus === "pending" ? "completed" : "pending";
  
    // Ensure the currentTaskDescription is passed as the task, and newStatus is passed as the status
    updateTask(id, currentTaskDescription, newStatus)
      .then((response) => {
        setTasks(
          tasks.map((task) =>
            task.id === id ? { ...task, status: newStatus } : task
          )
        );
        console.log("Task updated successfully on server:", response.data);
      })
      .catch((error) => {
        console.error("Error updating task status:", error);
      });
  };
    
  // Delete a task
  const handleDeleteTask = (id) => {
    deleteTask(id)
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>

      <TaskForm onAddTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        onToggleStatus={handleToggleStatus}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}
