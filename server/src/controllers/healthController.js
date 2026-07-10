import mongoose from "mongoose";

export function getHealth(req, res) {
  const databaseStates = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting"
  };

  res.json({
    success: true,
    message: "GymPro API health check passed",
    database: databaseStates[mongoose.connection.readyState] || "unknown",
    timestamp: new Date().toISOString()
  });
}
