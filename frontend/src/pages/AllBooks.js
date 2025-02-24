import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import './AllBooks.css'
import { handleError } from '../utils';
import { ToastContainer } from 'react-toastify';
const AllBooks = () => {
    const [books, setBooks] = useState();
    const [filteredData, setFilteredData] = useState();
    const [searchQuery, setSearchQuery] = useState('');


    const user = localStorage.getItem('token');
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

    function searchBooks(){
        if(!searchQuery){
            alert("Enter somethiing to search")
        }
        const filterData = Array.isArray(books) ? books.filter((book) => (
            book.title.toLowerCase().includes(searchQuery.toLowerCase())
        )):[]
        
        setFilteredData(filterData);
    }

    console.log(filteredData);
    useEffect(() => {
        if(!user){
            handleError("login first")
        }
        fetchBooks()
    },[])

    useEffect(()=>{
        
    })

  return (
    <div className="all-books-page">
        <div className="search">
        {
            filteredData && searchQuery ?
            <h1>Results for {searchQuery}</h1>
            :
            <h1>All books</h1>
        }
        <div className="search-books">
        <input type="text" placeholder='search books here by author or book name' onChange={(e)=>setSearchQuery(e.target.value)}/>
        <button onClick={searchBooks}>Search</button>
        </div>
        </div>
        <div className='all-books'>
    
    {

    !filteredData && searchQuery ?
    <div className="loading"></div>
    :
    filteredData ?
    filteredData.map((books, index) =>(
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

      (Array.isArray(books) && books.length > 0) ?
      books.map((books, index) => (
      
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
     <div className='loading'></div>
    }
  </div>
  <ToastContainer 
  position='top-center'
  theme='dark'
/>
    </div>
  )
}

export default AllBooks
