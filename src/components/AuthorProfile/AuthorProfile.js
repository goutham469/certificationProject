import React, { useEffect, useState } from 'react'
import './AuthorProfile.css'
import store from '../../store';
import { Outlet, useNavigate } from 'react-router-dom';


function AuthorProfile() {

    let navigate=useNavigate();

    useEffect(()=>{
        // console.log(store.getState())
        // console.log("hi")
        if(store.getState().signed==false)
        {
            console.log("hi you are not signed in");
            navigate('/SignIn')
        }
        else if(store.getState().userType == 'user')
        {
            navigate('../UserProfile')
        }
    })

    
  return (
    <div className='row'>
        <div className='col-lg-8'></div>    
        <div className='col-lg-4'><b>{store.getState().username}</b></div>
        <div className='col-lg-1 btn btn-success m-2' onClick={(event)=>{event.preventDefault();navigate('./NewArticle')}}>Post new Ariticle</div>
        <div className='col-lg-1 btn btn-success m-2' onClick={(event)=>{event.preventDefault();navigate('./Profile')}}>Profile</div>
        <div className='col-lg-1 btn btn-success m-2' onClick={(event)=>{event.preventDefault();navigate('./MyArticles')}}>My articles</div>
        <div className='row'>
            <div className='col-lg-3'></div>
            <div className='col-lg-5'>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default AuthorProfile