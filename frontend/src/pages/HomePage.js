import React from 'react';
import './HomePage.css'; // Import the CSS file

const HomePage = () => {
  return (
    <div className="home-container">
      <h2 className="home-heading">Welcome to Safe Area</h2>
      <p className="home-paragraph">
        This app helps women in distress find safe places nearby.
      </p>
      <button className="home-button">Login</button>
      <button className="home-button">Sign Up</button>
    </div>
  );
};

export default HomePage;