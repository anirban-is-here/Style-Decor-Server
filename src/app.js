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
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS policy: Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
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
