const allowedOrigins = [
  "https://tyle-decor.web.app",
  "http://localhost:5173",
  "https://style-decor-server-anirban.vercel.app"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));
