import React, { useState } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import store from '../../store';
import BlogImage from './image.png'

function Header(props) {
  const navigate = useNavigate();
  let [changeState,updateChangeState]=useState(0)
  // console.log(store.getState().signed);
  return (
    !store.getState().signed ?
    <div className='row header bg bg-primary'>
        <div className='col-lg-1 col-md-1 col-sm-2 col-xs-2 col-2 btn m-3' onClick={()=>{navigate('')}}><img width="100px" src={BlogImage}/></div>
        <div className='col-lg-6 col-md-3 col-sm-3 col-xs-0 col-10'></div>
        <div className='col-lg-1 col-md-1 col-sm-2 col-xs-2 col-2 button008 btn m-3' onClick={() => navigate('')}>Home</div>
        <div className='col-lg-1 col-md-1 col-sm-2 col-xs-2 col-2 button008 btn m-3' onClick={() => navigate('/SignUp')}>SignUp</div>
        <div className='col-lg-1 col-md-1 col-sm-2 col-xs-2 col-2 button008 btn m-3' onClick={() => navigate('/SignIn')}>SignIn</div>
    </div> :
    <div className='row header bg bg-primary'>
      <div className='col-lg-1 col-md-1 col-sm-2 col-xs-2 col-2 btn m-3'><img width="100px" src={BlogImage}/></div>
      <div className='col-lg-9 col-md-5 col-sm-3 col-xs-3 col-1'></div>
      {/* <div className='col-lg-1 col-md-1 col-sm-2 col-xs-2 col-3  button008 btn m-3' onClick={() => navigate('')}>Home</div> */}
      <div className='col-lg-1 col-md-1 col-sm-2 col-xs-2 col-3  button008 btn m-3' onClick={(event) => {event.preventDefault(); console.log("signedOut"); store.dispatch({type: 'LogOut'});updateChangeState(changeState+1);navigate('')}}>SignOut</div>
    </div>
  );
}

export default Header;
