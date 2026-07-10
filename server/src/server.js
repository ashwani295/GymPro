import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorHandler.js";
import healthRoutes from "./routes/healthRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://127.0.0.1:5173"
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "GymPro backend API is running",
    health: "/api/health"
  });
});

app.use("/api/health", healthRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found"
  });
});

app.use(errorHandler);

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch((error) => {
  console.error(`Server startup failed: ${error.message}`);
  process.exit(1);
});
