import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import { connectDB } from "./config/db";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const corsOptions = {
    origin: '*', // Allow all origins
};
// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Routes
app.use("/", userRoutes);

// Connect to the database
connectDB();

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
