import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import store from '../../store';

function UserDashBoard() {
  let navigate=useNavigate();
  
  useEffect(()=>{
    console.log(store.getState())
    if(store.getState().signed==false)
    {
      // console.log("hi you are not signed in");
      navigate('/SignIn')
    }
  })

  return (
    <div className='row'>
      <div className='col-lg-4'></div>    
        <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4 col-10 m-2'><b className='userName008'>{store.getState().username}</b></div>
        <div className='col-lg-0 col-md-5 col-sm-1 col-xs-1 col-3'></div>
        <div className='col-lg-1 col-md-1 col-sm-2 col-xs-2 col-2 button009 btn m-2' onClick={(event)=>{event.preventDefault();navigate('./Blog')}}>Blog</div>
        <div className='col-lg-1 col-md-1 col-sm-2 col-xs-2 col-2 button009 btn m-2' onClick={(event)=>{event.preventDefault();navigate('./Profile')}}>Profile</div>
        <div className='col-lg-10'>
            <Outlet/>
        </div>
    </div>
  )
}

export default UserDashBoard