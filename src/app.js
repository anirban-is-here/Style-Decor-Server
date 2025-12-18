import express from "express";
import cors from "cors";
import authRoutes from './routes/auth.route.js'
import bookingRoutes from "./routes/booking.route.js";
import servicesRoutes from "./routes/services.route.js";
import usersRoutes from './routes/users.route.js'

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/bookings", bookingRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);



// temp route to test backend
app.get("/", (req, res) => {
  res.send("Backend working");
});

export default app;
