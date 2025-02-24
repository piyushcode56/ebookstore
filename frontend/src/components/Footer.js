import React from 'react'
import bookImage from '../assets/bookImage.png';
import './Footer.css'
const Footer = () => {
  return (
    <div>
      <div className="footer-section">
        <div className="footer-first-section">
            <img src={bookImage} alt="" />
        </div>
        <div className="footer-second-section">
            <div className="company">
                <h2>Company</h2>
                <ul>
                    <li>About us</li>
                    <li>Careers</li>
                    <li>Terms</li>
                    <li>Privacy</li>
                    <li>Help</li>
                </ul>
            </div>
            <div className="connect">
                <h2>Connect</h2>
            <ul>
           <li> <i class="fa-brands fa-facebook"></i></li>
            <li><i class="fa-brands fa-instagram"></i></li>
            <li><i class="fa-brands fa-github"></i></li>
            <li><i class="fa-brands fa-linkedin"></i></li>
            </ul>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
