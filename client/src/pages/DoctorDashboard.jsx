import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const DoctorDashboard = () => {
    const [appointments, setAppointments] = useState([]);

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

    const handleStatusUpdate = async (id, status) => {
        try {
            await api.put(`/appointments/${id}`, { status });
            fetchAppointments();
        } catch (err) {
            alert('Error updating status');
        }
    };

    return (
        <div className="container" style={{ marginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary-color)' }}>Doctor Dashboard</h2>

            <div className="card">
                <h3 style={{ marginBottom: '1.5rem' }}>Assigned Appointments</h3>
                {appointments.length === 0 ? (
                    <p>No appointments found.</p>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                                    <th style={{ padding: '1rem' }}>Patient</th>
                                    <th style={{ padding: '1rem' }}>Department</th>
                                    <th style={{ padding: '1rem' }}>Date & Time</th>
                                    <th style={{ padding: '1rem' }}>Status</th>
                                    <th style={{ padding: '1rem' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map((apt) => (
                                    <tr key={apt._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                        <td style={{ padding: '1rem' }}>{apt.patientName}</td>
                                        <td style={{ padding: '1rem' }}>{apt.department}</td>
                                        <td style={{ padding: '1rem' }}>{apt.date} <br /> <small>{apt.timeSlot}</small></td>
                                        <td style={{ padding: '1rem' }}>
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
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            {apt.status === 'pending' && (
                                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                    <button
                                                        className="btn"
                                                        style={{ padding: '6px 12px', fontSize: '0.8rem', backgroundColor: '#22c55e', color: 'white' }}
                                                        onClick={() => handleStatusUpdate(apt._id, 'approved')}
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        className="btn"
                                                        style={{ padding: '6px 12px', fontSize: '0.8rem', backgroundColor: '#ef4444', color: 'white' }}
                                                        onClick={() => handleStatusUpdate(apt._id, 'rejected')}
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorDashboard;
