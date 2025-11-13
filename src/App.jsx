import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './pages/Homepage'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

function App() {
  

  return (
    <>
      <div className='App'>
        <Navbar />
        <HomePage />
        <Footer />
      </div>
    </>
  )
}

export default App
