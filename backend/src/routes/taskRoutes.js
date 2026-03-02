import express from "express";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} from "../controllers/taskController.js";

const routers = express.Router();

routers.get("/tasks", getTasks);

routers.get("/tasks/:id", getTaskById);

routers.post("/tasks", createTask);

routers.delete("/tasks/:id", deleteTask);

routers.put("/tasks/:id", updateTask);

export default routers;
