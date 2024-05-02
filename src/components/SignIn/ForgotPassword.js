import React, { useState } from 'react'
import './SignIn.css'
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const navigate=useNavigate();
    let [userEmail,updateUserEmail]=useState();
    let [otpFromUser,updateOtpFromUser]=useState();
    let [otpFromServer,updateOtpFromServer]=useState();
    let [passwordFromServer,updatepasswordFromServer]=useState('fool');
    let [formStatus007,updateFormStatus]=useState(1);
    
    const getOTP=async (event)=>{
        event.preventDefault();
        if(userEmail)
        {
            document.querySelector('.uniqueButton001').disabled=true;
            

            console.log(userEmail,formStatus007);
            let base_url_of_email_messenger = process.env.REACT_APP_EMAIL_MESSENGER_URL;
            // await fetch(`${base_url_of_email_messenger}${userEmail}`).then(data=>data.json()).then(data=>{updateOtpFromServer(Number(data.paylod.substring(0,6)))})
            // formStatus = 2
            updateFormStatus(2)
            console.log(userEmail,formStatus007);
        }
        else{alert('null email not accepted')}
    }
    
    const checkOTP=async(event)=>{
        event.preventDefault()
        document.querySelector('.uniqueButton001').disabled=true;

        console.log(otpFromUser)
        if(otpFromUser)
        {
            if(otpFromServer==otpFromUser)
            {
                let base_url = process.env.REACT_APP_SERVER_BASE_URL;
                await fetch(`${base_url}/user/getPassword/?email=${userEmail}`).then(data=>data.json()).then(data=>updatepasswordFromServer(data.password))

                updateFormStatus(formStatus007+1);
            }else{alert("Invalid OTP");navigate('/SignUp')}
        }else{alert("Null OTP not accepted")}
        
    }
  return (
    <div className='row'>
        <h2>Forgot password</h2>
        <div className='col-lg-4'></div>
        <div className='signInForm007 col-lg-3'>
            <p>enter your registered emailid</p>
            <p>-an otp will be sent to your mail</p>

            {
                (formStatus007===1)?<form>
                    <input placeholder='email' className='m-3 emailInputField' onChange={(event)=>{updateUserEmail(event.target.value)}}/>
                <br/>
                <button className='btn formButton uniqueButton001' onClick={(event)=>{getOTP(event)}}>GET Otp</button><br/>
                </form>:(formStatus007===2)?<form>
                    <input placeholder='otp' className='m-3 emailInputField' onChange={(event)=>{updateOtpFromUser(event.target.value)}}></input><br/>
                    <button className='btn formButton uniqueButton002' onClick={(event)=>{checkOTP(event)}}>Check</button>
                </form>:(formStatus007===3)?<form>
                    <label className='fs-3'>password : <b className='text-danger'>{passwordFromServer}</b></label>
                </form>:<p className='text-danger'>don't manipulate the Dom</p>
            }

            
        </div>
    </div>
  )
}

export default ForgotPassword