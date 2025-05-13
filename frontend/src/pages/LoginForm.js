import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext'; // ← use this one
import './LoginForm.css';

const LoginForm = () => {
const [form, setForm] = useState({ email: '', password: '' });
const [message, setMessage] = useState('');
const { dispatch } = useAuthContext();
const navigate = useNavigate();

const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
};

const handleSubmit = async e => {
    e.preventDefault();
    try {
    const res = await axios.post('http://localhost:5000/api/users/login', form);
    const user = res.data.user;

    dispatch({ type: 'LOGIN', payload: user }); // ← dispatch login
    if (!user) {
        throw new Error('No user returned from backend');
    }

    setMessage('✅ Logged in successfully!');
    navigate('/profile'); // Or wherever you want
    } catch (err) {
    setMessage(err.response?.data?.message || '❌ Login failed');
    }
};

return (
    <div className="login-container">
    <h2 className="login-heading">Login</h2>
    <form onSubmit={handleSubmit} className="login-form">
        <input
        className="login-input"
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        />
        <input
        className="login-input"
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        />
        <button type="submit" className="login-button">Login</button>
        <button type="button" onClick={() => navigate('/')} className="back-button">← Back</button>
        {message && <p className="login-message">{message}</p>}
    </form>
    </div>
);
};

export default LoginForm;