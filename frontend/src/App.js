import React, { useState } from 'react'
import {Routes, Route, Navigate, Router} from 'react-router-dom'; 
import HomePage from './pages/HomePage';
import Signup from './components/Signup';
import Login from './components/Login';
import RefreshHandler from './RefreshHandler';
import './App.css';
import Upload from './pages/Upload';
import BookPage from './pages/BookPage';
import ShowPdf from './pages/ShowPdf';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AllBooks from './pages/AllBooks';
import MyCart from './pages/MyCart';
const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const PrivateRoute = ({element})=>{

    // console.log(element);
    return isAuthenticated ? element : <Navigate to={'/login'}/>
  }
  return (
    
    <div className='App'>
      
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Navbar setSearchQuery={setSearchQuery} searchQuery={searchQuery}/>
      <Routes>
          <Route path='/' element={<Navigate to = '/login'/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/home' element={<PrivateRoute element={<HomePage setSearchQuery={setSearchQuery} searchQuery={searchQuery}/>}/>}/>
          {/* <Route path='/*' element={<h1>No available page on this path</h1>}/> */}
          <Route path='/books/uploads' element={<Upload/>}/>
          <Route path='/books/:id' element={<BookPage/>}/>
          <Route path='/books/pdf/:id' element={<ShowPdf/>}/>
          <Route path='/allbooks' element={<AllBooks/>}/>
          <Route path='/mycart' element={<MyCart/>}/>
      </Routes>
      <Footer/>
      
    </div>
    
  )
}

export default App


