import React from 'react'
import { useEffect,useState } from 'react'

function ViewFullArticle() {
    let [postData,updatePostData]=useState({})
    useEffect(()=>{
        let base_url = process.env.REACT_APP_SERVER_BASE_URL
        fetch(`${base_url}/articles/getArticleById/?id=2`).then(data=>data.json()).then(x=>{console.log(x);if(x.status=="true"){updatePostData(x.article)}});
        console.log(postData);
    })
  return (
    <div className='row FullArticle007'>
        <div className='col-lg-6'>title : <b>{postData.title}</b></div>
        <div className='col-lg-6'>category :<b>{postData.categery}</b></div>
        <div className='col-lg-6'>author : <b>{postData.author}</b></div>
        <div className='col-lg-6'>posted on <b>{postData.dataOfCreation}</b></div>
        <div className='col-lg-6'>lastly modified on : <b>{postData.lastUpdate}</b></div>
        <div className='col-lg-12'>
            <div className='articleData008'>{postData.content}</div>
        </div>   
    </div>
  )
}

export default ViewFullArticle