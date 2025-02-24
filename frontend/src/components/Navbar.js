import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { handleError, handleSuccess } from '../utils';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
const Navbar = ({setSearchQuery}) => {

    useEffect(()=>{
            setLoggedInUser(localStorage.getItem('loggedInUser'))
        },[])
    const navigate = useNavigate();
    const [loggedInUser, setLoggedInUser] = useState('');
    

    function handleLogout(){
            if(!loggedInUser){
                return alert('No user available')
            }
            Swal.fire({
                title: "Do you want to Logout?",
                // showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Yes",
                denyButtonText: `Don't save`
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                localStorage.removeItem('loggedInUser');
                localStorage.removeItem('token');
                handleSuccess(`${loggedInUser} logged out`)
                setTimeout(() => {
                    navigate('/login')
                },1000)
                } 
              });
            
            // navigate('/signup')
        }


  return (
    <div>
      <nav>
        <div>
            <Link to={'/home'}><a href='/home'>ReadBook</a></Link>
        </div>
        {/* <div className="search-books">
            <input type="text" placeholder='Search by book name or author name' onChange={(e)=>setSearchQuery(e.target.value)}/>
            <button>Search</button>
        </div> */}
        <h1>Welcome - {
            !loggedInUser 
            ?    
            'user' 
            :
            loggedInUser
            }</h1>
      <div className="user-login">
      <Link to={'/signup'} style={{marginRight:'15px'}}><a href="/signup">Signup</a></Link>
      <Link to={'/login'}><a href="/login">Login</a></Link>
      <Link to={'/allbooks'} ><a href='/allbooks' style={{marginLeft:'15px'}}>Allbooks</a></Link>
      <Link to={'/mycart'}><a href='/mycart' style={{marginLeft:'15px'}}>Mycart</a></Link>
    </div> 
      <button onClick={handleLogout} className='logout-button'> Logout</button>
      </nav>
      
    </div>
  )
}

export default Navbar
