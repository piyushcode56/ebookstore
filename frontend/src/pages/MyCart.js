import React from 'react'
import { useState, useEffect } from 'react';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import './MyCart.css';
import axios from 'axios';

const MyCart = () => {
    const [cart, setCart] = useState();
    const [total, setTotal] = useState(0);

    const fetchCartData = async () => {
        try{
            const url = 'http://localhost:8080/books/cart';
            const response = await fetch(url, {
                method:'GET',
                headers:{
                    'Authorization':localStorage.getItem('token'),
                    id: localStorage.getItem('id')
                    
                }
            })
            const result = await response.json();
            setCart(result);
        }
        catch(error){
            handleError(error)
        }
    }

    const handleCartRemove = async(id) => {

        const book = cart && cart.filter((cart) => (
            cart._id === id 
            
        ))
        const bookid = book[0]._id;
        try{
            
            const url = 'http://localhost:8080/books/delete-add-to-cart';
            const response = await fetch(url, {
                method:'DELETE',
                headers:{
                    'Authorization':localStorage.getItem('token'),
                    bookid: bookid,
                    id:localStorage.getItem('id')
                }
            })
            const result = await response.json();
            const {success, error} = result;
            if(success){
                handleSuccess(success);
            }
            if(error){
                handleError(error)
            }
            
        }
        catch(error){
            handleError(error)
        }
    }
    
    function handleTotalOrderBuy() {
        cart && cart.length === 0 ?
        alert("First add something in cart"): 
        alert('')
    }
    
    useEffect(() => {
        fetchCartData();
        
    },[])

    useEffect(() => {
        if(Array.isArray(cart) && cart.length > 0){
            let total = 0;
            cart.map((items) => (
                total = total + Number(items.price)
            ))
            setTotal(total)
        }
        else{
            setTotal(0);
        }
       
    },[cart])

    useEffect(() => {
        fetchCartData();
    },[cart])

    

   
  return (
    <div className='cart-page'>
        <h1>Your cart</h1>
        {   
            Array.isArray(cart) && cart.length === 0 ?
            <img className='empty_cart' src='https://cdn-icons-png.flaticon.com/512/11329/11329060.png' alt="" />
            :
            Array.isArray(cart) && cart.map((cart) => (
                
                    <div className="cart_cards">
                        <div className="added_date">
                            <h1></h1>
                        </div>
                    <div className="cart_card_image">
                        <img src={cart.image} alt="" />
                    </div>
                    <div className="cart_card_details">
                        <h2>{cart.title}</h2>
                        <h3>{cart.author}</h3>
                        <p>{cart.description}</p>
                        <h4>Price: ${cart.price}</h4>
                        <a href={`http://localhost:3000/books/${cart._id}`} rel="noopener noreferrer">See more...</a>
                    </div>
                    <div className="cart_buttons">
                        <button className='remove_button' onClick={()=>handleCartRemove(cart._id)}>Remove</button>
                        <button className='buy_button'>Buy</button>
                    </div>
                </div>
              
            ))
        }
       <div className='pricing'>
       <h2>Total Order</h2>
        <div className='total_price'>
            <h3>Total Books: {Array.isArray(cart) && cart.length} </h3>
            <h3>Total Price: ${total}</h3>
        </div>
        <div className="cart_buttons">
        <button className='buy_button' onClick={handleTotalOrderBuy}>Buy Now</button>
        </div>
       </div>


        <ToastContainer position='top-center' theme='dark'/> 
    </div>
  )
}

export default MyCart
