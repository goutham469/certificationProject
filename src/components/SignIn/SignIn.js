import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import store from '../../store';
import './SignIn.css'
import { Link } from 'react-router-dom';
import Login2 from './Login2';


function SignIn() {
    let navigagate = useNavigate();

    let [response,updateResponse]=useState({})

    let [typeUser,updateTypeUser]=useState()
    let [email,updateEmail]=useState()
    let [password,updatePassword]=useState()

    let [typeUserError,updateTypeUserError]=useState();
    let [emailError,updateEmailError]=useState()
    let [passwordError,updatePasswordError]=useState()

    async function login(event)
    {
        event.preventDefault();

        if(typeUser!=undefined && typeUser!=null)
        {
            updateTypeUserError();
            if(email!=undefined && email!=null)
            {
                updateEmailError();
                if(password!=undefined && password!= null)
                {
                    updatePasswordError();
                    let data = {typeUser:typeUser,email:email,password:password}
                    console.log(data);
                    // update redux state here
                    let url = '';
                    let base_url = process.env.REACT_APP_SERVER_BASE_URL;
                    console.log(base_url)
                    if(typeUser == 'user'){url=`${base_url}/user/checkPassword/?name=${data.email}`}
                    else if(typeUser == 'author'){url=`${base_url}/Author/checkPassword/?name=${data.email}`}

                    
                     await fetch(url,{
                        method:'POST',
                        headers:{"Content-Type":"application/json"},
                        body:JSON.stringify({"password":data.password})
                    }).then(x=>x.json()).then(x=>{
                        console.log(x);
                        if(x.status == 'true')
                        {
                            if(data.typeUser == 'user')
                            {
                                store.dispatch({
                                    type:'SignIn',
                                    userName:data.email,
                                    userType:'user'
                                })
                            }
                            else
                            {
                                store.dispatch({
                                    type:'SignIn',
                                    userName:data.email,
                                    userType:'author'
                                })
                            }
                            if(typeUser == 'author'){navigagate('/AuthorProfile');}
                            else{navigagate('/UserProfile');}
                        }
                        else
                        {
                            alert(`${x.message}`)
                        }
                    }) 
                }
                else{updatePasswordError('* enter your password *');}
            }else{updateEmailError('* enter your email id *');}
        }else{updateTypeUserError('*choose the type of user *');}
    }
  return (
    <div className='row SignInComponentToSetBackGroungImage'>
        <div className='col-lg-4'></div>
        <div className='col-lg-3 m-5'>
            <h1 className='headertobehighlighted'>Login</h1>
            <form className='signInForm007'>
                <input onClick={(event)=>{updateTypeUser('author')}} className='m-2 signInFormRadio001' type='radio' id='author' name='author-user'></input><label for='author' className='signInFormRadio'>author</label>
                
                <input onClick={(event)=>{updateTypeUser('user')}} className='m-2' type='radio' id='user' name='author-user'/><label for='user' className='signInFormRadio'>user</label>
                <input onClick={(event)=>{updateTypeUser('Admin')}} className='m-2' type='radio' id='admin' name='author-user'/><label for='admin' className='signInFormRadio'>Admin</label>
                <p className='text-danger fs-7'>{typeUserError}</p>
                <br/>
                <input placeholder='email' type='email' className='email m-3 emailInputField' onChange={(event)=>{updateEmail(event.target.value)}} />
                <p className='text-danger fs-7'>{emailError}</p>
                
                <input placeholder='password' type='password' className='password m-3 emailInputField' onChange={(event)=>{updatePassword(event.target.value)}} />
                <p className='text-danger fs-7'>{passwordError}</p>
                <button className='btn formButton' onClick={(event)=>{login(event)}}>Login</button>
                <br/>
                <Login2/>
                <br/>
                <Link className='LinkToForgotPassword' to='/accountRecovery'>forgot password</Link>
            </form>
        </div>  
    </div>
  )
}

export default SignIn