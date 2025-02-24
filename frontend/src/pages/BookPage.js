import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './BookPage.css';
import ShowPdf from './ShowPdf';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
const BookPage = ({children}) => {
    const [book, setBook] = useState('');
    // const [pdfUrl, setPdfUrl] = useState();
    const {id} = useParams();
    const location = useLocation();
    
    // console.log(id);
    const fetchBook = async() => {
        try{
            const url = `http://localhost:8080/books/book/${id}`;
            // const headers = {
                
            //     headers:{
            //         'Authorization':localStorage.getItem('token')
            //     }
            // }
            const response = await fetch(url, {
                method:'GET',
                headers: {
                    'Authorization':localStorage.getItem('token'),
                    'Content-Type':'application/json'
                },
                
            });
            const result = await response.json();
            // console.log(result);
            setBook(result);
            // console.log(book);
            
        }
        
        catch(error){
            console.log(error);
        }
    }
    

    const handleCart = async() => {
        try{
            const url = 'http://localhost:8080/books/add-to-cart'
            const response = await fetch(url, {
                method:'PUT',
                headers:{
                    'Authorization':localStorage.getItem('token'),
                    bookid: book._id,
                    id: localStorage.getItem('id')
                }
            })

            const result = await response.json();
            const {message, success} = result;
            console.log(message);
            if(message){
                handleError(message);
            }
            if(success){
                handleSuccess(success);
            }
        }
        catch(error){
            console.log(error);
        }
    }

    // const displayPdf = (pdfUrl) => {
    //     const iframe = document.createElement('iframe');
    //     iframe.src = pdfUrl;
    //     iframe.width = '100%'
    //     iframe.height = '500px'
    //     document.getElementById('pdf-container').appendChild(iframe);
    // }
    // useEffect(() =>{
    //     if(pdfUrl){
    //         displayPdf(pdfUrl);
    //     }
    // },[pdfUrl])



    
    useEffect(()=>{
        fetchBook();
    },[id])

    useEffect(()=>{
        fetchBook();
    },[book])
  return (
    
    <div className='book-page'>
     
        {
            <div className='book'>
                <div className="book-image">
                    <h2>{book.title}</h2>
                    <h4>{book.author}</h4>
                <img src={book.image} alt="" />
                </div>
                <div className="book-other-details">
                    <p>{book.description}</p>
                    <p>Other links: <a href={book.amazonLink} target='blank'>amazon link</a></p>
                    <p>Price: <strong>${book.price}</strong></p>
                    {/* <a href={book.pdf}>Read Now</a> */}
                    <div className="product-links" id='pdf-container'>
                       {/* {
                        location.pathname === `/books/${book._id}`? <a href={`/books/pdf/${book.id}`}>Read Now</a>
                         : <ShowPdf pdfUrl = {pdfUrl} />
                       } */}
                       <div className="read-now">
                       <a href={`/books/pdf/${book._id}`} target='blank'>Read Now</a>
                       </div>
                        <div className="buy-now">
                        <a className='buy-now'>Buy Now</a>
                        </div>
                    </div>
                    <div className="add-to-cart">
                    <i onClick={handleCart} class="fa-solid fa-cart-shopping"></i>
                    </div>
                </div>
            </div>
        }
        <ToastContainer
        position='top-center'
        theme='dark'
        />
    </div>
    
  )

}

export default BookPage

