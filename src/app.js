import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import bookingRoutes from "./routes/booking.route.js";
import servicesRoutes from "./routes/services.route.js";
import usersRoutes from "./routes/users.route.js";

const app = express();

const allowedOrigins = ["https://tyle-decor.web.app", "http://localhost:5173"];

// Apply CORS globally
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Handle preflight requests
  if (req.method === "OPTIONS") return res.sendStatus(200);

  next();
});

app.use(express.json());

app.use("/api/bookings", bookingRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Backend working");
});

export default app;
