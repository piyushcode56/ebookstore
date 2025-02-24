import React from 'react'
import './Upload.css';
import { useState } from 'react';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
const Upload = () => {
    const [bookData, setBookData] = useState({
        image:'',
        title:'',
        author:'',
        description:'',
        price:'',
        amazonLink:'',
       
    })

    const [file, setFile] = useState('');

    const handleFileData = (e) => {
        setFile(e.target.files[0]);
    }

    const handleBookData = (e) => {
        const {name, value} = e.target;

        setBookData((prevData) => ({
            ...prevData,
            [name]:value
        }))
        
    }
    const handleBookSubmit = async(e) => {
        e.preventDefault();
        
        try{
            const formData = new FormData();
            formData.append("bookData", JSON.stringify(bookData));
            formData.append('pdf', file);
            
            // console.log(bookData, file);

            const url = 'http://localhost:8080/books/uploads';
            const response = await fetch(url, {
                method:"POST",
                body:formData
            })
            console.log(formData);
            const result = await response.json();
            const {success, message} = result;
            if(success){
                handleSuccess("Book added in the database")
            }
            if(message){
                handleError(message);
            }
            // setBookData({
            //     image:'',
            //     title:'',
            //     author:'',
            //     description:'',
            //     price:'',
            //     amazonLink:''
            // })
            
        }
        catch(error){
            console.log(error);
        }
    }
    
  return (
    <div className='upload-page'>
        <h2 style={{textAlign:'center'}}>Upload books here</h2>
      <form action="" className='upload-form' onSubmit={handleBookSubmit}>
      <input type="text" name='image' placeholder='provide image url' required value={bookData.image} onChange={handleBookData}/>  
      <input type="text" name='title' placeholder='Enter book name' required value={bookData.title} onChange={handleBookData}/> 
      <input type="text" name='author' placeholder='Enter author name' value={bookData.author} required onChange={handleBookData}/> 
      <textarea name="description" id="" placeholder='Write something about book' value={bookData.description} rows={8} onChange={handleBookData}></textarea> 
      <input type="text" name='price' placeholder='Enter price of book' value={bookData.price} required onChange={handleBookData}/> 
      <input type="text" name='amazonLink' placeholder='Provide amazon link if available' required  value={bookData.amazonLink} onChange={handleBookData}/> 
      <input type="file" name='pdf' placeholder='filename' accept='application/pdf' required onChange={handleFileData}/> 

      <button type='submit'>Upload</button>
      </form>
      <ToastContainer
      position='top-right'
      theme='dark'
      />
    </div>
  )
}

export default Upload
