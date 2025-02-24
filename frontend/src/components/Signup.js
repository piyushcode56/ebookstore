import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import {ToastContainer} from 'react-toastify';
import './Signup.css';
const Signup = () => {
    const navigate = useNavigate();
    const [signupData, setSignupData] = useState({
        name:'',
        username:'',
        email:'',
        password:''
    })

    const handleSignupData = (e) => {
        const {name, value} = e.target;

        setSignupData((prevData) => ({
            ...prevData,
            [name]:value
        }))
    }

    console.log(signupData);

    const handleSignupSubmit = async(e) => {
        e.preventDefault();
        const {name, username, email, password} = signupData;
        
        if(!name || !username || !email || !password){
            handleError("All the field is required");
        }
        try{
            const url = 'http://localhost:8080/signup';
            const response = await fetch(url, {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(signupData)
            });
            const result = await response.json();
            const {success, message} = result;
            if(success){
                handleSuccess("Account created successfully");
                setTimeout(()=>{
                    navigate('/login');
                },2000)
            }
            console.log(result);
            if(message){
                handleError("User of this email is already present kindly login");
            }
        }
        catch(error){
            handleError("sorry! internal server error")
        }

    }

  return (
    <div className='signup-page'>
      <form className='signup-form' onSubmit={handleSignupSubmit}>
            <h1 style={{textAlign:'center'}}>Signup</h1>
           
            <input type="text"  name='name'id='name' placeholder='Enter your name ' value={signupData.name} onChange={handleSignupData} />    

            <input type="text" placeholder='Create your username' name='username' id='name'  value={signupData.username} onChange={handleSignupData}/>
      
            <input type="email" placeholder='Enter your email' name='email' id='email'  value={signupData.email} onChange={handleSignupData} />

            <input type="text" placeholder='Create your password' name='password' id='password'   value={signupData.password} onChange={handleSignupData} />
            
            <button style={{marginLeft:'30px', marginTop:'20px'}} type='submit'>Signup</button>

            <div className='others'>
                <p>Already registered? <Link to={'/login'} className='login'>Login</Link></p>
                
            </div>
      </form>
      <ToastContainer
        position='top-right'
        theme='dark'
      />
    </div>
  )
}

export default Signup
