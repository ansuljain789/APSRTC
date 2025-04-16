import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage';
import Login from './Main Pages/Authentication/Login';
import Signup from './Main Pages/Authentication/Signup';
import ContactUs from './Pages/ContactUs';
import Footer from './Pages/Footer'; // Make sure the path matches where you save Footer.jsx

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
