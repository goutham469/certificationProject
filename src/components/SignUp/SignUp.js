import React, { useState } from 'react'
import store from '../../store'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import googleImage from './googleImage.png'


function SignUp() {
    let navigagate=useNavigate();
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
                    if(typeUser == 'user')
                    {
                        let base_url = process.env.REACT_APP_SERVER_BASE_URL;
                        await fetch(`${base_url}/user/createUser`,{
                            method:'POST',
                            headers:{"Content-Type":"application/json"},
                            body:JSON.stringify({"email":data.email,"password":data.password})
                        })
                        store.dispatch({
                            type:'SignUp',
                            userName:data.email,
                            userType:'user'
                        })
                        navigagate('/UserProfile')
                        // here navigate to userDashboard not AuthorProfile
                    }
                    else if(typeUser == 'author')
                    {
                        let base_url = process.env.REACT_APP_SERVER_BASE_URL;
                        await fetch(`${base_url}/Author/createAuthor`,{
                            method:'POST',
                            headers:{"Content-Type":"application/json"},
                            body:JSON.stringify({
                                "email":data.email,
                                "password":data.password,
                                "upVotedArticles":[],
                                "downVotedArticles":[],
                                "commentedArticles":[],
                                "profilePicture":[],
                                "qualifications":[],
                                "publicationData":{
                                    "articlesPublished":0,
                                    "totalArticleViews":0,
                                    "totalArticleUpVotes":0,
                                    "totalArticleDownVotes":0,
                                    "totalArticleComments":0,
                                    "singleHighestViews":{"count":1,"articleId":NaN},
                                    "singleHighestUpVotes":{"count":1,"articleId":NaN},
                                    "singleHighestDownVotes":{"count":1,"articleId":NaN},
                                    "singleHighestCommented":{"count":1,"articleId":NaN}
                                },
                                "MoreData":{},
                                "otherData1":{},
                                "otherData2":{}
                                })
                        })
                        store.dispatch({
                            type:'SignUp',
                            userName:data.email,
                            userType:'author'
                        })
                        navigagate('/AuthorProfile')
                    }
                    
                }
                else{updatePasswordError('* enter your password *');}
            }else{updateEmailError('* enter your email id *');}
        }else{updateTypeUserError('*choose the type of user *');}
    }
  return (
    <div className='row SignInComponentToSetBackGroungImage'>
        <div className='col-lg-4'></div>
        <div className='col-lg-3'>
            <h1 className='headertobehighlighted'>SignUp or register</h1>
            <form className='signInForm007'>
                <input onClick={(event)=>{updateTypeUser('author')}} className='m-2' type='radio' id='author' name='author-user'></input><label for='author'>author</label>
                
                <input onClick={(event)=>{updateTypeUser('user')}} className='m-2' type='radio' id='user' name='author-user'/><label for='user'>user</label>
                
                <p className='text-danger fs-7'>{typeUserError}</p>
                <br/>
                <input placeholder='email' type='email' className='email m-3' onChange={(event)=>{updateEmail(event.target.value)}} />
                <p className='text-danger fs-7'>{emailError}</p>
                
                <input placeholder='password' type='password' className='password m-3' onChange={(event)=>{updatePassword(event.target.value)}} />
                <p className='text-danger fs-7'>{passwordError}</p>
                <button className='btn btn-success p-2 m-2' onClick={(event)=>{login(event)}}>Sign Up</button>
                <br/>
                <Link to='/OauthSignUp'><img width="50px" src={googleImage}/></Link>
                <br/>
                <br/>
                <Link className='LinkToForgotPassword' to='/accountRecovery'>forgot password</Link>
            </form>
        </div>  
    </div>
  )
}

export default SignUp