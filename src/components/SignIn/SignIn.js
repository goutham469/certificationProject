import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import store from '../../store';

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
                    if(typeUser == 'user'){url=`http://localhost:4000/user/checkPassword/?name=${data.email}`}
                    else if(typeUser == 'author'){url=`http://localhost:4000/Author/checkPassword/?name=${data.email}`}

                    
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
    <div className='row'>
        <div className='col-lg-4'></div>
        <div className='col-lg-3 m-5'>
            <h1>Sign In or login</h1>
            <form>
                <input onClick={(event)=>{updateTypeUser('author')}} className='m-2' type='radio' id='author' name='author-user'></input><label for='author'>author</label>
                
                <input onClick={(event)=>{updateTypeUser('user')}} className='m-2' type='radio' id='user' name='author-user'/><label for='user'>user</label>
                <input onClick={(event)=>{updateTypeUser('Admin')}} className='m-2' type='radio' id='admin' name='author-user'/><label for='admin'>Admin</label>
                <p className='text-danger fs-7'>{typeUserError}</p>
                <br/>
                <input placeholder='email' type='email' className='email m-3' onChange={(event)=>{updateEmail(event.target.value)}} />
                <p className='text-danger fs-7'>{emailError}</p>
                
                <input placeholder='password' type='password' className='password m-3' onChange={(event)=>{updatePassword(event.target.value)}} />
                <p className='text-danger fs-7'>{passwordError}</p>
                <button className='btn btn-success p-2 m-2' onClick={(event)=>{login(event)}}>Login</button>
            </form>
        </div>  
    </div>
  )
}

export default SignIn