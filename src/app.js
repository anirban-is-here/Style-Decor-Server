import express from "express";
import cors from "cors";
import authRoutes from './routes/auth.route'
import bookingRoutes from "./routes/booking.route";
import servicesRoutes from "./routes/services.route";
import usersRoutes from "./routes/users.route";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/users", usersRoutes);


// temp route to test backend
app.get("/", (req, res) => {
  res.send("Backend working");
});

export default app;
