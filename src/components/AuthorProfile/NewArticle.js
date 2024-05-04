import React from 'react'
import './AuthorProfile.css'
import { useState } from 'react';
import store from '../../store';
import { useNavigate } from 'react-router-dom';

function NewArticle() {

    let currentDate = new Date();
    let navigate=useNavigate();
    

    let [title,updateTitle]=useState();
    let [category1,updateCategory]=useState()
    let [body,updateBody]=useState();
    let [titleError,updateTitleError]=useState()
    let [categoryError,updateCategoryError]=useState()
    let [bodyError,updateBodyError]=useState()
    let [changeState,updateChangeState]=useState(0)

    async function post(event)
    {
        event.preventDefault();
        if(title!=null && title!=undefined)
        {
            updateTitleError();
            if(category1!=null && title!=undefined)
            {
                updateCategoryError();
                if(body!=null && body!=undefined)
                {
                    updateBodyError();
                    let base_url = process.env.REACT_APP_SERVER_BASE_URL;
                    // console.log("base url in new article page",base_url);
                    await fetch(`${base_url}/articles/getArticleId`).then(data=>data.json()).then(async (x)=>{
                        // console.log(x);
                        let articleData = {
                            articleId:x.count,
                            title:title,
                            category:category1,
                            author:store.getState().username,
                            content:body,
                            dateOfCreation:`${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()} - ${currentDate.getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()}`,
                            lastUpdate:`${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()} - ${currentDate.getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()}`,
                            lastVersions:[],
                            views:1,
                            comments:[],
                            upVotes:0,
                            downVotes:0
                        }
                        console.log(articleData);
                        let base_url = process.env.REACT_APP_SERVER_BASE_URL;
                        await fetch(`${base_url}/articles/postArticle`,{
                            method:'POST',
                            headers:{"Content-Type":"application/json"},
                            body:JSON.stringify(articleData)
                        }).then(x=>x.json()).then(x=>{
                            // console.log(x)
                            // alert(x.message)
                            navigate('/AuthorProfile/MyArticles')
                            
                        })
                        
                    })
                    
                }
                else{updateBodyError('* null body is not allowed *')}
            }else{updateCategoryError('* null categery is not allowed *')}
        }else{updateTitleError('* null title is not allowed *')}
    }
  return (
    <div className='formField'>
        <h2 className='text-warning'>Post new article</h2>
        <form className='m-2'>
            <input className='title m-2' placeholder='title' onChange={(event)=>{updateTitle(event.target.value)}}/><br/>
            <p className='text-danger'>{titleError}</p>

            <input className='m-2 title' placeholder='categery' onChange={(event)=>{updateCategory(event.target.value)}} ></input>
                <br/>
            <p className='text-danger'>{categoryError}</p>

            <textarea className='body-area m-2' placeholder='body' onChange={(event)=>{updateBody(event.target.value)}}/><br/>
            <p className='text-danger'>{bodyError}</p>

            <button className='btn btn-success m-2' onClick={(event)=>{post(event)}}>POST</button>
        </form>
    </div>
  )
}

export default NewArticle