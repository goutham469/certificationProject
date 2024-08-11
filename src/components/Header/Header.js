import React, { useEffect, useState } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import store from '../../store';
import BlogImage from './image.png' 

function Header(props) {
  const navigate = useNavigate();
  let [changeState,updateChangeState]=useState(0)
  // console.log(store.getState().signed);

  useEffect(()=>{ 
  })
  return (
    !store.getState().signed ?
    <div>
        <div  className='header'>
          <div style={{display:"flex",justifyContent:"space-between"}} onClick={()=>{navigate('')}}>
            <img className='header-image' width="150px" src={BlogImage}/>
            <p className='header-title'>POST HUB</p>
          </div>
          <p className='text-heading-mainContent'>Empower Your Voice , Blog Your Journey</p>
          

          <div style={{textAlign:"left"}}>
            <label className='header-button' onClick={() => navigate('')}>Home</label><br/>
            <label className='header-button' onClick={() => navigate('/SignUp')}>SignUp</label><br/>
            <label className='header-button' onClick={() => navigate('/SignIn')}>SignIn</label><br/>
            <label className='header-button' onClick={() => navigate('')}>About us</label><br/>
          </div>
        </div> 
    </div> :
    <div className='row header bg bg-primary'>
      <div className='col-lg-1 col-md-1 col-sm-2 col-xs-2 col-11 btn m-3'><img width="100px" src={BlogImage}/></div>
      <div className='col-lg-8 col-md-5 col-sm-3 col-xs-3 col-12'>
      <div className='col-lg-4 col-md-7 col-sm-11 col-xs-11 col-11'>
          </div>
      </div>
      {/* <div className='col-lg-1 col-md-1 col-sm-2 col-xs-2 col-3  button008 btn m-3' onClick={() => navigate('')}>Home</div> */} 
      <div className='col-lg-1 col-md-1 col-sm-2 col-xs-2 col-3  button008  m-3' onClick={(event) => {event.preventDefault(); console.log("signedOut"); store.dispatch({type: 'LogOut'});updateChangeState(changeState+1);navigate('')}}>SignOut</div>
    </div>
  );
}

export default Header;
