// index.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// Use task routes
app.use("/api", taskRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
