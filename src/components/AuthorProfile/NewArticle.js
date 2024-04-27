import React from 'react'
import './AuthorProfile.css'
import { useState } from 'react';
import store from '../../store';

function NewArticle() {

    let currentDate = new Date();
    

    let [title,updateTitle]=useState();
    let [category,updateCategory]=useState()
    let [body,updateBody]=useState();
    let [titleError,updateTitleError]=useState()
    let [categoryError,updateCategoryError]=useState()
    let [bodyError,updateBodyError]=useState()

    async function post(event)
    {
        event.preventDefault();
        if(title!=null && title!=undefined)
        {
            updateTitleError();
            if(category!=null && title!=undefined)
            {
                updateCategoryError();
                if(body!=null && body!=undefined)
                {
                    updateBodyError();
                    await fetch('http://localhost:4000/articles/getArticleId').then(data=>data.json()).then(async (x)=>{
                        // console.log(x);
                        let articleData = {
                            articleId:x.count,
                            title:title,
                            category:category,
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
                        await fetch(`http://localhost:4000/articles/postArticle`,{
                            method:'POST',
                            headers:{"Content-Type":"application/json"},
                            body:JSON.stringify(articleData)
                        }).then(x=>x.json()).then(x=>{
                            console.log(x)
                            alert(x.message)
                        })
                        
                    })
                    
                }
                else{updateBodyError('* null body is not allowed *')}
            }else{updateCategoryError('* null categery is not allowed *')}
        }else{updateTitleError('* null title is not allowed *')}
    }
  return (
    <div className='formField'>
        <h2 className='text-secondary'>Post new article</h2>
        <form className='m-2'>
            <input className='title m-2' placeholder='title' onChange={(event)=>{updateTitle(event.target.value)}}/><br/>
            <p className='text-danger'>{titleError}</p>

            <select className='m-2 selectItem' onChange={(event)=>{updateCategory(event.target.value)}} >
                <option>none</option>
                <option>technology</option>
                <option>agriculture</option>
                <option>education</option>
                <option>others</option>
            </select><br/>
            <p className='text-danger'>{categoryError}</p>

            <textarea className='body-area m-2' placeholder='body' onChange={(event)=>{updateBody(event.target.value)}}/><br/>
            <p className='text-danger'>{bodyError}</p>

            <button className='btn btn-success m-2' onClick={(event)=>{post(event)}}>POST</button>
        </form>
    </div>
  )
}

export default NewArticle