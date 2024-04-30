import React from 'react'
import './Footer.css'
import ProfileImage from './profileImage.jpg'
import { HiOutlineMail } from "react-icons/hi";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";

function Footer() {
  return (
    <div className='footer row'>
        <div className='col-lg-2 p-3'>
            <p className='text-info'><b>About me</b></p>
            <img src={ProfileImage} className='profileImage001'/>
            <p className='text-danger'>Goutham reddy uppunuri</p>
            <p className='text-danger'>2nd year(IT), @VNR VJIET</p>
            <p className='text-danger'>Full stack web developer</p>
        </div>
        <div className='col-lg-3 textAlignLeft001 p-3'>
            <p className='text-info'><b>Contact me</b></p>
            <HiOutlineMail className='footerIcon001' color='red' size={30}/>
            <a href='mailto:uppinurigouthamreddy@gmail.com'>gouthamreddyuppinuri@gmail.com</a>
            <br/>

            <FaPhoneAlt size={20} className='footerIcon001' color='yellow'/>
            <label className='text-danger'>  +91 9398141936</label>
            <br/>

            <FaLinkedinIn size={22} className='footerIcon001' color='blue'/>
            <a href='https://www.linkedin.com/in/goutham-reddy-279782283?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'>Goutham reddy</a>
            <br/>

            <FaInstagram size={30} className='footerIcon001' color='red'/>
            <a href='https://www.instagram.com/go.utham8129?igsh=MTFpM3Q5eHhoMHpjMQ=='>Instagram</a>
        </div>
        <div className='col-lg-3 p-3'>
            <p className='text-info'><b>API services</b></p>
            <p className='text-danger'>get API key</p>
            <a className='text-danger' href='https://certificationprojectserver.onrender.com/' target='_blank'>services available</a>
            <p className='text-danger'>pricing</p>
            <p className='text-danger'>Contact sales team</p>
        </div>
        <div className='col-lg-3 p-3'>
            <p className='text-info'><b>Help</b></p>
            <p className='text-danger'>Explore the application</p>
            <p className='text-danger'>get started</p>
            <p className='text-danger'>pro version</p>
            <label className='text-danger'>Ask AI</label>
            <input className='footerHelpInput'></input>
            <IoMdSend size={35} color='white' />
        </div>
        
    </div>
  )
}

export default Footer