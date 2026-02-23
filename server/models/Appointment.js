const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
    department: {
        type: String,
        required: true,
    },
    doctorName: {
        type: String,
        required: true,
    },
    patientName: {
        type: String, // Or ObjectId ref to User if we want strict linking, but req says just names for now
        required: true,
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: String, // Keeping as String for simplicity as per requirements, could be Date
        required: true,
    },
    timeSlot: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
    },
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);
module.exports = Appointment;
