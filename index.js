import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./src/db/index.js";
import userRoutes from "./src/routes/user.routes.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());

// CORS Configuration


const corsOptions = {
  origin: 'https://authentication-frontend-ten.vercel.app/', // Your frontend URL
  methods: 'GET,POST,PUT,DELETE',
  credentials: true, // Allow cookies
};

app.use(cors(corsOptions));


// Routes
app.use("/api/v1", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Database Connection and Server Start
connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB connection failed !!! ", err);
  });
