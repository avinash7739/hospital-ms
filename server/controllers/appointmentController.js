const Appointment = require("../models/Appointment");

// @desc    Book an appointment
// @route   POST /api/appointments
// @access  Patient
const createAppointment = async (req, res) => {
    const { department, doctorName, date, timeSlot } = req.body;

    try {
        const appointment = new Appointment({
            department,
            doctorName,
            patientName: req.user.name,
            patientId: req.user._id,
            date,
            timeSlot,
            status: "pending",
        });

        const createdAppointment = await appointment.save();
        res.status(201).json(createdAppointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all appointments (For patient: own, For doctor: assigned)
// @route   GET /api/appointments
// @access  Private
const getAppointments = async (req, res) => {
    try {
        let appointments;
        if (req.user.role === "patient") {
            appointments = await Appointment.find({ patientId: req.user._id });
        } else if (req.user.role === "doctor") {
            // Assuming doctorName in appointment matches the doctor's name
            // In a real app, we'd probably link by ID, but requirement said "doctor name"
            appointments = await Appointment.find({ doctorName: req.user.name });
        } else {
            appointments = [];
        }
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update appointment status
// @route   PUT /api/appointments/:id
// @access  Doctor
const updateAppointmentStatus = async (req, res) => {
    const { status } = req.body;

    try {
        const appointment = await Appointment.findById(req.params.id);

        if (appointment) {
            appointment.status = status;
            const updatedAppointment = await appointment.save();
            res.json(updatedAppointment);
        } else {
            res.status(404).json({ message: "Appointment not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createAppointment,
    getAppointments,
    updateAppointmentStatus,
};
