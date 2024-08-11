import React from 'react'
import './Footer.css'
import ProfileImage from './profileImage.jpg'
import { HiOutlineMail } from "react-icons/hi";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import vnrvjietLogo from './image.png'
import { useNavigate } from 'react-router-dom';

function Footer() { 

    const navigate = useNavigate()
  return (
    <div className='footer row'>
        <div className='col-lg-2 p-3'>
            <p className='text-info'><b>About me</b></p>
            <img src={ProfileImage} className='profileImage001'/>
            <p  className='FooterTextDecorationSetToNonUnderlined text-b'>Goutham reddy uppunuri</p>
            <label  className='FooterTextDecorationSetToNonUnderlined'>2nd year(IT), @</label><img className='FooterVNRVJIETLogo' src={vnrvjietLogo}/>
            <p  className='FooterTextDecorationSetToNonUnderlined'>Full stack web developer</p>
        </div>
        <div className='col-lg-3 p-3'>
            <p className='text-info'><b>Contact me</b></p>
            <div className='textAlignLeft001'>
                <HiOutlineMail className='footerIcon001' color='black' size={30}/>
                <a className='FooterTextDecorationSetToNonUnderlined' href='mailto:uppinurigouthamreddy@gmail.com'>gouthamreddyuppinuri@gmail.com</a>
                <br/>

                <FaPhoneAlt size={20} className='footerIcon001' color='black'/>
                <label className='FooterTextDecorationSetToNonUnderlined'>  +91 9398141936</label>
                <br/>

                <FaLinkedinIn size={22} className='footerIcon001' color='black'/>
                <a  className='FooterTextDecorationSetToNonUnderlined' href='https://www.linkedin.com/in/goutham-reddy-279782283?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'>Goutham reddy</a>
                <br/>

                <FaInstagram size={30} className='footerIcon001' color='black'/>
                <a className='FooterTextDecorationSetToNonUnderlined' href='https://www.instagram.com/go.utham8129?igsh=MTFpM3Q5eHhoMHpjMQ=='>Instagram</a>
            </div>
        </div>
        <div className='col-lg-3 p-3'>
            <p className='text-info'><b>API services</b></p>
            <p  className='FooterTextDecorationSetToNonUnderlined'>get API key</p>
            <a  className='FooterTextDecorationSetToNonUnderlined' href='https://certificationprojectserver.onrender.com/' target='_blank'>services available</a>
            <p  className='FooterTextDecorationSetToNonUnderlined'>pricing</p>
            <p className='FooterTextDecorationSetToNonUnderlined'   onClick={()=>navigate('/admin')}>admin dashboard</p>
        </div>
        <div className='col-lg-3 p-3'>
            <p className='text-info'><b>Help</b></p>
            <p className='FooterTextDecorationSetToNonUnderlined'>Explore the application</p>
            <p className='FooterTextDecorationSetToNonUnderlined'>get started</p>
            <p className='FooterTextDecorationSetToNonUnderlined'>pro version</p>
            <label  className='FooterTextDecorationSetToNonUnderlined'>Ask AI</label>
            <input className='footerHelpInput'></input>
            <IoMdSend size={35} color='white' />
            
        </div>
        
    </div>
  )
}

export default Footer