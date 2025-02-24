import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './HomePage.css';
import { ToastContainer } from 'react-toastify';
import { handleSuccess } from '../utils';
import bookImage from '../assets/bookImage.png';

const HomePage = ({searchQuery}) => {
    const [books, setBooks] = useState('');

    // const [book, setBook] = useState('');
    
    // useEffect(()=>{
    //     setLoggedInUser(localStorage.getItem('loggedInUser'))
    // },[])

    // function handleLogout(){
    //     if(!loggedInUser){
    //         return alert('No user available')
    //     }
    //     Swal.fire({
    //         title: "Do you want to Logout?",
    //         // showDenyButton: true,
    //         showCancelButton: true,
    //         confirmButtonText: "Yes",
    //         denyButtonText: `Don't save`
    //       }).then((result) => {
    //         /* Read more about isConfirmed, isDenied below */
    //         if (result.isConfirmed) {
    //         localStorage.removeItem('loggedInUser');
    //         localStorage.removeItem('token');
    //         handleSuccess(`${loggedInUser} logged out`)
    //         setTimeout(() => {
    //             navigate('/login')
    //         },1000)
    //         } 
    //       });
        
    //     // navigate('/signup')
    // }

    // const fetchProducts = async () => {
    //     try{
    //         const url = 'http://localhost:8080/products';
    //         const headers = {
    //             headers:{
    //                 'Authorization': localStorage.getItem('token')
    //             }
    //         }
    //         const response = await fetch(url, headers);
    //         const result = await response.json();
    //         // console.log(result);
    //         setProducts(result);
    //     }
    //     catch(error){

    //     }
    // }

    const fetchBooks = async() => {
        try{
            const url = 'http://localhost:8080/books';
            const headers = {
                headers:{
                    'Authorization':localStorage.getItem('token')
                }
            }
            const response = await fetch(url, headers);
            const result = await response.json();
            setBooks(result);
            
        }
        catch(error){
            console.log(error);
        }
    }



    // const filteredData = books && books.filter((book) => (
    //     book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //     book.title.toLowerCase().includes(searchQuery.toLowerCase())
    // ))


    useEffect(()=>{
        // fetchProducts();
        fetchBooks();  
        
    },[])

    useEffect(() => {
        fetchBooks();
    },[books])

    // console.log(books.slice(0,10))


  return (
    <div className='home-page'>
        <div className="home-page-first-section">
            <div className="home-page-image">
            <img className='home-page-image' src={bookImage} alt="" />
            </div>
            <div className="home-page-text">
                <h1>Discover your next great book</h1>
                <p>Uncover captivating stories, enriching knowledge, and endless inspiration in our curated collection of books</p>
                <Link to={'/allbooks'}><button>Discover Books</button></Link>
            </div>
        </div>
      {/* <nav>
        <div>
            <Link to={'/home'}><a href='/home'>ReadBook</a></Link>
        </div>
        <div className="search-books">
            <input type="text" placeholder='Search books'/>
            <button>Search</button>
        </div>
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
      
    </div> 
      <button onClick={handleLogout} className='logout-button'> Logout</button>
      </nav> */}

        
        
        <ToastContainer
        position='top-right'
        theme='dark'
        />
        <div className="books" id='books'>
            <div className="latest-books">
                <h1 style={{marginBottom:'20px'}}>Latest Books</h1>
            </div>
            {/* {
                products && products?.map((product, index) => (
                 <ul key={index}>
                    <span>{product.name}:{product.price}</span>
                 </ul>
                ))
            } */}

           <div className="books-collection">
          
               
                {
                
                (books && Array.isArray(books) && books.length > 0) ?
                 books.slice(0, 20).map((books, index) => (
                   
                    <ul className='book-cards' key={books._id}>
                        <h3>{books.title}</h3>
                        <img src={books.image} alt=""/>
                        <h4>Author: {books.author}</h4>
                        <p>{books.description.slice(0,50)}</p>
                        <p>Price: <strong>${books.price}</strong></p>
                         <a href={`/books/${books._id}`} rel="noopener noreferrer">See more...</a>
                    </ul>
                    
                ))
                :
               <div className="loading"></div>
            }
               
           </div>
        
        </div>
    </div>
  )
}

export default HomePage
