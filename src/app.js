import express from "express";
import cors from "cors";
import authRoutes from './routes/auth.route.js'
import bookingRoutes from "./routes/booking.route.js";
import servicesRoutes from "./routes/services.route.js";
import usersRoutes from './routes/users.route.js'

const app = express();

const allowedOrigins = [
  "https://tyle-decor.web.app", // your Firebase frontend
  "http://localhost:5173", // local frontend during development
];

app.use(
  cors({
    origin: "https://tyle-decor.web.app",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // optional, if you send cookies or auth headers
  })
);
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
