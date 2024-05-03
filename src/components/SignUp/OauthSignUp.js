import React from 'react'
import Login from './Login'
import './SignUp.css'

function OauthSignUp() {
  return (
    <div className='OauthSignUpToSetBackGroundImage'>
        <h2>Google OAuth Register</h2>
        <p>your email id will be taken as the registering mail for this application.</p>
        <p>default password will be your emailid</p>
        <div className='ToAlignItemsToPerfectCenter'>
            <Login/>
        </div>
    </div>
  )
}

export default OauthSignUp