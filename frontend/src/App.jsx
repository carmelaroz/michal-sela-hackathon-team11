import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignupForm';
import { EditRoomForm } from './components/editRoomForm';
import { useAuthContext } from './context/AuthContext';

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
            <Route path="/place/:id" element={<EditRoomForm />}>
    </Route>
          </Routes>
        </Layout>
      </Router>
  );
}

export default App;