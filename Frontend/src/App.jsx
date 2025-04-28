import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './Componenets/Navbar';
import Blogs from './Pages/Blogs';
import Favorite from './Pages/Favorite';
import Bookmark from './Pages/Bookmark';
import CreatePost from './Pages/CreatePost';
import Login from './Pages/Login';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar />  
    <Routes>
      <Route path='/' element={ <Home />}/>
      <Route path='/blogs' element= { <Blogs /> } />
      <Route path='/favorite' element= { <Favorite /> } />
      <Route path='/bookmark' element = { <Bookmark /> } />
      <Route path='//create-post' element = { <CreatePost /> } />
      <Route path='/login' element = { <Login /> } />
    </Routes>
      
    </>
  )
}

export default App
