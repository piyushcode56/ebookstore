import React from 'react'
import {useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const RefreshHandler = ({setIsAuthenticated}) => {
    const location = useLocation();
    const navigate = useNavigate();
    
    useEffect(() => {
        if(localStorage.getItem('token')){
            setIsAuthenticated(true);
            if(location.pathname === '/' || location.pathname === '/signup' || location.pathname === '/login'){
                navigate('/home', {replace:false})
            }
        } 
    },[location, setIsAuthenticated, navigate])
  return (
    <div></div>
  )
}

export default RefreshHandler
