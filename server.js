const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');
const prioritizeTasks = require('./utils/prioritize');
require('dotenv').config();
const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.post("/api/prioritize", async (req, res) => {
  const { tasks } = req.body;

  //console.log("Received tasks:", tasks);

  if (!tasks || !Array.isArray(tasks)) {
    console.error("Invalid task list provided.");
    return res.status(400).json({ error: "Invalid task list provided." });
  }

  try {
    const response = await prioritizeTasks(tasks, req.body.prompt || ""); 
    console.log("Response from prioritizeTasks:", response); 
    res.json({ response });
  } catch (error) {
    console.error("Error prioritizing tasks:", error.message); 
    res.status(500).json({ error: "Failed to prioritize tasks." });
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
