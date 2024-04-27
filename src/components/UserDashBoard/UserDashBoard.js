import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import store from '../../store';

function UserDashBoard() {
  let navigate=useNavigate();
  console.log(store.getState())
  useEffect(()=>{
    if(store.getState().signed=='false')
    {
      navigate('/signin');
    }
  })

  return (
    <div className='row'>
      <div className='col-lg-4'></div>    
        <div className='col-lg-4'>Hi, <b>{store.getState().username}</b></div>
        <div className='col-lg-1 btn btn-success m-2' onClick={(event)=>{event.preventDefault();navigate('./Blog')}}>Blog</div>
        <div className='col-lg-1 btn btn-success m-2' onClick={(event)=>{event.preventDefault();navigate('./Profile')}}>Profile</div>
        <div className='col-lg-10'>
            <Outlet/>
        </div>
    </div>
  )
}

export default UserDashBoard