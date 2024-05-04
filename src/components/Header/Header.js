import React, { useEffect, useState } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import store from '../../store';
import BlogImage from './image.png'
import { CiSearch } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";

function Header(props) {
  const navigate = useNavigate();
  let [changeState,updateChangeState]=useState(0)
  // console.log(store.getState().signed);

  useEffect(()=>{
    deleteSearchBar()
  })
  function addSearchBar(){
    document.getElementById('InputElementForSearchInHeaderOuter').classList.remove("InputElementForSearchInHeaderOuterIsVisible");
  }
  function deleteSearchBar(){
    document.getElementById('InputElementForSearchInHeaderOuter').classList.add("InputElementForSearchInHeaderOuterIsVisible");
  }
  return (
    !store.getState().signed ?
    <div className='row header'>
        <div className='col-lg-1 col-md-1 col-sm-2 col-xs-2 col-11' onClick={()=>{navigate('')}}><img width="150px" src={BlogImage}/></div>
        <div className='col-lg-5 col-md-3 col-sm-3 col-xs-0 col-10'></div>

        <div className='col-lg-1 col-md-1 col-sm-2 col-xs-2 col-2 button008' onClick={() => navigate('')}>Home</div>
        <div className='col-lg-1 col-md-1 col-sm-2 col-xs-2 col-2 button008' onClick={() => navigate('/SignUp')}>SignUp</div>
        <div className='col-lg-1 col-md-1 col-sm-2 col-xs-2 col-2 button008' onClick={() => navigate('/SignIn')}>SignIn</div>
        <div className='col-lg-1 col-md-1 col-sm-2 col-xs-3 col-3 button008' onClick={() => navigate('')}>About us</div>
        <div className='col-lg-1 col-md-1 col-sm-2 col-xs-2 col-2 button008' onClick={()=>{addSearchBar()}} ><CiSearch/></div>
        <div></div>
        <div className='col-lg-6 col-md-8 col-sm-12 col-xs-12 col-12'>
          <p className='text-heading-mainContent'>"Empower Your Voice:Blog Your Journey."</p>
        </div>
        <div className='col-lg-4 col-md-7 col-sm-11 col-xs-11 col-11'>
          <div id='InputElementForSearchInHeaderOuter' className='InputElementForSearchInHeaderOuter2'>
            <RxCross1 size={35} className='InputElementForSearchInHeaderInner1' onClick={()=>{deleteSearchBar()}}/>
            <input className='InputElementForSearchInHeaderInner2' placeholder='start typing to search' type='text'/>
          </div>
        </div>
    </div> :
    <div className='row header bg bg-primary'>
      <div className='col-lg-1 col-md-1 col-sm-2 col-xs-2 col-11 btn m-3'><img width="100px" src={BlogImage}/></div>
      <div className='col-lg-8 col-md-5 col-sm-3 col-xs-3 col-12'>
      <div className='col-lg-4 col-md-7 col-sm-11 col-xs-11 col-11'>
            <div id='InputElementForSearchInHeaderOuter' className='InputElementForSearchInHeaderOuter2'>
              <RxCross1 size={35} className='InputElementForSearchInHeaderInner1' onClick={()=>{deleteSearchBar()}}/>
              <input className='InputElementForSearchInHeaderInner2' placeholder='start typing to search' type='text'/>
            </div>
          </div>
      </div>
      {/* <div className='col-lg-1 col-md-1 col-sm-2 col-xs-2 col-3  button008 btn m-3' onClick={() => navigate('')}>Home</div> */}
      <div className='col-lg-1 col-md-1 col-sm-2 col-xs-2 col-5 button008' onClick={()=>{addSearchBar()}} ><CiSearch size={30}/></div>
      <div className='col-lg-1 col-md-1 col-sm-2 col-xs-2 col-3  button008  m-3' onClick={(event) => {event.preventDefault(); console.log("signedOut"); store.dispatch({type: 'LogOut'});updateChangeState(changeState+1);navigate('')}}>SignOut</div>
    </div>
  );
}

export default Header;
