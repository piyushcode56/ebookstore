import React from 'react'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
const ShowPdf = () => {

    const [pdfUrl, setPdfUrl] = useState();
    const {id} = useParams();
    const fetchPdf = async () => {
        try{
            const url = `http://localhost:8080/books/book/${id}`;
            const response = await fetch(url, {
                method:'GET',
                headers:{
                    'Authorization':localStorage.getItem('token'),
                   
                }
            })
            const result = await response.json();
            const pdfFileName = result.pdf;
            const newPdfUrl = `http://localhost:8080/uploads/${pdfFileName}`
            // console.log(newPdfUrl);
            if(pdfUrl != newPdfUrl){
                setPdfUrl(newPdfUrl);
            }
        }
    
        catch(error){
            console.log('pdf cannot be fetched', error)
        }
    }

    const displayPdf = (pdfUrl) => {
       const container = document.getElementById('pdf-container');
       container.innerHTML = '';
       if(pdfUrl){
        const iframe = document.createElement('iframe');
        iframe.src = pdfUrl;
        iframe.width = '100%';
        iframe.height = '1000px';
        console.log(iframe.src)
        container.appendChild(iframe);
       }
    }

    useEffect(()=>{
        fetchPdf(); 
    },[id])

    useEffect(() => {
        displayPdf(pdfUrl)
    },[pdfUrl])

    

  return (
    <div id='pdf-container'>
      
    </div>
  )
}

export default ShowPdf


