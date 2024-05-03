import React from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'



function Home() {
  
  let navigate=useNavigate();
  return (
    <div className='scrollingImage'>
        <div className='mainHeader'>
            <p className='textHeading1'>Publish your articles,your passion,your way</p>
            <p className='textHeading2'>create dynamic blogs easily</p>
            <button className='btn007' onClick={()=>{navigate('/SignUp')}}>CREATE YOUR BLOG</button>
            
        </div>
        
    </div>
  )
}

export default Home