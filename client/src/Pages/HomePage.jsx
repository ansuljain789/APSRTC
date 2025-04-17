import React from 'react'
import Navbar from '../Pages/Navbar'
import MainPage from './MainPage'
import CardContainer from './CardContainer'
import Driver from './Driver'

const HomePage = () => {
  return (
   <>
    <Navbar/>
    <MainPage/>
    <CardContainer />
   </>
  )
}

export default HomePage