const mongoose = require("mongoose");
const MONGO_URI = "mongodb://localhost:27017/medical_app";

console.log("Connecting...");
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("Connected!");
        process.exit(0);
    })
    .catch(err => {
        console.error("Error:", err);
        process.exit(1);
    });
