import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import './AuthorProfile.css'
import { useNavigate } from 'react-router-dom';

function AllArticles() {
    let navigate=useNavigate();
    let [postsData,updatePostsData]=useState([])
    useEffect(()=>{
        let base_url = process.env.REACT_APP_SERVER_BASE_URL
        fetch(`${base_url}/articles/getAll`).then(data=>data.json()).then(x=>updatePostsData(x.articles));
    })
  return (
    <div className='row'>
        {
                postsData.map(x=><div className='col-lg-5 m-1 row'>
                    <div className='userBlogContentItem btn' onClick={(event)=>{event.preventDefault();window.open('/AuthorProfile/FullArticle')}}>
                        <div className='col-lg-6'>title : <b>{x.title}</b></div>
                        <div className='col-lg-6'>category :<b>{x.categery}</b></div>
                        <div className='col-lg-6'>author : <b>{x.author}</b></div>
                        <div className='col-lg-6'>posted on <b>{x.dataOfCreation}</b></div>
                        <div className='col-lg-6'>lastly modified on : <b>{x.lastUpdate}</b></div>
                        <div className='col-lg-12'>
                            <div className='articleData007'>{x.content}</div>
                        </div>
                    </div>
                </div>)
            }
    </div>
  )
}

export default AllArticles