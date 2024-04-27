import React from 'react'
import './Body.css'
import {Outlet} from 'react-router-dom';

import store from '../../store';

import Header from '../Header/Header'
import Footer from '../Footer/Footer'

function Body() {
    
  return (
    <div className='body bodyElement'>
        <Header data={store}/>
        <div className='mainBodyElement'><Outlet/></div>
        <Footer/>
    </div>
  )
}

export default Body