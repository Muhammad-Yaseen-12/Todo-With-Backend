import express from "express";
import cors from "cors";
import mongoose from "./config.js";
import TaskModel from "./models/task/task.js";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// Routes
app.get("/", (req, res) => res.send("Hi"));

// Get all tasks
app.get("/task", async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add task
app.post("/task", async (req, res) => {
  try {
    const task = new TaskModel(req.body);
    await task.save();
    res.json({ message: "Task added successfully", task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete task
app.delete("/task/:id", async (req, res) => {
  try {
    await TaskModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update task
app.put("/task/:id", async (req, res) => {
  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Task updated successfully", updatedTask });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Server listen
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

mongoose.connection.on("open", () => console.log("Database connected successfully"));
mongoose.connection.on("error", () => console.log("Database connection error"));
