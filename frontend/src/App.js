import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignupForm';
import Maps from './pages/Maps.jsx';
import MapsPage from './pages/MapsPage.jsx';


import Profile from './components/profile'; // Import the Profile component

function App() {
  return (
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/profile" element={<Profile />} />
            {/* <Route path="/maps" element={<Maps />} /> */}
            <Route path="/maps" element={<MapsPage />} />
            
            {/* Add more routes as needed */}
            {/* <Route path="/about" element={<About />} /> */}
            {/* <Route path="/contact" element={<Contact />} /> */}
            {/* <Route path="/services" element={<Services />} /> */}
            {/* <Route path="/products" element={<Products />} /> */}
          </Routes>
        </Layout>
      </Router>
  );
}

export default App;