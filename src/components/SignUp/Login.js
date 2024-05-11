import React from 'react';
import {  GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import store from '../../store';
import { useNavigate } from 'react-router-dom';

function Login() {
    let navigate=useNavigate();
    return (
                <GoogleLogin
                    onSuccess={async credentialResponse => {
                        console.log(credentialResponse);
                        let decodedString = jwtDecode(credentialResponse.credential)
                        console.log(decodedString)
                        
                        let data = {"email":decodedString.email}

                        let base_url = process.env.REACT_APP_SERVER_BASE_URL;

                        await fetch(`${base_url}/Author/checkAuthorName/?email=${data.email}`).then(z=>z.json())
                        .then(async z=>{
                            if(z.existence == 'false')
                            {
                                await fetch(`${base_url}/Author/createAuthor`,{
                                    method:'POST',
                                    headers:{"Content-Type":"application/json"},
                                    body:JSON.stringify({
                                        "email":data.email,
                                        "password":data.email,
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
                                    type:'SignUn',
                                    userName:data.email,
                                    userType:'author'
                                })
                                alert('your default password is your emailid')
                                navigate('/AuthorProfile');
                            }
                            else
                            {
                                store.dispatch({
                                    type:'SignIn',
                                    userName:data.email,
                                    userType:'author'
                                })
                                alert('your maid id is alreday registered');
                                navigate('/AuthorProfile');
                            }
                        })
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                    useOneTap
                />
    );
}

export default Login;
