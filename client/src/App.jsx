import React from 'react'
import {BrowserRouter as Router, Route, Routes, Link, BrowserRouter } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/HomePage'
import Login from './Main Pages/Authentication/Login'
import Signup from './Main Pages/Authentication/Signup'
import AdminDashboard from './Pages/AdminDashboard'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <HomePage/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App