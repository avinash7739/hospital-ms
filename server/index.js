const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

console.log("Starting server...");
dotenv.config();
console.log("Dotenv configured");

const app = express();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

let authRoutes;
let appointmentRoutes;
try {
    authRoutes = require("./routes/authRoutes");
    appointmentRoutes = require("./routes/appointmentRoutes");
} catch (error) {
    console.error("Error loading routes:", error);
}

if (authRoutes) app.use("/api/auth", authRoutes);
if (appointmentRoutes) app.use("/api/appointments", appointmentRoutes);

// Database Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/medical_app";

console.log("Attempting MongoDB connection to:", MONGO_URI);
mongoose
    .connect(MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("MongoDB Connection Error:", err));

mongoose.connection.on('connected', () => console.log('Mongoose connected to db'));
mongoose.connection.on('error', (err) => console.log('Mongoose connection error:', err));
mongoose.connection.on('disconnected', () => console.log('Mongoose disconnected'));

console.log("Defining routes...");
app.get("/", (req, res) => {
    res.send("API is running...");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
