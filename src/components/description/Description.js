import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Home from '../Home/Home';
import Body from '../Body/Body'
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import ForgotPassword from '../SignIn/ForgotPassword';

import OauthSignUp from '../SignUp/OauthSignUp';

import AuthorProfile from '../AuthorProfile/AuthorProfile';
import Profile from '../AuthorProfile/Profile';
import MyArticles from '../AuthorProfile/MyArticles';
import NewArticle from '../AuthorProfile/NewArticle';
import AllArticles from '../AuthorProfile/AllArticles';
import ViewFullArticle from '../AuthorProfile/ViewFullArticle';

import UserDashBoard from '../UserDashBoard/UserDashBoard';
import Blog from '../UserDashBoard/Blog';
import UserProfile from '../UserDashBoard/UserProfile';


function Description() {
    const router=createBrowserRouter([
        {
            path:'',
            element:<Body/>,
            children:[
                {
                    path:'',
                    element:<Home/>
                },
                {
                    path:'SignIn',
                    element:<SignIn/>
                },
                {
                    path:'SignUp',
                    element:<SignUp/>
                },
                {
                    path:'accountRecovery',
                    element:<ForgotPassword/>
                },
                {
                    path:'OauthSignUp',
                    element:<OauthSignUp/>
                },
                {
                    path:'AuthorProfile',
                    element:<AuthorProfile/>,
                    children:[
                        {
                            path:'',
                            element:<MyArticles/>
                        },
                        {
                            path:'MyArticles',
                            element:<MyArticles/>
                        },
                        {
                            path:'NewArticle',
                            element:<NewArticle/>
                        },
                        {
                            path:'Profile',
                            element:<Profile/>
                        },
                        {
                            path:'AllArticles',
                            element:<AllArticles/>
                        },
                        {
                            path:'FullArticle',
                            element:<ViewFullArticle/>
                        }
                    ]
                },
                {

                    path:'UserProfile',
                    element:<UserDashBoard/>,
                    children:[
                        {
                            path:'',
                            element:<Blog/>
                        },
                        {
                            path:'Blog',
                            element:<Blog/>
                        },
                        {
                            path:'Profile',
                            element:<UserProfile/>
                        }
                    ]
                }
            ]
        }
    ])
  return (
    <div>
        
        <RouterProvider router={router}/>
        
        
    </div>
  )
}

export default Description