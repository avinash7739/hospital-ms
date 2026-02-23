const express = require("express");
const {
    createAppointment,
    getAppointments,
    updateAppointmentStatus,
} = require("../controllers/appointmentController");
const { protect, doctorOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/")
    .post(protect, createAppointment)
    .get(protect, getAppointments);

router.route("/:id")
    .put(protect, doctorOnly, updateAppointmentStatus);

module.exports = router;
