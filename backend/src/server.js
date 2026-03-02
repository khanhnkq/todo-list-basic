import express from "express";
import taskRoutes from "./routes/taskRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/v1", taskRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
