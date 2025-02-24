import React, { useState } from 'react'
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import './Login.css';
const Login = () => {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        username:'',
        password:''
    })

    const handleLoginData = (e) => {
        const {name, value} = e.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]:value
        }))
    }

    const handleLoginSubmit = async(e) => {
        e.preventDefault();

        const {username, password} = loginData;
        if(!username || !password){
            handleError("Enter username and password then try")
        }

        try{
        const url = 'http://localhost:8080/login';
        const response = await fetch(url, {
            method:'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body:JSON.stringify(loginData)
        })
        const result = await response.json();
        console.log(result);
        const {success, message, error, username, jwtToken, id} = result;
        if(success){
            handleSuccess("Login successfully")
            localStorage.setItem('token', jwtToken);
            localStorage.setItem('loggedInUser', username);
            localStorage.setItem('id', id)
            setTimeout(() => {
                navigate('/home');
            })
        }
        if(message){
            handleError("Invalid username or password")
        }
        if(error){
            const details = error.details[0].message;
            handleError(details);
        }
        }
        catch(error){
            handleError("internal server error");
         }
    }

  return (
    <div className='login-page'>
       <form className='login-form' onSubmit={handleLoginSubmit}>
        <h1 style={{textAlign:'center'}}>Login</h1>
            
            <input type="text" placeholder='Enter your username' name='username' id='name'  value={loginData.username} onChange={handleLoginData}/>
            
            <input type="text" placeholder='Enter your password' name='password' id='password'  value={loginData.password} onChange={handleLoginData}/>
            <button type='submit' >Login</button>
            <div className='others'>
                <p>New user? <Link to={'/signup'} className='register'>Create account</Link></p>
                
            </div>
        </form>
        <ToastContainer
        position='top-right'
        theme='dark'
        />
    </div>
  )
}

export default Login
