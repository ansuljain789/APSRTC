import React from 'react'
import {BrowserRouter as Router, Route, Routes, Link, BrowserRouter } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/HomePage'
import Login from './Main Pages/Authentication/Login'
import LiveTrackerPage from './Pages/(live tracker)/LiveTrackerPage'
import RoutePlannerPage from './Pages/(live tracker)/RoutePlannerPage'
import AdminDashboard from './Pages/AdminDashboard'
import Signup from './Main Pages/Authentication/Signup'
import Driver from './Pages/Driver'
import ContactUs from './Pages/ContactUs'
import Footer from './Pages/Footer'
import RoutePlannerMLOPs from './Pages/(live tracker)/RoutePlannerMLOPs'
import AgentLogin from './Main Pages/Authentication/AgentLogin'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <HomePage/>} />
          <Route path="/newUser/login" element={<Login />} />
          <Route path="/newUser/signup" element={<Signup />} />
          <Route path="/agentLogin" element={<AgentLogin />} />
          <Route path="/admin" element={<AdminDashboard/>} />
          <Route path="/driver" element={<Driver/>} />
          <Route path="/contact" element={<ContactUs/>} />
          <Route path='/live' element={ <LiveTrackerPage/>} />
          <Route path='/planner' element={ <RoutePlannerPage/>} />
          <Route path='/admin' element={ <AdminDashboard/>} />
          <Route path='/planners' element={ <RoutePlannerMLOPs/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
