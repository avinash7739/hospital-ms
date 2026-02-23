import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const PatientDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [formData, setFormData] = useState({
        department: '',
        doctorName: '',
        date: '',
        timeSlot: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const fetchAppointments = async () => {
        try {
            const { data } = await api.get('/appointments');
            setAppointments(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            await api.post('/appointments', formData);
            setMessage('Appointment booked successfully!');
            fetchAppointments();
            setFormData({ department: '', doctorName: '', date: '', timeSlot: '' });
        } catch (err) {
            setError(err.response?.data?.message || 'Error booking appointment');
        }
    };

    return (
        <div className="container" style={{ marginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary-color)' }}>Patient Dashboard</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {/* Booking Form */}
                <div className="card">
                    <h3 style={{ marginBottom: '1rem' }}>Book Appointment</h3>
                    {message && <div style={{ color: 'var(--success-color)', marginBottom: '1rem' }}>{message}</div>}
                    {error && <div style={{ color: 'var(--error-color)', marginBottom: '1rem' }}>{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Department</label>
                            <select
                                name="department"
                                className="form-control"
                                value={formData.department}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Department</option>
                                <option value="Cardiology">Cardiology</option>
                                <option value="Neurology">Neurology</option>
                                <option value="Orthopedics">Orthopedics</option>
                                <option value="Pediatrics">Pediatrics</option>
                                <option value="General">General</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Doctor Name</label>
                            <input
                                type="text"
                                name="doctorName"
                                className="form-control"
                                value={formData.doctorName}
                                onChange={handleChange}
                                required
                                placeholder="Dr. Smith"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Date</label>
                            <input
                                type="date"
                                name="date"
                                className="form-control"
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Time Slot</label>
                            <input
                                type="time"
                                name="timeSlot"
                                className="form-control"
                                value={formData.timeSlot}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Book Now</button>
                    </form>
                </div>

                {/* Appointments List */}
                <div>
                    <h3 style={{ marginBottom: '1rem' }}>My Appointments</h3>
                    {appointments.length === 0 ? (
                        <p>No appointments found.</p>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {appointments.map((apt) => (
                                <div key={apt._id} className="card" style={{ padding: '1.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                        <div>
                                            <h4 style={{ color: 'var(--primary-dark)' }}>{apt.department}</h4>
                                            <p><strong>Doctor:</strong> {apt.doctorName}</p>
                                            <p><strong>Date:</strong> {apt.date} at {apt.timeSlot}</p>
                                        </div>
                                        <div>
                                            <span style={{
                                                padding: '4px 12px',
                                                borderRadius: '20px',
                                                fontSize: '0.85rem',
                                                fontWeight: '600',
                                                backgroundColor:
                                                    apt.status === 'approved' ? '#dcfce7' :
                                                        apt.status === 'rejected' ? '#fee2e2' : '#fef9c3',
                                                color:
                                                    apt.status === 'approved' ? '#166534' :
                                                        apt.status === 'rejected' ? '#991b1b' : '#854d0e'
                                            }}>
                                                {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;
