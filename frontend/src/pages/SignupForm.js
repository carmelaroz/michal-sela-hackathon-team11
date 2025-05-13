import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignupForm.css';

const SignupForm = () => {
const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
    socialUsername: '',
    address: '',
    maritalStatus: '',
    numberOfChildren: '',
    idNumber: '',
    birthDate: '',
    role: 'user',
});

const [message, setMessage] = useState('');
const navigate = useNavigate();

const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { ...form, usageRole: form.role }; // Correct the field name
    try {
        await axios.post('http://localhost:5000/api/users/signup', formData);
        setMessage('✅ Signup successful! Awaiting approval.');
    } catch (err) {
        setMessage(err.response?.data?.message || '❌ Signup failed');
    }
};

return (
    <div className="signup-container">
    <h2 className="signup-heading">Signup</h2>
    <form onSubmit={handleSubmit} className="signup-form">
        <input className="signup-input" name="firstName" placeholder="First Name" onChange={handleChange} required />
        <input className="signup-input" name="lastName" placeholder="Last Name" onChange={handleChange} required />
        <input className="signup-input" name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input className="signup-input" name="password" type="password" placeholder="Password" onChange={handleChange} required />
        {/* <input className="signup-input" name="gender" placeholder="Gender" onChange={handleChange} /> */}

            {/* Gender Selection - Radio Buttons */}
    <div className="gender-field">
        <label>
            <input
                type="radio"
                name="gender"
                value="female"
                checked={form.gender === 'female'}
                onChange={handleChange}
            />
            Female
        </label>
        <label>
            <input
                type="radio"
                name="gender"
                value="male"
                checked={form.gender === 'male'}
                onChange={handleChange}
            />
            Male
        </label>
    </div>

        <input className="signup-input" name="socialUsername" placeholder="Social Username" onChange={handleChange} />
        <input className="signup-input" name="address" placeholder="Address" onChange={handleChange} />
        <input className="signup-input" name="maritalStatus" placeholder="Marital Status" onChange={handleChange} />
        <input className="signup-input" name="numberOfChildren" type="number" placeholder="Number of Children" onChange={handleChange} />
        <input className="signup-input" name="idNumber" placeholder="ID Number" onChange={handleChange} />
        <input className="signup-input" name="birthDate" type="date" onChange={handleChange} />

        <label className="signup-label">How do you want to use the app?</label>
        <select name="role" onChange={handleChange} value={form.role} className="signup-select">
        <option value="user">I'm looking for a safe place</option>
        <option value="provider">I represent a place offering safety</option>
        </select>

        <button type="submit" className="signup-button">Sign Up</button>
        <button type="button" onClick={() => navigate('/')} className="back-button">← Back</button>
        {message && <p className="signup-message">{message}</p>}
    </form>
    </div>
);
};

export default SignupForm;