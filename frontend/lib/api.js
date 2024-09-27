import axios from "axios";

const API_URL = "https://todo-app-5cad.onrender.com/api/tasks";

export const getTasks = () => axios.get(API_URL);

export const addTask = (task) => axios.post(API_URL, { task });

export const updateTask = (id, task, status) => {
  // Create the payload object and only include 'task' if it's provided
  const payload = { status };
  if (task) {
    payload.task = task;
  }

  return axios.put(`${API_URL}/${id}`, payload);
};

export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`);
