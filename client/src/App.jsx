import React from 'react'
import {BrowserRouter as Router, Route, Routes, Link, BrowserRouter } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/HomePage'
import Login from './Main Pages/Authentication/Login'
import LiveTrackerPage from './Pages/(live tracker)/LiveTrackerPage'
import RoutePlannerPage from './Pages/(live tracker)/RoutePlannerPage'
import AdminDashboard from './Pages/AdminDashboard'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <HomePage/>} />
          <Route path='/live' element={ <LiveTrackerPage/>} />
          <Route path='/planner' element={ <RoutePlannerPage/>} />
          <Route path='/admin' element={ <AdminDashboard/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App