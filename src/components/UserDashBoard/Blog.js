import React, { useEffect, useState } from 'react'
import './userDashboard.css'

function Blog() {
    let [articlesData,updateArticlesData]=useState([]);
    useEffect(()=>{
        fetch('http://localhost:4000/articles/getAll').then(data=>data.json()).then(data=>updateArticlesData(data.articles));
    })
  return (
    <div>
        <h2>Blog</h2>
        <div className='row'>
            {
                articlesData.map(x=><div className='col-lg-5 m-1 row'>
                    <div className='userBlogContentItem'>
                        <div className='col-lg-6'>title : <b>{x.title}</b></div>
                        <div className='col-lg-6'>category :<b>{x.categery}</b></div>
                        <div className='col-lg-6'>author : <b>{x.author}</b></div>
                        <div className='col-lg-6'>posted on <b>{x.dataOfCreation}</b></div>
                        <div className='col-lg-6'>lastly modified on : <b>{x.lastUpdate}</b></div>
                        <div className='bg bg-success col-lg-12'>{x.content}</div>
                    </div>
                </div>)
            }
        </div>
    </div>
  )
}

export default Blog