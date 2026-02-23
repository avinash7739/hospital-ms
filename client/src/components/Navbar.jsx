import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <Link to="/" className="logo">
                    MediConnect
                </Link>
                <div className="nav-links">
                    {user ? (
                        <>
                            <span className="nav-link" style={{ display: 'flex', alignItems: 'center' }}>
                                Hello, {user.name} ({user.role})
                            </span>
                            <button
                                onClick={handleLogout}
                                className="btn btn-primary"
                                style={{ padding: '8px 16px', fontSize: '0.9rem' }}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/register" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem', color: 'white' }}>
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
