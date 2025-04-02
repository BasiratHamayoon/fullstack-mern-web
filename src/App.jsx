import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import AllPosts from './Pages/AllPosts';
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs';
import Navbar from './Componenets/Navbar';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar />  
    <Routes>
      <Route path='/' element={ <Home />} />
      <Route path='/AllPosts' element= { <AllPosts /> } />
      <Route path='/AboutUs' element= { <AboutUs /> } />
      <Route path='/ContactUs' element = { <ContactUs /> } />
    </Routes>
      
    </>
  )
}

export default App
