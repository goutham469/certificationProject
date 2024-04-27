import React, { useState } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import store from '../../store';

function Header(props) {
  const navigate = useNavigate();
  let [changeState,updateChangeState]=useState(0)
  // console.log(store.getState().signed);
  return (
    !store.getState().signed ?
    <div className='row header bg bg-primary'>
        <div className='col-lg-8'></div>
        <div className='col-lg-1 btn btn-success m-3' onClick={() => navigate('')}>Home</div>
        <div className='col-lg-1 btn btn-success m-3' onClick={() => navigate('/SignUp')}>SignUp</div>
        <div className='col-lg-1 btn btn-success m-3' onClick={() => navigate('/SignIn')}>SignIn</div>
    </div> :
    <div className='row header bg bg-primary'>
      <div className='col-lg-8'></div>
      <div className='col-lg-1 btn btn-success m-3' onClick={() => navigate('')}>Home</div>
      <div className='col-lg-1 btn btn-success m-3' onClick={(event) => {event.preventDefault(); console.log("signedOut"); store.dispatch({type: 'LogOut'});updateChangeState(changeState+1);navigate('')}}>SignOut</div>
    </div>
  );
}

export default Header;
