import React from 'react';
import './HomePage.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

    const navigate = useNavigate();

    return (
        <div className="home-container">
        <h2 className="home-heading">Welcome to Safe Area</h2>
        <p className="home-paragraph">
            This app helps women in distress find safe places nearby.
        </p>
        <button className="home-button" onClick={() => navigate('/login')}>Login</button>
        <button className="home-button" onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
  );
};

export default HomePage;
