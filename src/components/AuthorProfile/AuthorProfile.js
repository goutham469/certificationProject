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
        <div className='col-lg-3'></div>    
        <div className='col-lg-4 col-md-4 col-sm-6 col-xs-12 col-12 '><b className='textInCenter010'>{store.getState().username}</b></div>
        <div className='col-lg-1 col-md-1 col-sm-2 col-xs-2 col-3 btn button009 m-2' onClick={(event)=>{event.preventDefault();navigate('./AllArticles')}}>All Articles</div>
        <div className='col-lg-1 col-md-1 col-sm-2 col-xs-2 col-3 btn button009 m-2' onClick={(event)=>{event.preventDefault();navigate('./NewArticle')}}>Post new Ariticle</div>
        <div className='col-lg-1 col-md-1 col-sm-2 col-xs-2 col-3 btn button009 m-2' onClick={(event)=>{event.preventDefault();navigate('./Profile')}}>Profile</div>
        <div className='col-lg-1 col-md-1 col-sm-2 col-xs-2 col-3 btn button009 m-2' onClick={(event)=>{event.preventDefault();navigate('./MyArticles')}}>My articles</div>
        <div className='row'>
            <div className='col-lg-3 col-md-4 col-sm-0 col-xs-0 col-0'></div>
            <div className='col-lg-5 col-md-8 col-sm-8 col-xs-12 col-12 m-2'>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default AuthorProfile